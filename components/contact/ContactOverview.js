import { useState } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
// gql
import { useQuery } from "react-apollo";
// material
import { Facebook } from "@material-ui/icons";
import { Avatar, Card, CardContent, Grid } from "@material-ui/core";
// components
import styled from "styled-components";
import TabPanel from "../TabPanel";
import Summary from "./Summary";
import Entries from "./Entries";
import Tasks from "./Tasks";
import Files from "./Files";

// styled
import { BorderButton } from "../material/StyledButton";
import StyledAppBar from "../material/StyledAppBar";
import StyledTabs from "../material/StyledTabs";
import StyledTab from "../material/StyledTab";

import { CONTACT_QUERY } from "../../queries/ContactQueries";
import Loading from "../Loading";
import AvatarPicture from "../assets/AvatarPicture";
import TagItem from "../tags/TagItem";
import TagsList from "../tags/TagsList";
import { TYPE_CONVERSATION, TYPE_NOTE } from "../../queries/EntryQueries";
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
  font-size: 0.9em;
  font-style: italic;
`;

const Detail = styled(Card)`
  margin-bottom: 1rem;
`;

const BioContent = styled.div`
  white-space: pre-wrap;
`;

const ContactInfo = styled.div``;

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
        <AvatarPicture
          size={40}
          picture={contact.picture}
          style={{ marginRight: 10 }}
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
            {contact.fbProfile && (
              <Grid item xs={12}>
                <a href={contact.fbProfile} target="_blank">
                  <Facebook /> {contact.fbProfile}
                </a>
              </Grid>
            )}
            <Grid item xs={12}>
              <ContactInfo>
                {contact.city && <div> City: {contact.city}</div>}
                {contact.state && <div> State: {contact.state}</div>}
                {contact.country && <div> Country: {contact.country}</div>}
              </ContactInfo>
            </Grid>
            <Grid item xs={12}>
              <TagsList tags={contact.tags} />
            </Grid>
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
        <Entries contactId={id} type={TYPE_NOTE} />
      </TabPanel>
      <TabPanel value={activeTab} index={2}>
        <Entries contactId={id} type={TYPE_CONVERSATION} canNew={false} />
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
