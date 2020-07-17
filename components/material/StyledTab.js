import styled from 'styled-components';
import Tab from '@material-ui/core/Tab';

const StyledTab = styled(Tab)`
  && {
    color: ${props => props.theme.black};
  }
  .MuiTab-wrapper {
    font-size: 12px;
  }
`;

export default StyledTab;
