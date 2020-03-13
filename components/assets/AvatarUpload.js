import PropTypes from "prop-types";
import { Avatar } from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import FileUpload from "./FileUpload";
import styled from "styled-components";
import { useState } from "react";
import AvatarPicture from "./AvatarPicture";

const EditIcon = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;

  transition: opacity 150ms ease-in-out;
`;

const Message = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;

  border-radius: 5px;
  text-align: center;

  opacity: 0;
  transition: opacity 150ms ease-in-out;

  background-color: white;

  display: flex;
  align-items: center;
`;

const Container = styled.a`
  position: relative;
  display: inline-block;
  :hover {
    ${Message} {
      opacity: 0.75;
    }
    ${EditIcon} {
      opacity: 0;
    }
  }
`;

const AvatarUpload = props => {
  const [open, setOpen] = useState(false);

  const openUploader = e => {
    e.preventDefault();

    setOpen(true);
  };

  const closeUploader = e => {
    setOpen(false);
  };

  return (
    <Container href="#" onClick={openUploader} size={props.size}>
      <FileUpload
        folderId="avatar"
        open={open}
        onClose={closeUploader}
        tags={["avatar", props.avatarType]}
        folder={props.folder}
        resourceType="image"
        onSuccess={props.onSuccess}
      />
      <AvatarPicture size={props.size} picture={props.picture} />
      <Message>Change Picture</Message>
      <EditIcon>
        <Edit />
      </EditIcon>
    </Container>
  );
};

AvatarUpload.propTypes = {
  /**
   * Size in pixels to show the avatar.
   */
  size: PropTypes.number,
  picture: PropTypes.shape({
    format: PropTypes.string,
    publicId: PropTypes.string,
    resourceType: PropTypes.string,
    type: PropTypes.string
  }),
  /**
   * Will be something like "contact", "profile" or "group".
   * This value will be included in the files's tags.
   */
  avatarType: PropTypes.string.isRequired,
  folder: PropTypes.string.isRequired,
  onSuccess: PropTypes.func
};

export default AvatarUpload;
