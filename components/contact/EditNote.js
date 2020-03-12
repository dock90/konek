import { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Mutation } from 'react-apollo';
// material
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';
// gql
import { UPDATE_NOTE_MUTATION } from '../../queries/NoteQueries';

// styles
const Container = styled.div`
  margin-top: 1rem;
`;

const Title = styled.div`
  padding: 1rem;
  border-bottom: 1px solid rgb(238, 238, 238);
`;

const EditNote = ({ note, setEdit }) => {
  const { entryId, title, message } = note;
  const [pending, setNote] = useState({
    title,
    message,
  });

  const handleChange = event => {
    const { name, value } = event.target;
    setNote({
      ...pending,
      [name]: value,
    });
  };

  const handleSubmit = (event, editNoteMutation) => {
    event.preventDefault();
    editNoteMutation({
      variables: {
        entryId,
        ...pending,
      },
    });
    setEdit(false);
  };

  return (
    <Mutation mutation={UPDATE_NOTE_MUTATION} variables={note}>
      {(editNote, { loading }) => (
        <Container>
          <form onSubmit={event => handleSubmit(event, editNote)}>
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
                    value={pending.title}
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
                    value={pending.message}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                    }}
                  />
                </CardContent>
                <CardActions>
                  <Button type="submit">Save</Button>
                </CardActions>
              </Card>
            </fieldset>
          </form>
        </Container>
      )}
    </Mutation>
  );
};

EditNote.propTypes = {
  setEdit: PropTypes.func.isRequired,
  note: PropTypes.shape({
    entryId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
  }).isRequired,
};

export default EditNote;
