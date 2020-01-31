import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
// gql
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
// material
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
// components
import styled from 'styled-components';
import { H3, H4, H6, BodyText } from '../styles/Typography';

// CONTACT_QUERY
const CONTACT_QUERY = gql`
  query CONTACT_QUERY($id: ID!) {
    contact(contactId: $id) {
      name
      city
      state
      postalCode
      country
      language
    }
  }
`;

// UPDATE_CONTACT_MUTATION
const UPDATE_CONTACT_MUTATION = gql`
  mutation UPDATE_CONTACT_MUTATION(
    $contactId: ID!
    $name: String
    $city: String
    $state: String
    $postalCode: String
    $country: String
    $language: String
  ) {
    updateContact(
      input: {
        contactId: $contactId
        name: $name
        city: $city
        state: $state
        postalCode: $postalCode
        country: $country
        language: $language
      }
    ) {
      contactId
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

const ContactEdit = ({ id }) => {
  const [contact, setContact] = useState({});

  const handleChange = event => {
    const { name, value } = event.target;
    setContact({
      ...contact,
      [name]: value,
    });
  };

  const handleSubmit = (event, updateContactMutation) => {
    event.preventDefault();
    updateContactMutation({
      variables: {
        contactId: id,
        ...contact,
      },
    });
  };

  return (
    <Query query={CONTACT_QUERY} variables={{ id }}>
      {({ data, error, loading }) => {
        if (error) return <p>Error: {error.message}</p>;
        if (loading) return <p>Loading...</p>;
        return (
          <Mutation mutation={UPDATE_CONTACT_MUTATION} variables={contact}>
            {(updateContact, { loading, error }) => (
              <Container>
                <Header>
                  <H3 style={{ margin: 0 }}>Edit Contact</H3>
                </Header>
                <form onSubmit={event => handleSubmit(event, updateContact)}>
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
                            <H4>{contact.name || data.contact.name}</H4>
                            {(contact.city || data.contact.city) && (
                              <H6>{`${contact.city ||
                                data.contact.city}, ${contact.state ||
                                data.contact.state}`}</H6>
                            )}
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
                                  id="name"
                                  name="name"
                                  label="Name"
                                  required
                                  defaultValue={data.contact.name}
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
                                  defaultValue={data.contact.city}
                                  onChange={handleChange}
                                  variant="outlined"
                                  style={{ marginRight: 12, marginBottom: 12 }}
                                />
                                <TextField
                                  id="state"
                                  name="state"
                                  label="State"
                                  defaultValue={data.contact.state}
                                  onChange={handleChange}
                                  variant="outlined"
                                  style={{ marginRight: 12, marginBottom: 12 }}
                                />
                                <TextField
                                  id="postalCode"
                                  name="postalCode"
                                  defaultValue={data.contact.postalCode}
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
                                  defaultValue={data.contact.country}
                                  onChange={handleChange}
                                  label="Country"
                                  variant="outlined"
                                  style={{ marginRight: 12, marginBottom: 12 }}
                                />
                                <TextField
                                  id="language"
                                  name="language"
                                  defaultValue={data.contact.language}
                                  onChange={handleChange}
                                  label="Primary Language"
                                  variant="outlined"
                                  style={{ marginRight: 12, marginBottom: 12 }}
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <Button
                                  type="submit"
                                  style={{
                                    background: '#4CAF50',
                                    color: '#FFF',
                                  }}
                                >
                                  Edit Contact
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
            )}
          </Mutation>
        );
      }}
    </Query>
  );
};

export default ContactEdit;
