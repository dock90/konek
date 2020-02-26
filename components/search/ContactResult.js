import styled from "styled-components";
import Link from "next/link";
import { Highlight } from "react-instantsearch-dom";

import { Paper, Avatar } from "@material-ui/core";

const Container = styled(Paper)`
  margin: 2px;
  padding: 2px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  cursor: pointer;
  :hover {
    background-color: lightgray;
  }
`;

const Name = styled.div`
  display: flex;
  font-size: 1.1rem;
`;

const Detail = styled.div`
  display: flex;
  font-size: 0.95rem;
`;

const ContactResult = ({ hit }) => {
  return (
    <Link href={`/contacts/contact?id=${hit.objectID}`}>
      <Container variant="outlined">
        <Name>
          <Avatar
            alt="User Profile Image"
            style={{
              height: 30,
              width: 30,
              marginRight: 10
            }}
          />
          <Highlight attribute="name" hit={hit} />
        </Name>
        <Detail>
          <Highlight attribute="country" hit={hit} />
        </Detail>
      </Container>
    </Link>
  );
};

export default ContactResult;
