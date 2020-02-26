import Link from "next/link";
import { Highlight } from "react-instantsearch-dom";

import { ResultContainer, ResultTitle, ResultDetail  } from "./Styles";


const ContactResult = ({ hit }) => {
  return (
    <Link href={`/contacts/contact?id=${hit.objectID}`}>
      <ResultContainer variant="outlined">
        <ResultTitle direction="column">
          <div>{hit.type}</div>
          <div><Highlight attribute="title" hit={hit} /></div>
          <div>{hit.contact}</div>
        </ResultTitle>
      </ResultContainer>
    </Link>
  );
};

export default ContactResult;
