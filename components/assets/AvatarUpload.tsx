import React, { SyntheticEvent } from 'react';
import { Edit } from '@material-ui/icons';
import FileUpload from './FileUpload';
import styled from 'styled-components';
import { useState } from 'react';
import AvatarPicture from './AvatarPicture';
import { AssetFields } from '../../queries/types/AssetFields';

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

interface Props {
  avatarType: string;
  folder: string;
  size: number;
  picture?: AssetFields;
  onSuccess?: () => void;
  disabled?: boolean;
}

const AvatarUpload: React.FC<Props> = ({
  size,
  picture,
  onSuccess,
  avatarType,
  folder,
  disabled,
}) => {
  const [open, setOpen] = useState(false);

  const openUploader = (e: SyntheticEvent): void => {
    e.preventDefault();
    if (disabled) {
      return;
    }

    setOpen(true);
  };

  const closeUploader = () => {
    setOpen(false);
  };

  return (
    <Container href="#" onClick={openUploader}>
      <FileUpload
        open={open}
        onClose={closeUploader}
        tags={['avatar', avatarType]}
        folder={folder}
        resourceType="image"
        onSuccess={onSuccess}
      />
      <AvatarPicture size={size} picture={picture} />
      {!disabled && <Message>Change Picture</Message>}
      {!disabled && (
        <EditIcon>
          <Edit />
        </EditIcon>
      )}
    </Container>
  );
};

export default AvatarUpload;
