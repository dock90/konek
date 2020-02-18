import styled from "styled-components";
import MessageItem from "./MessageItem";
import { useContext } from "react";
import { RoomIdContext } from "../../contexts/RoomIdContext";
import { useQuery } from "@apollo/react-hooks";
import { ROOM_QUERY_LOCAL } from "../../queries/RoomQueries";
import Loading from "../Loading";

const MessageContainer = styled.div`
  min-height: 100%;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  align-items: stretch;
`;

const MessageWrapper = styled.div`
  margin: 4px;
`;

const MessageList = () => {
  const roomIdContext = useContext(RoomIdContext),
    roomId = roomIdContext.roomId;

  const { loading, data } = useQuery(ROOM_QUERY_LOCAL, {
    variables: { roomId }
  });

  if (loading) {
    return <Loading/>;
  }

  return (
    <MessageContainer>
      {props.messages.map(m => {
        const isLastRead = m.messageId === data.room.readThrough;

        return (
          <MessageWrapper>
            <MessageItem message={m} key={m.messageId} />
            {isLastRead}
          </MessageWrapper>
        );
      })}
    </MessageContainer>
  );
};

export default MessageList;
