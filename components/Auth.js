import styled from "styled-components";
import { H1 } from "./styles/Typography";
import { useAuthenticated } from "../hooks/useAuthenticated";
import { useRouter } from "next/router";

// styles
const Container = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-areas: "branding content";
  @media (max-width: 800px) {
    grid-template-columns: auto;
    grid-template-areas: "content" "branding";
  }
  height: 100vh;
`;

const Layout = styled.div`
  grid-area: branding;
  display: flex;
  align-items: flex-end;
  background: url("https://raw.githubusercontent.com/EdwardGoomba/imgHost/master/crmBeta/bg.png");
`;

const Branding = styled.div`
  color: #ffffff;
  margin-left: 3rem;
  margin-bottom: 5rem;
  max-width: 300px;
  h1 {
    margin-bottom: 0;
  }
`;

const ContentContainer = styled.div`
  grid-area: content;
`;

const Auth = ({ children }) => {
  const authenticated = useAuthenticated(false);
  const router = useRouter();

  if (authenticated === true) {
    let target = "/";
    if (router.query.target) {
      target = decodeURIComponent(router.query.target);
    }
    router.replace(target);
  }
  return (
    <Container>
      <Layout>
        <Branding>
          <H1>Konek Beta</H1>
        </Branding>
      </Layout>
      <ContentContainer>
        {children}
      </ContentContainer>
    </Container>
  );
};

export default Auth;
