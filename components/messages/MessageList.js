import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import MessageItem from "./MessageItem";
import { MESSAGES_QUERY } from "../../queries/MessagesQueries";

const MessageContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: ${props => (props.loading ? "flex-start" : "flex-end")};
  flex-direction: column;
  align-items: stretch;
`;

const MessageList = props => {
  let content = "";
  const { loading, error, data } = useQuery(MESSAGES_QUERY, {
    variables: {
      roomId: props.roomId
    }
  });

  if (loading) {
    content = "loading...";
  } else if (error) {
    content = error.message;
  } else {
    // console.log(data);
    content = data.messages.data.map(m => (
      <MessageItem message={m} key={m.messageId} />
    ));
  }

  return <MessageContainer loading={loading ? 1 : 0}>{content}</MessageContainer>;
};

export default MessageList;
