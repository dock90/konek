import PropTypes from 'prop-types';
import styled from 'styled-components';
import { BaseButton } from '../styles/Button';
import { Paper } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import NoteEditAsset from './NoteEditAsset';
import FileUpload from '../assets/FileUpload';
import { useContext, useState } from 'react';
import { ContactContext } from '../../contexts/ContactContext';

// I'm not using the Material-UI Grid component because I want a fixed width.
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const Item = styled(Paper)`
  margin-right: 15px;
`;

const NoteEditAssets = ({ assets, onChange }) => {
  const { assetFolderId } = useContext(ContactContext);
  const [uploadOpen, toggleUpload] = useState(false);
  const handleAddFile = e => {
    e.preventDefault();
    onChange([...(assets || []), {}]);
  };

  const handleChange = key => asset => {
    const items = [...assets];
    if (asset) {
      items[key] = asset;
    } else {
      // Delete asset.
      items.splice(key, 1);
    }
    onChange(items);
  };
  const handleUploadClick = e => {
    e.preventDefault();
    toggleUpload(true);
  };
  const handleUploadSuccess = info => {
    if (!assets) {
      assets = [];
    }
    // This is sorta naughty to edit the state directly like this, but it is necessary because when uploading
    // multiple assets that finish at the same time, the state update from the first asset may not be completed
    // when the second success callback gets called so the first one is lost.
    assets.push({
      description: '',
      asset: {
        format: info.format,
        publicId: info.public_id,
        resourceType: info.resource_type,
        type: info.type,
        originalFilename: info.original_filename,
        isAudio: info.is_audio
      }
    });
    onChange(assets);
  };

  return (
    <>
      <Container>
        {assets &&
          assets.length > 0 &&
          assets.map((a, k) => (
            <Item key={k}>
              <NoteEditAsset asset={a} onChange={handleChange(k)} />
            </Item>
          ))}
      </Container>
      <div>
        <BaseButton onClick={handleUploadClick}>
          <Add /> Add Files
        </BaseButton>
        <FileUpload
          folder={assetFolderId}
          open={uploadOpen}
          onClose={() => toggleUpload(false)}
          // maxFiles={}
          tags={['contact', 'note']}
          onSuccess={handleUploadSuccess}
        />
      </div>
    </>
  );
};

NoteEditAssets.propTypes = {
  assets: PropTypes.array,
  onChange: PropTypes.func.isRequired
};

export default NoteEditAssets;
