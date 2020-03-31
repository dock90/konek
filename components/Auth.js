import styled from "styled-components";
import { H1 } from "./styles/Typography";
import { useAuthenticated } from "../hooks/useAuthenticated";
import { useRouter } from "next/router";
import { Logo } from "./styles/Logo";

// styles
const Container = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-areas: "branding content";
  @media (max-width: 800px) {
    grid-template-columns: auto;
    grid-template-areas: "branding" "content";
    grid-template-rows: 150px auto;
  }
  height: 100vh;
`;

const Branding = styled.div`
  grid-area: branding;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.gray};
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
      <Branding>
        <Logo size={100} />
      </Branding>
      <ContentContainer>{children}</ContentContainer>
    </Container>
  );
};

export default Auth;
