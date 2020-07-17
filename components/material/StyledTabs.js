import styled from 'styled-components';
import { Tabs } from '@material-ui/core';

const StyledTabs = styled(Tabs).attrs((props) => ({
  centered: true,
}))`
  && {
    margin: 0;
    padding: 0;
  }
  .MuiTabs-indicator {
    background-color: ${(props) => props.theme.primary};
  }
`;

export default StyledTabs;
