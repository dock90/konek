import styled from "styled-components";
import { useContext } from "react";
import { ContactContext } from "../../../contexts/ContactContext";
import { H4, H5 } from "../../styles/Typography";
import { Header, Name } from "../../styles/ContactProfile";
import AvatarPicture from "../../assets/AvatarPicture";
import MessageAction from "../../actions/MessageAction";
import { Grid, Paper } from "@material-ui/core";
import ContactListItem from "../../contacts/ContactListItem";

const ProfileContactsContainer = styled.div`
  margin-top: 10px;
`;
const SummaryContainer = styled(Paper)`
  padding: 10px;
`;

const ProfileInfo = () => {
  const { profile } = useContext(ContactContext);

  if (!profile) {
    return null;
  }

  return (
    <div>
      <H4>Profile</H4>
      <SummaryContainer>
        <Header>
          <AvatarPicture
            size={40}
            picture={profile.picture}
            style={{ marginRight: 10 }}
          />
          <Name>
            <h2>{profile.name}</h2>
            <div>
              <MessageAction roomId={profile.roomId}>
                Send Message
              </MessageAction>
            </div>
          </Name>
        </Header>
        <Grid container spacing={2}>
          <Grid item>
            <H5>Emails</H5>
            {profile.emails.map((e, k) => (
              <div key={k}>
                {e.label && e.label + ":"} {e.email}
              </div>
            ))}
          </Grid>

          {profile.phones && profile.phones.length > 0 && (
            <Grid item>
              <H5>Phone Numbers</H5>
              {profile.phones.map((p, k) => (
                <div key={k}>
                  {p.number} {p.label}
                </div>
              ))}
            </Grid>
          )}

          <Grid item>
            {profile.city} {profile.state} {profile.postalCode}
          </Grid>

          {profile.language && <Grid item>Language: {profile.language}</Grid>}
        </Grid>
        {profile.contacts.length > 1 && (
          <ProfileContactsContainer>
            <H4>Other Contacts</H4>
            {profile.contacts
              .filter(c => c.contactId !== contactId)
              .map(c => (
                <ContactListItem key={c.contactId} contactData={c} />
              ))}
          </ProfileContactsContainer>
        )}
      </SummaryContainer>
    </div>
  );
};

export default ProfileInfo;
