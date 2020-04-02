import React from "react";
import styled from "styled-components";

// components
import PersonalInformation from "./PersonalInformation";
import Notifications from "./Notifications";
import TabPanel from "../TabPanel";
import StyledAppBar from "../material/StyledAppBar";
import StyledTabs from "../material/StyledTabs";
import StyledTab from "../material/StyledTab";
import LoginInformation from "./LoginInformation";

// styles
const Container = styled.div`
  grid-area: main;
  background: #f4f6f8;
  max-width: 650px;
`;

const Profile = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container>
      {false && (
        <StyledAppBar>
          <StyledTabs value={value} onChange={handleChange}>
            <StyledTab label="Account" />
            <StyledTab label="Notifications" />
          </StyledTabs>
        </StyledAppBar>
      )}
      <TabPanel value={value} index={0}>
        <PersonalInformation style={{ marginBottom: 20 }} />
        <LoginInformation />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Notifications />
      </TabPanel>
    </Container>
  );
};

export default Profile;
