import PropTypes from "prop-types";
import styled from "styled-components";
import { useContext } from "react";
import { Image } from "cloudinary-react";
import Button from "../styles/Button";
import { TextField, Paper } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { MeContext } from "../../contexts/MeContext";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
const DisplayWrapper = styled.div`
  flex-grow: 1;
  text-align: center;
`;
const Filename = styled(Paper)`
  padding: 4px;
`;
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

  let display = null;
  if (asset.asset) {
    switch (asset.asset.resourceType) {
      case "image":
        display = (
          <Image
            publicId={asset.asset.publicId}
            cloudName={cloudinaryInfo.cloudName}
            dpr="auto"
            width={100}
            crop="scale"
            fetchFormat="auto"
            quality="auto"
          />
        );
        break;
      case "raw":
        display = (
          <Filename>{asset.asset.originalFilename}</Filename>
        );
    }
  }

  return (
    <Container>
      <DisplayWrapper>{display}</DisplayWrapper>
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
    </Container>
  );
};

NoteEditAsset.propTypes = {
  asset: PropTypes.object,
  onClose: PropTypes.func
};

export default NoteEditAsset;
