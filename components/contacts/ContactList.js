import { Query } from "react-apollo";
import styled from "styled-components";
// components
import ContactListItem from "./ContactListItem";
import Loading from "../Loading";
import { ALL_CONTACTS_QUERY } from "../../queries/ContactQueries";

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
            <ContactListItem contactData={contact} key={contact.contactId} />
          ))}
        </ListContainer>
      );
    }}
  </Query>
);

export default ContactList;
