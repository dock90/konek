import PropTypes from 'prop-types';
import styled from 'styled-components';
// components
import Dashboard from '../../components/Dashboard';
import ContactOverview from '../../components/contact/ContactOverview';

// styles
const Container = styled.div`
  grid-area: main;
  background: #f4f6f8;
  padding: 2rem;
`;

const Contact = props => {
  const {
    query: { id },
  } = props;
  return (
    <Dashboard>
      <Container>
        <ContactOverview id={id} />
      </Container>
    </Dashboard>
  );
};

Contact.propTypes = {
  id: PropTypes.string,
};

Contact.defaultProps = {
  id: null,
};

export default Contact;
