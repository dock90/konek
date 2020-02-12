import styled from "styled-components";
import { useContext } from "react";
import { RoomContext } from "../../contexts/RoomContext";

const MessageContainer = styled.div`
  background-color: ${props => (props.isMe ? "#ffffff" : "#3F51B5")};
  color: ${props => (props.isMe ? "#37474F" : "#ffffff")};
  margin-left: ${props => (props.isMe ? "5" : "1")}rem;
  margin-right: ${props => (props.isMe ? "1" : "5")}rem;
  margin-top: 1rem;
  padding: 3px;
  border-radius: 4px;
`;

const Meta = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
`;

const Date = styled.div``;

const Author = styled.div`
  font-weight: bold;
`;

const Body = styled.div``;

const MessageItem = props => {
  const { room } = useContext(RoomContext);

  return (
    <MessageContainer isMe={props.message.author.memberId === room.memberId}>
      <Meta>
        <Author>{props.message.author.name}</Author>
        <Date>{props.message.createdAt}</Date>
      </Meta>
      <Body>{props.message.body}</Body>
    </MessageContainer>
  );
};

export default MessageItem;
