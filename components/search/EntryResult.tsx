import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import { ResultContainer, ResultTitle, ResultDetail } from './Styles';
import Highlight from './Highlight';

const NoteMessage = styled.div`
  max-width: 100px;
`;

const TypeLabel = styled.span`
  color: darkgray;
`;

interface Props {
  hit: {
    contactId: string;
    objectID: string;
    type: string;
    contact: string;
  };
}

const ContactResult: React.FC<Props> = ({ hit }) => {
  return (
    <Link
      href={'/contacts/[id]'}
      as={`/contacts/${hit.contactId}?entryId=${hit.objectID}`}
    >
      <ResultContainer variant="outlined">
        <ResultTitle direction="column">
          <div>
            <TypeLabel>{hit.type}: </TypeLabel>
            {hit.contact}
          </div>
          <div>
            <Highlight attribute="title" hit={hit} />
          </div>
        </ResultTitle>
        <ResultDetail>
          {hit.type === 'Conversation' && (
            <Highlight attribute="message" hit={hit} isSnippet={true} />
          )}
          {hit.type === 'Note' && (
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
