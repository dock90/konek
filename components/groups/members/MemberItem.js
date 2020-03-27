import styled from "styled-components";
import MessageAction from "../../actions/MessageAction";
import ContactView from "../../actions/ContactView";
import AvatarPicture from "../../assets/AvatarPicture";

const Container = styled.div`
  display: flex;
  justify-content: space-between;

  border-radius: 3px;
  padding: 3px;
  transition: background-color 150ms linear;
  :hover {
    background-color: whitesmoke;
  }
`;

const Overview = styled.div`
  display: flex;
`;
const Actions = styled.div`
  > :not(:last-child) {
    margin-right: 5px;
  }
`;

const MemberItem = ({ member }) => {
  return (
    <Container>
      <Overview>
        <AvatarPicture size={35} picture={member.picture} style={{ marginRight: 15 }} />
        <div>
          <div>{member.name}</div>
          <div>{member.role.name}</div>
        </div>
      </Overview>
      <Actions>
        {member.profile && member.profile.roomId && (
          <MessageAction roomId={member.profile.roomId}>Message</MessageAction>
        )}
        {member.contact && member.contact.contactId && (
          <ContactView
            name={member.contact.name}
            contactId={member.contact.contactId}
          />
        )}
      </Actions>
    </Container>
  );
};

export default MemberItem;