import PropTypes from "prop-types";
import styled from "styled-components";
import { Image, Video } from "cloudinary-react";
import cloudinary from "cloudinary-core";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Paper
} from "@material-ui/core";
import { Close, CloudDownload, Videocam } from "@material-ui/icons";
import { useContext, useState } from "react";
import { MeContext } from "../../contexts/MeContext";

const Container = styled(Paper)`
  // So the image respects the rounded borders of the Paper.
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;
const ThumbItem = styled.div`
  text-align: center;
  // So it pushes the description to the bottom.
  flex-grow: 1;
`;
const ThumbWrapper = styled.div`
  position: relative;
`;
const ImageThumb = styled(Image)`
  cursor: pointer;
  display: block;
`;
const Filename = styled.span`
  padding: 4px;
`;
const PlayIcon = styled.div`
  font-size: 24px;
  position: absolute;
  bottom: 0;
  right: 0;
  color: white;
  margin-right: 4px;
  margin-bottom: -3px;
`;
const Description = styled.div`
  width: ${props => props.size}px;
  padding: 5px;
`;
const ImageView = styled(Image)`
  max-width: 100%;
  max-height: 100%;
`;
const VideoView = styled(Video)`
  max-width: 100%;
  max-height: 100%;
`;
const Content = styled(DialogContent)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const AssetDisplay = ({ asset, description, size, descriptionDialogOnly }) => {
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
    case "video":
    case "image":
      thumb = (
        <ThumbItem>
          <ThumbWrapper>
            <ImageThumb
              publicId={asset.publicId}
              cloudName={cloudinaryInfo.cloudName}
              resourceType={asset.resourceType}
              dpr="auto"
              width={size}
              crop="limit"
              fetchFormat="auto"
              quality="auto"
              onClick={() => toggleIsOpen(true)}
            />
            {asset.resourceType === "video" && (
              <PlayIcon>
                <Videocam fontSize="inherit" />
              </PlayIcon>
            )}
          </ThumbWrapper>
        </ThumbItem>
      );
      break;
    case "raw":
      const core = new cloudinary.Cloudinary({
          cloud_name: cloudinaryInfo.cloudName,
          resource_type: asset.resourceType
        }),
        url = core.url(asset.publicId, {});
      thumb = (
        <ThumbItem>
          <Filename>{asset.originalFilename}</Filename>
          <Button href={url} target="blank">
            <CloudDownload />
          </Button>
        </ThumbItem>
      );
      break;
  }

  return (
    <Container style={{ width: size }}>
      {thumb}
      {description && !descriptionDialogOnly && (
        <Description>{description}</Description>
      )}
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
        <Content>
          {(asset.resourceType === "image" && (
            <ImageView
              publicId={asset.publicId}
              cloudName={cloudinaryInfo.cloudName}
              dpr="auto"
              width="auto"
              crop="limit"
              responsive
              responsiveUseBreakpoints
              fetchFormat="auto"
              quality="auto"
            />
          )) || (
            <VideoView
              publicId={asset.publicId}
              cloudName={cloudinaryInfo.cloudName}
              controls
            />
          )}
          {description && <Description>{description}</Description>}
        </Content>
      </Dialog>
    </Container>
  );
};

AssetDisplay.propTypes = {
  size: PropTypes.number,
  asset: PropTypes.shape({
    publicId: PropTypes.string.isRequired
  }),
  description: PropTypes.string,
  descriptionDialogOnly: PropTypes.bool
};

AssetDisplay.defaults = {
  descriptionDialogOnly: false
};

export default AssetDisplay;
