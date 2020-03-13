import PropTypes from "prop-types";
import styled from "styled-components";
import { useContext, useState } from "react";
import { Image } from "cloudinary-react";
import Button from "../styles/Button";
import { TextField } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { ContactContext } from "../../contexts/ContactContext";
import { MeContext } from "../../contexts/MeContext";
import FileUpload from "../assets/FileUpload";

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const NoteEditAsset = ({ asset, onChange }) => {
  const { cloudinaryInfo } = useContext(MeContext);

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
    <span>
      {asset.asset && (
        <Image
          publicId={asset.asset.publicId}
          cloudName={cloudinaryInfo.cloudName}
          dpr="auto"
          width={100}
          crop="scale"
          fetchFormat="auto"
          quality="auto"
        />
      )}
      <div>
        <TextField
          value={asset.description || ""}
          onChange={handleDescrChange}
          label="Description"
          style={{ width: "100%" }}
        />
      </div>
      <Actions>
        <Button onClick={handleDelete}>
          <Delete />
        </Button>
      </Actions>
    </span>
  );
};

NoteEditAsset.propTypes = {
  asset: PropTypes.object,
  onClose: PropTypes.func
};

export default NoteEditAsset;
