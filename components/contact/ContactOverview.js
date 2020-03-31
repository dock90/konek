import { useState } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
// gql
import { useQuery } from "react-apollo";
// material
import { Facebook, Refresh, Edit } from "@material-ui/icons";
import { CardContent, Grid, AppBar, Tab, Tabs } from "@material-ui/core";
// components
import styled from "styled-components";
import TabPanel from "../TabPanel";
import Summary from "./Summary";
import Entries from "./Entries";
import Tasks from "./Tasks";
import Files from "./Files";

// styled
import StyledAppBar from "../material/StyledAppBar";
import StyledTabs from "../material/StyledTabs";
import StyledTab from "../material/StyledTab";

import { CONTACT_QUERY } from "../../queries/ContactQueries";
import Loading from "../Loading";
import AvatarPicture from "../assets/AvatarPicture";
import TagsList from "../tags/TagsList";
import { TYPE_CONVERSATION, TYPE_NOTE } from "../../queries/EntryQueries";
import NoteEdit from "./NoteEdit";
import { ContactContext } from "../../contexts/ContactContext";
// styles
import {
  Header,
  Name,
  LegalName,
  Detail,
  BioContent
} from "../styles/ContactProfile";
import { BaseButton } from "../styles/Button";

const Container = styled.div``;
const ContactInfo = styled.div``;

const ContactOverview = ({ id }) => {
  const { loading, data, error, refetch } = useQuery(CONTACT_QUERY, {
    variables: { contactId: id }
  });
  const [activeTab, setActiveTab] = useState(0);

  if (loading) return <Loading />;
  if (error) return <p>Error: {error.message}</p>;

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const refreshContact = async e => {
    e.preventDefault();
    await refetch();
  };

  const contact = data.contact;
  return (
    <ContactContext.Provider value={contact}>
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
          <BaseButton onClick={refreshContact}>
            <Refresh /> Refresh Contact
          </BaseButton>
          <Link
            href={`/contacts/[id]/edit`}
            as={`/contacts/${contact.contactId}/edit`}
            passHref
          >
            <BaseButton>
              <Edit />
              Edit Contact
            </BaseButton>
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
        <StyledAppBar>
          <StyledTabs value={activeTab} onChange={handleTabChange}>
            <StyledTab label="Summary" />
            <StyledTab label="Notes" />
            <StyledTab label="Messages" />
            {false && <StyledTab label="Tasks" />}
            {false && <StyledTab label="Files" />}
          </StyledTabs>
        </StyledAppBar>
        {/*<TabPanel value={activeTab} index={0}>*/}
        {/*  <Summary />*/}
        {/*</TabPanel>*/}
        {/*<TabPanel value={activeTab} index={1}>*/}
        {/*  <Entries type={TYPE_NOTE} NewFormComponent={NoteEdit} />*/}
        {/*</TabPanel>*/}
        {/*<TabPanel value={activeTab} index={2}>*/}
        {/*  <Entries contactId={id} type={TYPE_CONVERSATION} />*/}
        {/*</TabPanel>*/}
        {/*<TabPanel value={activeTab} index={3}>*/}
        {/*  <Tasks />*/}
        {/*</TabPanel>*/}
        {/*<TabPanel value={activeTab} index={4}>*/}
        {/*  <Files />*/}
        {/*</TabPanel>*/}
      </Container>
    </ContactContext.Provider>
  );
};

ContactOverview.propTypes = {
  id: PropTypes.string.isRequired
};

export default ContactOverview;
