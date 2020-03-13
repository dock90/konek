import styled from "styled-components";

import StyledAppBar from "../material/StyledAppBar";
import StyledTabs from "../material/StyledTabs";
import StyledTab from "../material/StyledTab";
import TabPanel from "../TabPanel";
import MemberList from "./members/MemberList";
import { useState } from "react";

const Container = styled.div``;

const GroupDetails = ({ groupId }) => {
  const [tabId, setTabId] = useState(0);

  const handleChange = (e, newValue) => {
    setTabId(newValue);
  };

  return (
    <Container>
      <StyledAppBar position="static">
        <StyledTabs value={tabId} onChange={handleChange}>
          <StyledTab label="Members" />
        </StyledTabs>
      </StyledAppBar>
      <TabPanel value={tabId} index={0}>
        <MemberList groupId={groupId} />
      </TabPanel>
    </Container>
  );
};

export default GroupDetails;
