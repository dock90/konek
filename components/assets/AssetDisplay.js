import PropTypes from "prop-types";
import styled from "styled-components";
import { Image, Video } from "cloudinary-react";
import cloudinary from "cloudinary-core";
import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  Paper
} from "@material-ui/core";
import {
  Close,
  CloudDownload,
  Videocam,
  PlayArrow,
  Pause
} from "@material-ui/icons";
import { useContext, useState } from "react";
import { MeContext } from "../../contexts/MeContext";
import { BaseIconButton } from "../styles/IconButton";

const Container = styled(Paper)`
  // So the image respects the rounded borders of the Paper.
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;
const ContainerNoPaper = styled.div`
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

const STATE_NONE = 0,
  STATE_LOADING = 1,
  STATE_PLAYING = 2;

const AssetDisplay = ({
  asset,
  description,
  size,
  descriptionDialogOnly,
  noPaper
}) => {
  if (!size) {
    size = 100;
  }
  const { cloudinaryInfo } = useContext(MeContext);
  const [isOpen, toggleIsOpen] = useState(false),
    [playing, setPlaying] = useState(STATE_NONE),
    [audio, setAudio] = useState(null);

  function handleClose() {
    toggleIsOpen(false);
  }

  function handlePlay() {
    if (playing === STATE_PLAYING && audio) {
      audio.pause();
      setPlaying(STATE_NONE);
      return;
    }

    if (playing === STATE_LOADING) {
      return;
    }

    setPlaying(STATE_LOADING);
    if (audio) {
      audio.play();
    } else {
      const core = new cloudinary.Cloudinary({
        cloud_name: cloudinaryInfo.cloudName,
        resource_type: asset.resourceType
      });

      const url = core.url(asset.publicId, {});

      const a = new Audio(url);
      a.preload = "auto";

      a.addEventListener("ended", () => {
        setPlaying(STATE_NONE);
      });
      a.addEventListener("canplaythrough", () => {
        a.play();
      });
      a.addEventListener("play", () => {
        setPlaying(STATE_PLAYING);
      });

      setAudio(a);
    }
  }

  let thumb = null;
  switch (asset.resourceType) {
    case "video":
      if (asset.isAudio) {
        let icon;
        if (playing === STATE_LOADING) {
          icon = <CircularProgress size="small" />;
        } else if (playing === STATE_PLAYING) {
          icon = <Pause />;
        } else {
          icon = <PlayArrow />;
        }
        thumb = (
          <ThumbItem>
            <BaseIconButton onClick={handlePlay}>{icon}</BaseIconButton>
          </ThumbItem>
        );
        break;
      }
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
          <BaseIconButton href={url} target="blank">
            <CloudDownload />
          </BaseIconButton>
        </ThumbItem>
      );
      break;
  }
  let Ctnr = Container;
  if (noPaper) {
    Ctnr = ContainerNoPaper;
  }

  return (
    <Ctnr style={{ width: size }}>
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
          <BaseIconButton onClick={handleClose}>
            <Close />
          </BaseIconButton>
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
    </Ctnr>
  );
};

AssetDisplay.propTypes = {
  size: PropTypes.number,
  asset: PropTypes.shape({
    publicId: PropTypes.string.isRequired
  }),
  description: PropTypes.string,
  descriptionDialogOnly: PropTypes.bool,
  noPaper: PropTypes.bool
};

AssetDisplay.defaults = {
  descriptionDialogOnly: false,
  noPaper: false
};

export default AssetDisplay;
