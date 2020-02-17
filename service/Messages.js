import { client } from "../config/apollo";
import {
  MESSAGES_QUERY,
  SEND_MESSAGE_MUTATION
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
  const roomInfo = client.readFragment({
    id: roomId,
    fragment: ROOM_FIELDS
  });

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

function incrementQtyUnread(roomId, authorId) {}

function hasPreviousMessage(messages, messageId) {
  return !!messages.data.find(m => m.messageId === messageId);
}
