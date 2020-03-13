import { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// material
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import EditNote from './EditNote';
// styled
import { BodyText } from '../styles/Typography';

// styles
const Container = styled.div`
  margin-top: 1rem;
`;

const NoteItem = ({ note }) => {
  const { entryId, title, message } = note;
  const [anchorEl, setAnchorEl] = useState(null);
  const [edit, setEdit] = useState(false);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    handleClose();
    setEdit(true);
  };

  return (
    <>
      {edit ? (
        <EditNote note={note} setEdit={setEdit} />
      ) : (
          <Container key={entryId}>
            <Card>
              <CardHeader
                title={title}
                style={{ borderBottom: '1px solid #EEEEEE' }}
                action={
                  <>
                    <IconButton aria-label="settings" onClick={handleClick}>
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      id="simple-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <MenuItem onClick={handleEdit}>Edit</MenuItem>
                    </Menu>
                  </>
                }
              />
              <CardContent>
                <BodyText>{message}</BodyText>
              </CardContent>
            </Card>
          </Container>
        )}
    </>
  );
};

NoteItem.propTypes = {
  // TODO: add shape to prop type
  note: PropTypes.object.isRequired,
};

export default NoteItem;
