import styled from "styled-components";
import Link from "next/link";

import { ResultContainer, ResultTitle, ResultDetail } from "./Styles";
import Highlight from "./Highlight";

const NoteMessage = styled.div`
  max-width: 100px;
`;

const TypeLabel = styled.span`
  color: darkgray;
`;

const ContactResult = ({ hit }) => {
  return (
    <Link
      href={`/contacts/contact?id=${hit.contactId}&entryId=${hit.objectID}`}
    >
      <ResultContainer variant="outlined">
        <ResultTitle direction="column">
          <div><TypeLabel>{hit.type}: </TypeLabel>{hit.contact}</div>
          <div>
            <Highlight attribute="title" hit={hit} />
          </div>
        </ResultTitle>
        <ResultDetail>
          {hit.type === "Conversation" && (
            <Highlight attribute="message" hit={hit} isSnippet={true} />
          )}
          {hit.type === "Note" && (
            <NoteMessage>
              <Highlight attribute="message" hit={hit} isSnippet={true} />
            </NoteMessage>
          )}
        </ResultDetail>
      </ResultContainer>
    </Link>
  );
};

export default ContactResult;
