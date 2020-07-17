import React from 'react';
import { H4 } from '../../styles/Typography';
import { BaseButton } from '../../styles/Button';
import { useContext } from 'react';
import { ContactContext } from '../../../contexts/ContactContext';
import styled from 'styled-components';
import { Paper } from '@material-ui/core';
import { useMutation } from '@apollo/client';
import {
  CONTACT_QUERY,
  GENERATE_INVITATION_CODE,
} from '../../../queries/ContactQueries';
import { GenerateInvitationCode } from '../../../queries/types/GenerateInvitationCode';
import { ContactQuery } from '../../../queries/types/ContactQuery';

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

export function Invitation() {
  const { invitationCode, contactId } = useContext(ContactContext);
  const [generateCodeMutation, { loading }] = useMutation<
    GenerateInvitationCode
  >(GENERATE_INVITATION_CODE, {
    variables: { contactId },
    update(proxy, { data }) {
      if (!data) {
        return;
      }
      const { contact } = proxy.readQuery({
        query: CONTACT_QUERY,
        variables: { contactId },
      }) as ContactQuery;

      if (!contact) {
        return;
      }

      // Update the contact, the new code will trickle down through the context.
      contact.invitationCode = data.generateInvitationCode;

      proxy.writeQuery({
        query: CONTACT_QUERY,
        variables: { contactId },
        data: { contact },
      });
    },
  });

  const invitationLink = `${window.location.origin}/invitation?code=${invitationCode}`;

  const handleGenerateCode = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    await generateCodeMutation();
  };

  const handleCodeFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  return (
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
            Send the link to the relevant person to associate this contact with
            their profile.
          </InvitationCodeInstructions>
        </>
      )}
      <div style={{ marginTop: 5 }}>
        <BaseButton disabled={loading} onClick={handleGenerateCode}>
          {invitationCode ? 'Regenerate ' : 'Generate '}
          Code
        </BaseButton>
      </div>
    </SummaryContainer>
  );
}
