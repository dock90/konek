import PropTypes from 'prop-types';
import { CircularProgress } from '@material-ui/core';
import styled from 'styled-components';

const Container = styled.div`
  padding-top: ${props => (props.noPad ? 0 : '10%')};
  width: 100%;
  text-align: center;
`;

const Loading = ({ noPad }) => (
  <Container noPad={noPad}>
    <CircularProgress style={{ height: 25, width: 25 }} />
  </Container>
);

Loading.propTypes = {
  noPad: PropTypes.bool
};

Loading.defaultProps = {
  noPad: false
};

export default Loading;
