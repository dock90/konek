import React from 'react';
import styled from 'styled-components';

// components
import Account from './Account';
import Header from './Header';
import Notifications from './Notifications';
import TabPanel from '../TabPanel';
import StyledAppBar from '../material/StyledAppBar';
import StyledTabs from '../material/StyledTabs';
import StyledTab from '../material/StyledTab';

// styles
const Container = styled.div`
  grid-area: main;
  background: #f4f6f8;
  padding: 30px 50px;
`;

const Profile = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container>
      <Header />
      <TabPanel>
        <StyledAppBar position="static">
          <StyledTabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            <StyledTab label="Account" />
            <StyledTab label="Notifications" />
          </StyledTabs>
        </StyledAppBar>
        <TabPanel value={value} index={0}>
          <Account />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Notifications />
        </TabPanel>
      </TabPanel>
    </Container>
  );
};

export default Profile;
