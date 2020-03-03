import { ChatOutlined } from "@material-ui/icons";
import BaseAction from "./BaseAction";

const MessageAction = ({ roomId, children }) => (
  <BaseAction
    href={`/messages?roomId=${roomId}`}
    children={children}
    Icon={ChatOutlined}
  />
);

export default MessageAction;
