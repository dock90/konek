import PropTypes from "prop-types";
import { Container } from "./EntryStyles";
import { Card, CardHeader } from "@material-ui/core";

const ConversationItem = ({ conversation }) => {
  return (
    <Container>
      <Card>
        <CardHeader title={conversation.title} />
      </Card>
    </Container>
  );
};

ConversationItem.propTypes = {
  conversation: PropTypes.object.isRequired
};

export default ConversationItem;
