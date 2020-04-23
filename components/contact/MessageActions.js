import { JustifyRight } from "../styles/LayoutStyles";
import MessageAction from "../actions/MessageAction";
import { useContext } from "react";
import { ContactContext } from "../../contexts/ContactContext";
import { ACTION_TYPE_BUTTON } from "../actions/BaseAction";

export function MessageActions() {
  const { profile } = useContext(ContactContext);
  return (
    <JustifyRight>
      <MessageAction roomId={profile.roomId} type={ACTION_TYPE_BUTTON}>
        Send Message
      </MessageAction>
    </JustifyRight>
  );
}
