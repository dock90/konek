import PropTypes from "prop-types";
import styled from "styled-components";
import { useContext } from "react";
import { Image } from "cloudinary-react";
import { DeleteButton } from "../styles/Button";
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
  padding: 5px;
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
    <Container>
      <DisplayWrapper>
        {asset.asset &&
          ((asset.asset.resourceType === "raw" && (
            <Filename>{asset.asset.originalFilename}</Filename>
          )) || (
            <Image
              publicId={asset.asset.publicId}
              cloudName={cloudinaryInfo.cloudName}
              resourceType={asset.asset.resourceType}
              dpr="auto"
              width={100}
              crop="limit"
              fetchFormat="auto"
              quality="auto"
            />
          ))}
      </DisplayWrapper>
      <div style={{ padding: 5 }}>
        <TextField
          value={asset.description || ""}
          onChange={handleDescrChange}
          label="Description"
          style={{ width: "100%" }}
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
