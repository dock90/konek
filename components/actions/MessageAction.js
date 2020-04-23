import PropTypes from "prop-types";
import { ChatOutlined } from "@material-ui/icons";
import BaseAction from "./BaseAction";

const MessageAction = ({ roomId, children, type }) => (
  <BaseAction
    href={`/messages?roomId=${roomId}`}
    children={children}
    icon={<ChatOutlined />}
    type={type}
  />
);

export default MessageAction;

MessageAction.propTypes = {
  children: PropTypes.array,
  roomId: PropTypes.string.isRequired,
  type: PropTypes.string
};
