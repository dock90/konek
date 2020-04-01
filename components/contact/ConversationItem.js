import PropTypes from "prop-types";
import { Container } from "./EntryStyles";
import { Card, IconButton } from "@material-ui/core";
import { ChevronLeft } from "@material-ui/icons";
import FormattedDate from "../FormattedDate";
import styled from "styled-components";
import { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import Loading from "../Loading";
import { CONVERSATION_QUERY } from "../../queries/ConversationQueries";
import MessageItem from "../messages/MessageItem";

const HeaderContainer = styled.div`
  display: flex;
  padding: 15px 15px 0;
  justify-content: space-between;
`;
const HeaderText = styled.div`
  font-size: 1.5rem;
`;
const HeaderSubText = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme.grayer};
`;
const Expander = styled.div`
  transform: rotate(${props => (props.isExpanded ? "90deg" : "-90deg")});
  transition: transform 150ms linear;
`;
const MessagesContainer = styled.div`
  margin-bottom: 15px;
`;

const ConversationContent = ({ conversationId }) => {
  const { data, loading, error } = useQuery(CONVERSATION_QUERY, {
    variables: { entryId: conversationId }
  });
  console.log(data, loading, error);

  if (loading) return <MessagesContainer><Loading noPad /></MessagesContainer>;
  if (error) return <MessagesContainer>error</MessagesContainer>;

  const messages = [...data.entry.messages].reverse();
  return (
    <MessagesContainer>
      {messages.map(m => (
        <MessageItem key={m.messageId} message={m} room={data.entry.room} />
      ))}
    </MessagesContainer>
  );
};

const ConversationItem = ({ conversation }) => {
  const [expanded, setExpanded] = useState(false);

  const handleClick = e => {
    e.preventDefault();
    setExpanded(!expanded);
  };

  return (
    <Container>
      <Card>
        <HeaderContainer>
          <div>
            <HeaderText>{conversation.title}</HeaderText>
            <HeaderSubText>
              <FormattedDate date={conversation.startDate} />
              {conversation.endDate ? (
                <>
                  {" "}
                  - <FormattedDate date={conversation.endDate} />
                </>
              ) : (
                " through today"
              )}
            </HeaderSubText>
          </div>
          <div>
            <IconButton onClick={handleClick}>
              <Expander isExpanded={expanded}>
                <ChevronLeft fontSize="large" />
              </Expander>
            </IconButton>
          </div>
        </HeaderContainer>
        {expanded && (
          <ConversationContent conversationId={conversation.entryId} />
        )}
      </Card>
    </Container>
  );
};

ConversationItem.propTypes = {
  conversation: PropTypes.object.isRequired
};

export default ConversationItem;
