import PropTypes from "prop-types";
import cloudinary from "cloudinary-core";
import { Avatar } from "@material-ui/core";
import { useContext } from "react";
import {MeContext} from "../../contexts/MeContext";

const AvatarPicture = ({ picture, size, style }) => {
  const meContext = useContext(MeContext);

  let url = "";
  if (picture) {
    const core = new cloudinary.Cloudinary({ cloud_name: meContext.cloudinaryInfo.cloudName });

    url = core.url(picture.publicId, {
      format: picture.format,
      quality: "auto",
      width: 100,
      height: 100,
      crop: "fit"
    });
  }
  return <Avatar style={{...(style || {}), height: size, width: size }} src={url} />;
};

AvatarPicture.propTypes = {
  size: PropTypes.number.isRequired,
  picture: PropTypes.shape({
    format: PropTypes.string,
    publicId: PropTypes.string,
    resourceType: PropTypes.string,
    type: PropTypes.string
  }),
  style: PropTypes.object,
};

export default AvatarPicture;
