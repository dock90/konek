import PropTypes from "prop-types";
import styled from "styled-components";
import { Image } from "cloudinary-react";
import cloudinary from "cloudinary-core";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Paper
} from "@material-ui/core";
import { Close, CloudDownload } from "@material-ui/icons";
import { useContext, useState } from "react";
import { MeContext } from "../../contexts/MeContext";

const Container = styled(Paper)`
  // So the image respects the rounded borders of the Paper.
  overflow: hidden;
`;
const ThumbWrapper = styled.div`
  text-align: center;
`;
const ImageThumb = styled(Image)`
  cursor: pointer;
  display: block;
`;
const Filename = styled.span`
  padding: 4px;
`;
const Description = styled.div`
  width: ${props => props.size}px;
  padding: 5px;
`;
const ImageView = styled(Image)`
  max-width: 100%;
  max-height: 100%;
`;

const AssetDisplay = ({ asset, description, size }) => {
  if (!size) {
    size = 100;
  }
  const { cloudinaryInfo } = useContext(MeContext);
  const [isOpen, toggleIsOpen] = useState(false);

  const handleClose = () => {
    toggleIsOpen(false);
  };

  let thumb = null;
  switch (asset.resourceType) {
    case "image":
      thumb = (
        <ImageThumb
          publicId={asset.publicId}
          cloudName={cloudinaryInfo.cloudName}
          dpr="auto"
          width={size}
          crop="scale"
          fetchFormat="auto"
          quality="auto"
          onClick={() => toggleIsOpen(true)}
        />
      );
      break;
    case "raw":
      const core = new cloudinary.Cloudinary({
          cloud_name: cloudinaryInfo.cloudName,
          resource_type: asset.resourceType
        }),
        url = core.url(asset.publicId, {});
      thumb = (
        <>
          <Filename>{asset.originalFilename}</Filename>
          <Button href={url} target="blank">
            <CloudDownload />
          </Button>
        </>
      );
      break;
  }

  return (
    <Container style={{ width: size }}>
      <ThumbWrapper>{thumb}</ThumbWrapper>
      {description && <Description>{description}</Description>}
      <Dialog
        open={isOpen}
        onClose={handleClose}
        onBackdropClick={handleClose}
        fullWidth={true}
        maxWidth={false}
      >
        <DialogActions>
          <Button onClick={handleClose}>
            <Close />
          </Button>
        </DialogActions>
        <DialogContent>
          <ImageView
            publicId={asset.publicId}
            cloudName={cloudinaryInfo.cloudName}
            dpr="auto"
            width="auto"
            crop="scale"
            responsive
            responsiveUseBreakpoints={true}
            fetchFormat="auto"
            quality="auto"
          />
          {description && <Description>{description}</Description>}
        </DialogContent>
      </Dialog>
    </Container>
  );
};

AssetDisplay.propTypes = {
  size: PropTypes.number,
  asset: PropTypes.shape({
    publicId: PropTypes.string.isRequired
  }),
  description: PropTypes.string
};

export default AssetDisplay;
