import PropTypes from "prop-types";
import styled from "styled-components";

const MessageContainer = styled.div`
  background-color: ${props =>
    props.isMe ? props.theme.white : props.theme.accentDark};
  color: ${props => (props.isMe ? "#37474F" : props.theme.white)};
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

const MessageItem = props => (
  <MessageContainer
    isMe={props.message.author.memberId === props.room.memberId}
  >
    <Meta>
      <Author>{props.message.author.name}</Author>
      <Date>{props.message.createdAt}</Date>
    </Meta>
    <Body>{props.message.body}</Body>
  </MessageContainer>
);

MessageItem.propTypes = {
  room: PropTypes.shape({
    memberId: PropTypes.string.isRequired
  }).isRequired,
  message: PropTypes.shape({
    author: PropTypes.shape({
      name: PropTypes.string
    }),
    createdAt: PropTypes.string,
    body: PropTypes.string
  }).isRequired
};

export default MessageItem;
