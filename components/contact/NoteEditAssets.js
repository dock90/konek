import PropTypes from "prop-types";
import styled from "styled-components";
import { Grid } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import Button from "../styles/Button";
import NoteEditAsset from "./NoteEditAsset";
import FileUpload from "../assets/FileUpload";
import { useContext, useState } from "react";
import { ContactContext } from "../../contexts/ContactContext";

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
      description: "",
      asset: {
        format: info.format,
        publicId: info.public_id,
        resourceType: info.resource_type,
        type: info.type,
        originalFilename: info.original_filename
      }
    });
    onChange(assets);
  };

  return (
    <Grid container spacing={2}>
      {assets &&
        assets.length > 0 &&
        assets.map((a, k) => (
          <Grid key={k} item xs={12} sm={6} md={3} lg={2}>
            <NoteEditAsset asset={a} onChange={handleChange(k)} />
          </Grid>
        ))}
      <Grid item xs={12}>
        <Button onClick={handleUploadClick}>Add Files</Button>
        <FileUpload
          folder={assetFolderId}
          open={uploadOpen}
          onClose={() => toggleUpload(false)}
          // maxFiles={}
          tags={["contact", "note"]}
          onSuccess={handleUploadSuccess}
        />
      </Grid>
    </Grid>
  );
};

NoteEditAssets.propTypes = {
  assets: PropTypes.array,
  onChange: PropTypes.func.isRequired
};

export default NoteEditAssets;
