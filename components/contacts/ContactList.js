import styled from 'styled-components';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { ALL_CONTACTS_QUERY } from '../../queries/ContactQueries';
import { TAGS_QUERY } from '../../queries/TagQueries';
// components
import Link from 'next/link';
import ContactListItem from './ContactListItem';
import Loading from '../Loading';
import TagsList from '../tags/TagsList';
import { H1 } from '../styles/Typography';
import { BaseButton } from '../styles/Button';
import { Add } from '@material-ui/icons';
import { ContentHeader } from '../styles/PageStyles';

// styles
const HeaderLeft = styled.div`
  flex-grow: 1;

  display: flex;
  align-items: center;
`;

const ContactList = () => {
  const router = useRouter();
  const tags = [];
  if (router.query.tagId) {
    if (Array.isArray(router.query.tagId)) {
      tags.push(...router.query.tagId);
    } else {
      tags.push(router.query.tagId);
    }
  }
  const { data, loading, error } = useQuery(ALL_CONTACTS_QUERY, {
    variables: { tags },
  });
  const { data: tagData, loading: tagsLoading } = useQuery(TAGS_QUERY, {
    skip: tags.length === 0,
  });

  if (loading || tagsLoading) return <Loading />;
  if (error) return <p>Error: {error.message}</p>;

  let selectedTags = [];
  if (tags.length > 0 && tagData && tagData.tags) {
    selectedTags = tagData.tags.filter((t) => tags.includes(t.tagId));
  }

  return (
    <div>
      <ContentHeader>
        <HeaderLeft>
          <H1>Contacts</H1>
          <span style={{ marginLeft: 15 }}>
            <TagsList tags={selectedTags} />
          </span>
        </HeaderLeft>
        <Link href="/contacts/new" passHref={true}>
          <BaseButton>
            <Add /> New Contact
          </BaseButton>
        </Link>
      </ContentHeader>
      <div>
        {data.contacts.data.map((contact) => (
          <ContactListItem contactData={contact} key={contact.contactId} />
        ))}
      </div>
    </div>
  );
};

export default ContactList;
