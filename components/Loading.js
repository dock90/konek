import { CircularProgress } from "@material-ui/core";
import styled from "styled-components";

const Container = styled.div`
  padding-top: 10%;
  width: 100%;
  text-align: center;
`;

const Loading = () => (
  <Container>
    <CircularProgress style={{height: 25, width: 25}} />
  </Container>
);

export default Loading;
