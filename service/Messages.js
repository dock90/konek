import { client } from "../config/apollo";
import {
  MESSAGES_QUERY,
  SEND_MESSAGE_MUTATION,
  SET_READ_THROUGH
} from "../queries/MessagesQueries";
import { MEMBER_QUERY } from "../queries/MemberQueries";
import { ROOM_FIELDS } from "../queries/RoomQueries";

/**
 *
 * @param roomId {String}
 * @param body {String}
 * @return {Promise<void>}
 */
export async function sendMessage(roomId, body) {
  await client.mutate({
    mutation: SEND_MESSAGE_MUTATION,
    variables: { roomId, body },
    update(proxy, { data }) {
      const { messages } = proxy.readQuery({
        query: MESSAGES_QUERY,
        variables: { roomId: roomId, after: null }
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
            data: [data.sendMessage, ...messages.data]
          }
        },
        variables: {
          roomId: roomId,
          after: null
        }
      });

      // We can't use "markAllRead" because the cache hasn't actually been committed at this point so the
      // message we just added won't be available.
      const roomInfo = proxy.readFragment({
        id: roomId,
        fragment: ROOM_FIELDS,
      });

      roomInfo.readThrough = data.sendMessage.messageId;

      proxy.writeFragment({
        id: roomId,
        fragment: ROOM_FIELDS,
        data: roomInfo
      });
    }
  });
}

/**
 *
 * @param messageId {String}
 * @param roomId {String}
 * @param body {String}
 * @param authorId {String}
 * @return {Promise<void>}
 */
export async function addMessage(messageId, roomId, body, authorId) {
  const roomInfo = getRoomInfo(roomId);

  if (!roomInfo) {
    // The Chat UI hasn't been loaded, nothing to update.
    return;
  }

  // Make sure that we aren't the sender before updating the qty unread.
  if (roomInfo.memberId !== authorId) {
    roomInfo.qtyUnread++;

    client.writeFragment({
      id: roomId,
      fragment: ROOM_FIELDS,
      data: roomInfo
    });
  }

  let query;
  try {
    query = client.readQuery({
      query: MESSAGES_QUERY,
      variables: { roomId, after: null }
    });
  } catch (e) {
    return;
  }

  if (hasPreviousMessage(query.messages, messageId)) {
    return;
  }

  let authorInfo;

  const authorMessage = query.messages.data.find(
    m => m.author.memberId === authorId
  );

  if (authorMessage) {
    authorInfo = authorMessage.author;
  } else {
    // we gotta load the author info from the API. 🙁
    const { data } = await client.query({
      query: MEMBER_QUERY,
      variables: {
        memberId: authorId,
        roomId: roomId
      }
    });

    authorInfo = data.member;
  }

  const newMessage = {
    messageId: messageId,
    body: body,
    createdAt: new Date().toISOString(),
    author: authorInfo,
    __typename: "Message"
  };

  client.writeQuery({
    query: MESSAGES_QUERY,
    variables: { roomId, after: null },
    data: {
      messages: {
        ...query.messages,
        data: [newMessage, ...query.messages.data]
      }
    }
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
      variables: { roomId, after: null }
    });
    messages = data.messages;
  } catch (e) {
    console.log("💥 This really should never happen, but you never know. 💥");
    return;
  }

  const messageId = messages.data[0].messageId;

  roomInfo.qtyUnread = 0;
  roomInfo.readThrough = messageId;

  writeRoomInfo(roomId, roomInfo);

  if (!updateServer) {
    return;
  }

  const results = await client.mutate({
    mutation: SET_READ_THROUGH,
    variables: { roomId, messageId }
  });

  writeRoomInfo(roomId, results.data.setReadThrough);
}

function getRoomInfo(roomId) {
  return client.readFragment({
    id: roomId,
    fragment: ROOM_FIELDS
  });
}

function writeRoomInfo(roomId, info) {
  client.writeFragment({
    id: roomId,
    fragment: ROOM_FIELDS,
    data: info
  });
}

function hasPreviousMessage(messages, messageId) {
  return !!messages.data.find(m => m.messageId === messageId);
}
