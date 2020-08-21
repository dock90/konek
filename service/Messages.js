import { client } from '../config/apollo';
import {
  MESSAGES_QUERY,
  SEND_MESSAGE_MUTATION,
  SET_READ_THROUGH,
} from '../queries/MessagesQueries';
import { MEMBER_FIELDS, MEMBER_QUERY } from '../queries/MemberQueries';
import { ROOM_FIELDS, ROOM_QUERY, ROOMS_QUERY } from '../queries/RoomQueries';

/**
 *
 * @param roomId {String}
 * @param body {String}
 * @param asset
 * @return {Promise<void>}
 */
export async function sendMessage(roomId, body, asset) {
  await client.mutate({
    mutation: SEND_MESSAGE_MUTATION,
    variables: { roomId, body, asset },
    update(proxy, { data }) {
      const { messages } = proxy.readQuery({
        query: MESSAGES_QUERY,
        variables: { roomId: roomId, after: null },
      });

      if (hasPreviousMessage(messages, data.sendMessage.messageId)) {
        // PubNub sometimes gets the message delivered before we get our response back.
        return;
      }

      // Write to cache so the UI updates.
      proxy.writeQuery({
        query: MESSAGES_QUERY,
        data: {
          messages: {
            ...messages,
            data: [data.sendMessage, ...messages.data],
          },
        },
        variables: {
          roomId: roomId,
          after: null,
        },
      });

      orderRooms(roomId, proxy);

      // We can't use "markAllRead" because the cache hasn't actually been committed at this point so the
      // message we just added won't be available.
      const roomInfo = proxy.readFragment({
        id: roomId,
        fragment: ROOM_FIELDS,
        fragmentName: 'RoomFields',
      });

      proxy.writeFragment({
        id: roomId,
        fragment: ROOM_FIELDS,
        fragmentName: 'RoomFields',
        data: {
          ...roomInfo,
          readThrough: data.sendMessage.messageId,
        },
      });
    },
  });
}

/**
 *
 * @param messageId {String}
 * @param roomId {String}
 * @param body {String}
 * @param authorId {String}
 * @param asset {Object}
 * @return {Promise<void>}
 */
export async function addMessage(messageId, roomId, body, authorId, asset) {
  let roomInfo = getRoomInfo(roomId);

  if (!roomInfo) {
    const roomQuery = await client.query({
      fetchPolicy: 'cache-only',
      query: ROOM_QUERY,
      variables: { roomId },
    });
    roomInfo = roomQuery.data.room;
  }

  if (roomInfo.memberId !== authorId) {
    // We aren't the sender, so we want to update the qty unread.
    client.writeFragment({
      id: roomId,
      fragment: ROOM_FIELDS,
      fragmentName: 'RoomFields',
      data: {
        ...roomInfo,
        qtyUnread: roomInfo.qtyUnread + 1,
      },
    });
  }

  orderRooms(roomId, client);

  let query;
  try {
    query = client.readQuery({
      query: MESSAGES_QUERY,
      variables: { roomId, after: null },
    });
  } catch (e) {
    // There are no messages loaded for this room, so we can exit without updating anything.
    return;
  }

  if (hasPreviousMessage(query.messages, messageId)) {
    // This message is already in the list! Our job is already done.
    return;
  }

  let authorInfo = client.readFragment({
    fragment: MEMBER_FIELDS,
    id: authorId,
    fragmentName: 'MemberFields',
  });

  if (!authorInfo) {
    // we gotta load the author info from the API. 🙁
    const { data } = await client.query({
      query: MEMBER_QUERY,
      variables: {
        memberId: authorId,
        roomId: roomId,
      },
    });

    authorInfo = data.member;
  }
  let assetField = null;
  if (asset) {
    assetField = {
      ...asset,
      __typename: 'Asset',
    };
  }

  const newMessage = {
    messageId,
    body,
    asset: assetField,
    createdAt: new Date().toISOString(),
    author: authorInfo,
    __typename: 'Message',
  };

  client.writeQuery({
    query: MESSAGES_QUERY,
    variables: { roomId, after: null },
    data: {
      messages: {
        ...query.messages,
        data: [newMessage, ...query.messages.data],
      },
    },
  });
}

/**
 *
 * @param roomId {String}
 * @param [updateServer=true] {Boolean}
 */
export async function markAllRead(roomId, updateServer) {
  const roomInfo = getRoomInfo(roomId);

  if (!roomInfo) {
    return;
  }

  if (roomInfo.qtyUnread <= 0) {
    return;
  }

  let messages;
  try {
    // get the local message list.
    const data = await client.readQuery({
      query: MESSAGES_QUERY,
      variables: { roomId, after: null },
    });
    messages = data.messages;
  } catch (e) {
    console.log(
      '💥 This really should never happen, but you never know. 💥',
      e,
    );
    return;
  }

  const messageId = messages.data[0].messageId;

  writeRoomInfo(roomId, {
    ...roomInfo,
    qtyUnread: 0,
    readThrough: messageId,
  });

  if (!updateServer) {
    return;
  }

  const results = await client.mutate({
    mutation: SET_READ_THROUGH,
    variables: { roomId, messageId },
  });

  writeRoomInfo(roomId, results.data.setReadThrough);
}

function getRoomInfo(roomId) {
  return client.readFragment({
    id: roomId,
    fragment: ROOM_FIELDS,
    fragmentName: 'RoomFields',
  });
}

function writeRoomInfo(roomId, info) {
  client.writeFragment({
    id: roomId,
    fragment: ROOM_FIELDS,
    fragmentName: 'RoomFields',
    data: info,
  });
}

function orderRooms(topRoomId, client) {
  const { rooms } = client.readQuery({
    query: ROOMS_QUERY,
  });

  const newRooms = [...rooms];

  for (let i = 0; i < rooms.length; i++) {
    const r = rooms[i];
    if (r.roomId === topRoomId) {
      if (i === 0) {
        // If we're already at the top, there is nothing to do, we can abort early.
        return;
      }
      newRooms.splice(i, 1);
      newRooms.unshift(r);
      break;
    }
  }

  client.writeQuery({
    query: ROOMS_QUERY,
    data: { rooms: newRooms },
  });
}

function hasPreviousMessage(messages, messageId) {
  return !!messages.data.find((m) => m.messageId === messageId);
}
