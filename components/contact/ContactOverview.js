import { useState } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
// gql
import { useQuery } from "react-apollo";
// material
import { Avatar, Card, CardContent, Grid } from "@material-ui/core";
// components
import styled from "styled-components";
import TabPanel from "../TabPanel";
import Summary from "./Summary";
import Notes from "./Notes";
import Messages from "./Messages";
import Tasks from "./Tasks";
import Files from "./Files";

// styled
import { BorderButton } from "../material/StyledButton";
import StyledAppBar from "../material/StyledAppBar";
import StyledTabs from "../material/StyledTabs";
import StyledTab from "../material/StyledTab";

import { CONTACT_QUERY } from "../../queries/ContactQueries";
import Loading from "../Loading";
// styles
const Container = styled.div``;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
`;
const Name = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  h2 {
    margin: 0;
  }
`;
const LegalName = styled.div`
  color: gray;
  font-size: .9em;
  font-style: italic;
`;

const Detail = styled(Card)`
  margin-bottom: 1rem;
`;

const BioContent = styled.div`
  white-space: pre-wrap;
`;

const ContactOverview = ({ id }) => {
  const { loading, data, error } = useQuery(CONTACT_QUERY, {
    variables: { contactId: id }
  });
  const [activeTab, setActiveTab] = useState(0);

  if (loading) return <Loading />;
  if (error) return <p>Error: {error.message}</p>;

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const contact = data.contact;
  return (
    <Container>
      <Header>
        <Avatar
          alt="Contact Image"
          style={{
            height: 40,
            width: 40,
            marginRight: 10
          }}
        />
        <Name>
          <h2>{contact.name}</h2>
          {contact.legalName && <LegalName>{contact.legalName}</LegalName>}
        </Name>
        <Link
          href={`/contacts/[id]/edit`}
          as={`/contacts/${contact.contactId}/edit`}
        >
          <a>
            <BorderButton>Edit Contact</BorderButton>
          </a>
        </Link>
      </Header>
      <Detail>
        <CardContent>
          <Grid container spacing={1}>
            {contact.bio && (
              <Grid item xs={12}>
                <BioContent>{contact.bio}</BioContent>
              </Grid>
            )}
          </Grid>
        </CardContent>
      </Detail>
      <StyledAppBar position="static">
        <StyledTabs value={activeTab} onChange={handleTabChange}>
          <StyledTab label="Summary" />
          <StyledTab label="Notes" />
          <StyledTab label="Messages" />
          <StyledTab label="Tasks" />
          <StyledTab label="Files" />
        </StyledTabs>
      </StyledAppBar>
      <TabPanel value={activeTab} index={0}>
        <Summary />
      </TabPanel>
      <TabPanel value={activeTab} index={1}>
        <Notes contactId={id} />
      </TabPanel>
      <TabPanel value={activeTab} index={2}>
        <Messages />
      </TabPanel>
      <TabPanel value={activeTab} index={3}>
        <Tasks />
      </TabPanel>
      <TabPanel value={activeTab} index={4}>
        <Files />
      </TabPanel>
    </Container>
  );
};

ContactOverview.propTypes = {
  id: PropTypes.string.isRequired
};

export default ContactOverview;
