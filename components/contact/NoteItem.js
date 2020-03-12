import { useState } from "react";
import PropTypes from "prop-types";
// material
import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Menu,
  MenuItem
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import EditNote from "./EditNote";
// styled
import { BodyText } from "../styles/Typography";
import { Container } from "./EntryStyles";
import styled from "styled-components";
import AssetDisplay from "../assets/AssetDisplay";
import TagsList from "../tags/TagsList";

const NoteMessage = styled(BodyText)`
  white-space: pre-wrap;
`;

const AssetsWrapper = styled.div`
  margin-top: 1em;
  display: flex;
  flex-wrap: wrap;
`;

const NoteItem = ({ note }) => {
  const { entryId, title, message, assets } = note;
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
              style={{ borderBottom: "1px solid #EEEEEE" }}
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
              {note.tags && (
              <div>
                <TagsList tags={note.tags} />
              </div>
            )}
              <NoteMessage>{message}</NoteMessage>
              {assets && (
                <AssetsWrapper>
                  {assets.map((a, k) => (
                    <AssetDisplay
                      key={k}
                      asset={a.asset}
                      description={a.description}
                      size={100}
                    />
                  ))}
                </AssetsWrapper>
              )}
            </CardContent>
          </Card>
        </Container>
      )}
    </>
  );
};

NoteItem.propTypes = {
  // TODO: add shape to prop type
  note: PropTypes.object.isRequired
};

export default NoteItem;
