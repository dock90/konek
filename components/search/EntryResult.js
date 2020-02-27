import Link from "next/link";

import { ResultContainer, ResultTitle, ResultDetail } from "./Styles";
import Highlight from "./Highlight";

const ContactResult = ({ hit }) => {
  return (
    <Link href={`/contacts/contact?id=${hit.contactId}&entryId=${hit.objectID}`}>
      <ResultContainer variant="outlined">
        <ResultTitle direction="column">
          <div>{hit.type}</div>
          <div>
            <Highlight attribute="title" hit={hit} />
          </div>
          <div>{hit.contact}</div>
        </ResultTitle>
        <ResultDetail>
          {hit.type === "Conversation" && (
            <Highlight attribute="message" hit={hit} isSnippet={true} />
          )}
        </ResultDetail>
      </ResultContainer>
    </Link>
  );
};

export default ContactResult;
