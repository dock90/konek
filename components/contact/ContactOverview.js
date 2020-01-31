import PropTypes from 'prop-types';
import Link from 'next/link';
// gql
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
// material
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
// components
import styled from 'styled-components';
import TabPanel from '../TabPanel';
import Summary from './Summary';
import Notes from './Notes';
import Messages from './Messages';
import Tasks from './Tasks';
import Files from './Files';

// styled
import { H5, LinkText } from '../styles/Typography';
import { BorderButton } from '../material/StyledButton';
import StyledAppBar from '../material/StyledAppBar';
import StyledTabs from '../material/StyledTabs';
import StyledTab from '../material/StyledTab';

// CONTACT_QUERY
const CONTACT_QUERY = gql`
  query CONTACT_QUERY($id: ID!) {
    contact(contactId: $id) {
      name
    }
  }
`;

// styles
const Container = styled.div``;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const Name = styled.div`
  display: flex;
  align-items: center;
`;

const Bio = styled.div`
  margin-bottom: 1rem;
`;

const ContactOverview = ({ id }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Query query={CONTACT_QUERY} variables={{ id }}>
      {({ data, loading, error }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error: {error.message}</p>;
        const {
          contact: { name },
        } = data;
        return (
          <Container>
            <Header>
              <Name>
                <Avatar
                  alt="User Profile Image"
                  src="https://raw.githubusercontent.com/EdwardGoomba/imgHost/master/crmBeta/profile.png"
                  style={{
                    height: 40,
                    width: 40,
                    marginRight: 10,
                  }}
                />
                <h2>{name}</h2>
              </Name>
              <Link href={`/contacts/editContact?id=${id}`}>
                <LinkText>
                  <BorderButton>Edit Profile</BorderButton>
                </LinkText>
              </Link>
            </Header>
            <Bio>
              <Card>
                <CardHeader
                  title="Bio"
                  style={{ borderBottom: '1px solid #EEEEEE' }}
                />
                <CardContent>
                  <H5>Quick summary of the person.</H5>
                </CardContent>
              </Card>
            </Bio>
            <TabPanel>
              <StyledAppBar position="static">
                <StyledTabs value={value} onChange={handleChange}>
                  <StyledTab label="Summary" />
                  <StyledTab label="Notes" />
                  <StyledTab label="Messages" />
                  <StyledTab label="Tasks" />
                  <StyledTab label="Files" />
                </StyledTabs>
              </StyledAppBar>
              <TabPanel value={value} index={0}>
                <Summary />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Notes />
              </TabPanel>
              <TabPanel value={value} index={2}>
                <Messages />
              </TabPanel>
              <TabPanel value={value} index={3}>
                <Tasks />
              </TabPanel>
              <TabPanel value={value} index={4}>
                <Files />
              </TabPanel>
            </TabPanel>
          </Container>
        );
      }}
    </Query>
  );
};

export default ContactOverview;
