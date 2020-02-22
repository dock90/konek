import { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Mutation } from 'react-apollo';
// gql
import gql from 'graphql-tag';
import { useApolloClient } from '@apollo/react-hooks';
// material
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';
// gql
import { CREATE_NOTE_MUTATION } from '../../queries/NotesQueries';

// styles
const Container = styled.div`
  margin-top: 1rem;
`;

const Title = styled.div`
  padding: 1rem;
  border-bottom: 1px solid rgb(238, 238, 238);
`;

const NewNote = ({ contactId, setNewNote }) => {
  const [note, setNote] = useState({
    title: '',
    message: '',
  });

  const handleChange = event => {
    const { name, value } = event.target;
    setNote({
      ...note,
      [name]: value,
    });
  };

  const handleSubmit = (event, createNoteMutation) => {
    event.preventDefault();
    createNoteMutation({
      variables: {
        contactId,
        ...note,
      },
    });
    setNewNote(false);
    // TODO: update cache with new note data
  };

  return (
    <Mutation mutation={CREATE_NOTE_MUTATION} variables={note}>
      {(createNote, { loading, error }) => {
        const { title, message } = note;
        return (
          <Container>
            <form onSubmit={event => handleSubmit(event, createNote)}>
              <fieldset
                disabled={loading}
                aria-busy={loading}
                style={{
                  border: 'none',
                  margin: 0,
                  padding: 0,
                }}
              >
                <Card>
                  <Title>
                    <TextField
                      id="title"
                      name="title"
                      label="Title"
                      required
                      value={title}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                      }}
                    />
                  </Title>
                  <CardContent>
                    <TextField
                      id="message"
                      name="message"
                      label="Message"
                      required
                      value={message}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                      }}
                    />
                  </CardContent>
                  <CardActions>
                    <Button type="submit">Add</Button>
                  </CardActions>
                </Card>
              </fieldset>
            </form>
          </Container>
        );
      }}
    </Mutation>
  );
};

NewNote.propTypes = {
  contactId: PropTypes.string.isRequired,
  setNewNote: PropTypes.func.isRequired,
};

export default NewNote;
