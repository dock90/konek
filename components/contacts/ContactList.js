import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const CONTACTS_QUERY = gql`
  query CONTACTS_QUERY {
    contacts {
      data
    }
  }
`;

const ContactList = () => (
  <Query query={CONTACTS_QUERY}>
    {({ data, loading, error }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error: {error.message}</p>;
      console.log('Contact List Data: ', data);
    }}
  </Query>
);

export default ContactList;
