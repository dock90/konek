import styled from 'styled-components';
import { AppBar } from '@material-ui/core';

const StyledAppBar = styled(AppBar).attrs(() => ({
  position: 'static',
}))`
  && {
    background: none;
    box-shadow: none;
  }
`;

export default StyledAppBar;
