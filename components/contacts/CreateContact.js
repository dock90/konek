import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const CREATE_CONTACT_MUTATION = gql`
  mutation CREATE_CONTACT_MUTATION(
    $name: String!
    $groups: [ContactGroupInput!]!
  ) {
    createContact(input: { name: $name, groups: $groups }) {
      contactId
    }
  }
`;

const CreateContact = () => {
  const [contact, setContact] = useState({
    contactName: '',
    groups: {
      groupId: '5e33970eba16030004df53ee',
      roleId: 'member',
    },
  });

  const handleChange = event => {
    const { name, value } = event.target;
    console.log('Pre Change Groups: ', contact.groups);
    setContact({
      ...contact,
      [name]: value,
    });
  };

  const handleSubmit = (event, createContactMutation) => {
    const { contactName, groups } = contact;
    event.preventDefault();
    createContactMutation({
      variables: {
        name: contactName,
        groups,
      },
    });
  };

  return (
    <Mutation mutation={CREATE_CONTACT_MUTATION} variables={contact}>
      {(createContact, { loading, error }) => {
        const { contactName } = contact;
        return (
          <form onSubmit={event => handleSubmit(event, createContact)}>
            <fieldset disabled={loading} aria-busy={loading}>
              <label htmlFor="contactName">
                Name
                <input
                  type="text"
                  id="contactName"
                  name="contactName"
                  placeholder="Name"
                  required
                  value={contactName}
                  onChange={handleChange}
                />
              </label>
              <button type="submit">Add Contact</button>
            </fieldset>
          </form>
        );
      }}
    </Mutation>
  );
};

export default CreateContact;
