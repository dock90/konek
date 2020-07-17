import styled from 'styled-components';
import { useContext } from 'react';
import { ContactContext } from '../../../contexts/ContactContext';
import { H4 } from '../../styles/Typography';
import { Header, Name } from '../../styles/ContactProfile';
import AvatarPicture from '../../assets/AvatarPicture';
import MessageAction from '../../actions/MessageAction';
import { Paper } from '@material-ui/core';
import ContactListItem from '../../contacts/ContactListItem';
import { ContentHeader } from '../../styles/PageStyles';
import { CopyProfileToContact } from './CopyProfileToContact';
import { ContactInformation } from '../ContactInformation';

const ProfileContactsContainer = styled.div`
  margin-top: 10px;
`;
const SummaryContainer = styled(Paper)`
  padding: 10px;
`;

const ProfileInfo = () => {
  const { profile, contactId } = useContext(ContactContext);

  if (!profile) {
    return null;
  }

  return (
    <div>
      <ContentHeader>
        <H4>Profile</H4>
        <CopyProfileToContact />
      </ContentHeader>
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
        <ContactInformation info={profile} />
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
