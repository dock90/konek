import PropTypes from "prop-types";
import { useState } from "react";
import { useQuery } from "react-apollo";
import { CONTACT_QUERY } from "../../queries/ContactQueries";
import { TYPE_CONVERSATION, TYPE_NOTE } from "../../queries/EntryQueries";
// components
import Link from "next/link";
import { Refresh, Edit } from "@material-ui/icons";
import { CardContent, Grid } from "@material-ui/core";
import TabPanel from "../TabPanel";
import Summary from "./Summary";
import Entries from "./Entries";
// styles
import StyledAppBar from "../material/StyledAppBar";
import StyledTabs from "../material/StyledTabs";
import StyledTab from "../material/StyledTab";
import Loading from "../Loading";
import AvatarPicture from "../assets/AvatarPicture";
import NoteEdit from "./NoteEdit";
import { ContactContext } from "../../contexts/ContactContext";
import { Header, Name, LegalName, Detail } from "../styles/ContactProfile";
import { BaseButton } from "../styles/Button";
import { ContactInformation } from "./ContactInformation";

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
      <div>
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
            <Refresh />
            &nbsp;Refresh Contact
          </BaseButton>
          <Link
            href={`/contacts/[id]/edit`}
            as={`/contacts/${contact.contactId}/edit`}
            passHref
          >
            <BaseButton>
              <Edit />
              &nbsp;Edit Contact
            </BaseButton>
          </Link>
        </Header>
        <Detail>
          <CardContent>
            <ContactInformation info={contact} />
          </CardContent>
        </Detail>
        <StyledAppBar>
          <StyledTabs value={activeTab} onChange={handleTabChange}>
            <StyledTab label="Summary" />
            <StyledTab label="Notes" />
            <StyledTab label="Messages" />
          </StyledTabs>
        </StyledAppBar>
        <TabPanel value={activeTab} index={0}>
          <Summary />
        </TabPanel>
        <TabPanel value={activeTab} index={1}>
          <Entries type={TYPE_NOTE} NewFormComponent={NoteEdit} />
        </TabPanel>
        <TabPanel value={activeTab} index={2}>
          <Entries contactId={id} type={TYPE_CONVERSATION} />
        </TabPanel>
      </div>
    </ContactContext.Provider>
  );
};

ContactOverview.propTypes = {
  id: PropTypes.string.isRequired
};

export default ContactOverview;
