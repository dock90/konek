import React, { useState } from 'react';
// gql
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
// material
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
// styled
import styled from 'styled-components';
import { H3, H4, H6, BodyText } from '../styles/Typography';

// styles
const Container = styled.div``;
const Header = styled.div``;

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
    city: '',
    state: '',
    postalCode: '',
    country: '',
    language: '',
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
        const {
          contactName,
          city,
          state,
          postalCode,
          country,
          language,
        } = contact;
        return (
          <Container>
            <Header>
              <H3 style={{ margin: 0 }}>Add New Contact</H3>
            </Header>
            <form onSubmit={event => handleSubmit(event, createContact)}>
              <fieldset
                disabled={loading}
                aria-busy={loading}
                style={{
                  border: 'none',
                  margin: 0,
                }}
              >
                <Grid
                  container
                  spacing={2}
                  style={{ marginTop: 16, maxWidth: 1200 }}
                >
                  <Grid item xs={12} sm={8} md={4} lg={3}>
                    <Card
                      style={{
                        maxWidth: 250,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                      }}
                    >
                      <CardContent
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                        }}
                      >
                        <Avatar
                          alt="User Profile Image"
                          src="https://raw.githubusercontent.com/EdwardGoomba/imgHost/master/crmBeta/profile.png"
                          style={{
                            height: 60,
                            width: 60,
                          }}
                        />
                        <H4>{contactName || 'Name'}</H4>
                        <H6>{`${city || 'City'}, ${state || 'State'}`}</H6>
                        <BodyText>Managing Director</BodyText>
                      </CardContent>
                      <CardActions>
                        <Button>Upload Photo</Button>
                      </CardActions>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={10} md={8} lg={9}>
                    <Card style={{ marginBottom: 14 }}>
                      <CardContent>
                        <H4>Account Information</H4>
                        <Grid container>
                          <Grid item xs={12}>
                            <TextField
                              id="contactName"
                              name="contactName"
                              label="Name"
                              required
                              value={contactName}
                              onChange={handleChange}
                              variant="outlined"
                              style={{
                                marginRight: 12,
                                marginBottom: 12,
                                width: '50%',
                              }}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              id="outlined-basic"
                              label="Email"
                              variant="outlined"
                              style={{ marginRight: 12, marginBottom: 12 }}
                            />
                            <TextField
                              id="outlined-basic"
                              label="Phone"
                              variant="outlined"
                              style={{ marginRight: 12, marginBottom: 12 }}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              id="city"
                              name="city"
                              label="City"
                              value={city}
                              onChange={handleChange}
                              variant="outlined"
                              style={{ marginRight: 12, marginBottom: 12 }}
                            />
                            <TextField
                              id="state"
                              name="state"
                              label="State"
                              value={state}
                              onChange={handleChange}
                              variant="outlined"
                              style={{ marginRight: 12, marginBottom: 12 }}
                            />
                            <TextField
                              id="postalCode"
                              name="postalCode"
                              value={postalCode}
                              onChange={handleChange}
                              label="Postal Code"
                              variant="outlined"
                              style={{ marginRight: 12, marginBottom: 12 }}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              id="country"
                              name="country"
                              value={country}
                              onChange={handleChange}
                              label="Country"
                              variant="outlined"
                              style={{ marginRight: 12, marginBottom: 12 }}
                            />
                            <TextField
                              id="language"
                              name="language"
                              value={language}
                              onChange={handleChange}
                              label="Primary Language"
                              variant="outlined"
                              style={{ marginRight: 12, marginBottom: 12 }}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <Button
                              type="submit"
                              style={{ background: '#4CAF50', color: '#FFF' }}
                            >
                              Add Contact
                            </Button>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </fieldset>
            </form>
          </Container>
        );
      }}
    </Mutation>
  );
};

export default CreateContact;
