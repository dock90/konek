import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useContext } from 'react';
import { Image } from 'cloudinary-react';
import { DeleteButton } from '../styles/Button';
import { TextField, Paper } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import AssetDisplay from '../assets/AssetDisplay';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
const DisplayWrapper = styled.div`
  flex-grow: 1;
  text-align: center;
`;
const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 5px;
`;

const NoteEditAsset = ({ asset, onChange }) => {
  const handleDelete = e => {
    e.preventDefault();
    onChange(null);
  };
  const handleDescrChange = e => {
    onChange({
      ...asset,
      description: e.target.value
    });
  };

  return (
    <Container>
      <DisplayWrapper>
        {asset.asset && (
          <AssetDisplay
            description={asset.description}
            asset={asset.asset}
            descriptionDialogOnly
            noPaper
            size={150}
          />
        )}
      </DisplayWrapper>
      <div style={{ padding: 5 }}>
        <TextField
          value={asset.description || ''}
          onChange={handleDescrChange}
          label="Description"
          style={{ width: '100%' }}
        />
      </div>
      <Actions>
        <DeleteButton onClick={handleDelete}>
          <Delete />
        </DeleteButton>
      </Actions>
    </Container>
  );
};

NoteEditAsset.propTypes = {
  asset: PropTypes.object,
  onClose: PropTypes.func
};

export default NoteEditAsset;
