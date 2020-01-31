import PropTypes from 'prop-types';
import styled from 'styled-components';
// components
import Dashboard from '../../components/Dashboard';

// styles
const Container = styled.div`
  grid-area: main;
  background: #f4f6f8;
  padding: 2rem;
`;

const EditContact = () => (
  <Dashboard>
    <Container>
      <h1>Contact Edit</h1>
    </Container>
  </Dashboard>
);
export default EditContact;
