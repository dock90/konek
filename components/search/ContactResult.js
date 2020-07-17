import Link from 'next/link';
import Highlight from './Highlight';

import { Avatar } from '@material-ui/core';
import { ResultContainer, ResultTitle, ResultDetail } from './Styles';

const ContactResult = ({ hit }) => {
  return (
    <Link href={'/contacts/[id]'} as={`/contacts/${hit.objectID}`}>
      <ResultContainer variant="outlined">
        <ResultTitle>
          <Avatar
            alt="User Profile Image"
            style={{
              height: 30,
              width: 30,
              marginRight: 10,
            }}
          />
          <Highlight attribute="name" hit={hit} />
        </ResultTitle>
        <ResultDetail>
          <Highlight attribute="country" hit={hit} />
        </ResultDetail>
      </ResultContainer>
    </Link>
  );
};

export default ContactResult;
