import React from 'react';
import styled from 'styled-components';

// components
import Header from './Header';
import Account from './Account';
import Notifications from './Notifications';
import TabPanel from '../../components/TabPanel';
import StyledAppBar from '../../components/StyledAppBar';
import StyledTabs from '../../components/StyledTabs';
import StyledTab from '../../components/StyledTab';

// styles
const Layout = styled.div`
  grid-area: main;
  background: #f4f6f8;
  padding: 30px 50px;
`;

const ProfileContainer = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Layout>
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
    </Layout>
  );
};

export default ProfileContainer;
