import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
// components
import ListItem from './ListItem';
import Loading from "../Loading";

// ALL_CONTACTS_QUERY
const ALL_CONTACTS_QUERY = gql`
  query ALL_CONTACTS_QUERY {
    contacts {
      data {
        contactId
        name
        country
      }
    }
  }
`;

// styles
const ListContainer = styled.div``;

const ContactList = () => (
  <Query query={ALL_CONTACTS_QUERY}>
    {({ data, loading, error }) => {
      if (loading) return <Loading />;
      if (error) return <p>Error: {error.message}</p>;
      return (
        <ListContainer>
          {data.contacts.data.map(contact => (
            <ListItem contactData={contact} key={contact.contactId} />
          ))}
        </ListContainer>
      );
    }}
  </Query>
);

export default ContactList;
