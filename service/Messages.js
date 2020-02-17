import { client } from "../config/apollo";
import {
  MESSAGES_QUERY,
  SEND_MESSAGE_MUTATION
} from "../queries/MessagesQueries";
import { MEMBER_QUERY } from "../queries/MemberQueries";

/**
 *
 * @param roomId {String}
 * @param body {String}
 * @param memberId {String}
 * @return {Promise<void>}
 */
export async function sendMessage(roomId, body, memberId) {
  await client.mutate({
    mutation: SEND_MESSAGE_MUTATION,
    variables: { roomId, body },
    update(proxy, { data }) {
      const {messages} = proxy.readQuery({
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
            data: [data.sendMessage, ...messages.data],
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
  const query = client.readQuery({
    query: MESSAGES_QUERY,
    variables: { roomId, after: null }
  });

  if (hasPreviousMessage(query.messages, messageId)) {
    return;
  }

  // TODO: Handle if there is no data in the cache.

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
        data: [newMessage, ...query.messages.data],
      }
    }
  });
}

function hasPreviousMessage(messages, messageId) {
  return !!messages.data.find(m => m.messageId === messageId)
}


