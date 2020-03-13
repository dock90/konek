import Dashboard from "../../components/Dashboard";
import styled from "styled-components";
import GroupEdit from "../../components/groups/GroupEdit";

// styles
const Container = styled.div`
  grid-area: main;
  background: #f4f6f8;
  padding: 2rem;
`;

export default () => (
  <Dashboard>
    <Container>
      <GroupEdit groupId="new" />
    </Container>
  </Dashboard>
);
