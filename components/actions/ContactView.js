import BaseAction from "./BaseAction";
import { PersonOutlined } from "@material-ui/icons";

const ContactView = ({ contactId, name }) => {
  return (
    <BaseAction
      href={'/contacts/[id]'}
      as={`/contacts/${contactId}`}
      Icon={PersonOutlined}
      children={`View ${name}`}
    />
  );
};

export default ContactView;
