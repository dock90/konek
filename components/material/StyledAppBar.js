import styled from 'styled-components';
import { AppBar } from '@material-ui/core';

const StyledAppBar = styled(AppBar).attrs(props => ({
  position: 'static'
}))`
  && {
    background: none;
    box-shadow: none;
  }
`;

export default StyledAppBar;
