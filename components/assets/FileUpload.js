import PropTypes from "prop-types";
import { getWidget } from "../../config/cloudinary";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { ME_QUERY } from "../../queries/MeQueries";

const FileUpload = ({ open, onClose, onSuccess, maxFiles, folder, tags, resourceType }) => {
  const [widget, setWidget] = useState();
  const [loading, setLoading] = useState(false);
  const { data, loading: meLoading } = useQuery(ME_QUERY);

  useEffect(() => {
    if (open && widget) {
      widget.open();
    }
    return () => {
      onClose();
    };
  }, [open, widget]);

  if (!widget && !loading &&  !meLoading) {
    setLoading(true);

    getWidget(
      {
        folder,
        tags,
        maxFiles: maxFiles || 10,
        multiple: maxFiles && maxFiles > 1,
        cropping: true,
        apiKey: data.me.cloudinaryInfo.apiKey,
        cloudName: data.me.cloudinaryInfo.cloudName,
        resourceType: resourceType || 'auto',
      },
      function(error, result) {
        if (result) {
          switch (result.event) {
            case "display-changed":
              if (result.info === "hidden") {
                onClose();
              }
              break;
            case "success":
              if (onSuccess) {
                onSuccess(result.info);
              }
              break;
            default:
              // console.log(result);
              break;
          }
        }
      }
    ).then(w => setWidget(w));
  }

  return null;
};

FileUpload.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onSuccess: PropTypes.func,
  folder: PropTypes.string.isRequired,
  maxFiles: PropTypes.number,
  tags: PropTypes.array,
  resourceType: PropTypes.string,
};

export default FileUpload;
