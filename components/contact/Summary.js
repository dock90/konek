import styled from "styled-components";
import { useContext } from "react";
import { useMutation } from "@apollo/react-hooks";
import { ContactContext } from "../../contexts/ContactContext";
// Components
import { Paper, Grid } from "@material-ui/core";
import AvatarPicture from "../assets/AvatarPicture";
import MessageAction from "../actions/MessageAction";
// styles
import { H4, H5 } from "../styles/Typography";
import { Header, Name } from "../styles/ContactProfile";
// queries
import {
  CONTACT_QUERY,
  GENERATE_INVITATION_CODE
} from "../../queries/ContactQueries";
import {BaseButton} from "../styles/Button";

const SummaryContainer = styled(Paper)`
  padding: 10px;
`;
const InvitationCodeInstructions = styled.span`
  padding: 10px;
`;
const CodeInput = styled.input`
  padding: 2px;
  text-align: center;
  width: 355px;
  border-radius: 3px;
  border: solid 1px gray;
`;

const Summary = () => {
  const { profile, invitationCode, contactId } = useContext(ContactContext);
  const [generateCodeMutation, { loading }] = useMutation(
    GENERATE_INVITATION_CODE,
    {
      variables: { contactId },
      update(proxy, { data }) {
        const { contact } = proxy.readQuery({
          query: CONTACT_QUERY,
          variables: { contactId }
        });

        // Update the contact, the new code will trickle down through the context.
        contact.invitationCode = data.generateInvitationCode;

        proxy.writeQuery({
          query: CONTACT_QUERY,
          variables: { contactId },
          data: { contact }
        });
      }
    }
  );

  const invitationLink = `${window.location.origin}/invitation?code=${invitationCode}`;

  const handleGenerateCode = async e => {
    e.preventDefault();

    await generateCodeMutation();
  };

  const handleCodeFocus = e => {
    e.target.select();
  };

  return (
    <div>
      {profile && (
        <>
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

              {profile.language && (
                <Grid item>Language: {profile.language}</Grid>
              )}
            </Grid>
          </SummaryContainer>
        </>
      )}
      {!profile && (
        <SummaryContainer style={{ marginTop: 15 }}>
          <H4>Invitation Code</H4>
          {invitationCode && (
            <>
              <CodeInput
                readOnly
                disabled={loading}
                value={invitationLink}
                onFocus={handleCodeFocus}
              />
              <InvitationCodeInstructions>
                Send the link to the relevant person to associate this contact
                with their profile.
              </InvitationCodeInstructions>
            </>
          )}
          <div style={{marginTop: 5}}>
            <BaseButton disabled={loading} onClick={handleGenerateCode}>
              Generate Code
            </BaseButton>
          </div>
        </SummaryContainer>
      )}
    </div>
  );
};

export default Summary;
