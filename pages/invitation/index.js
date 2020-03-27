import styled from "styled-components";
import Layout from "../../components/Layout";
import AcceptInvitation from "../../components/invitation/AcceptInvitation";
import { H2 } from "../../components/styles/Typography";
import {useRouter} from "next/router";

const Container = styled.div`
  grid-area: main;
  padding: 2rem;
  background: #f4f6f8;
`;

const Invitation = () => {
  const router = useRouter();
  return (
    <Layout>
      <Container>
        <H2>Accept Invitation</H2>
        <AcceptInvitation code={router.query.code} />
      </Container>
    </Layout>
  );
};

export default Invitation;
