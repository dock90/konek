import PropTypes from "prop-types";
import styled from "styled-components";
import AssetDisplay from "../assets/AssetDisplay";

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
const Body = styled.div`
  display: flex;
  flex-direction: column;
`;
const Asset = styled.div`
  margin: 5px;
`;

const MessageItem = ({ message, room }) => (
  <MessageContainer isMe={message.author.memberId === room.memberId}>
    <Meta>
      <Author>{message.author.name}</Author>
      <Date>{message.createdAt}</Date>
    </Meta>
    <Body>
      {message.asset && (
        <Asset>
          <AssetDisplay
            size={100}
            asset={message.asset}
            description={message.body || ""}
            descriptionDialogOnly
          />
        </Asset>
      )}
      {message.body && <div>{message.body}</div>}
    </Body>
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
    body: PropTypes.string,
    asset: PropTypes.object
  }).isRequired
};

export default MessageItem;
