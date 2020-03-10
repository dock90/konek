import { client } from "../config/apollo";
import { SIGN_ARGS_MUTATION } from "../queries/AssetQueries";
let isLoaded = false;

/**
 * See https://cloudinary.com/documentation/upload_widget#upload_widget_options for available options.
 * @param config
 * @param callback
 * @return {Promise<{open: Function, close: Function}>}
 */
export async function getWidget(config, callback) {
  if (!config.folder) {
    throw new Error("'folder' configuration parameter required");
  }
  if (!config.cloudName) {
    throw new Error("'cloudName' configuration parameter required");
  }
  if (!config.apiKey) {
    throw new Error("'apiKey' configuration parameter required");
  }
  if (!isLoaded) {
    const promise = new Promise(resolve => {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "https://widget.cloudinary.com/v2.0/global/all.js";

      script.onload = () => {
        resolve();
      };

      document.body.appendChild(script);
    });
    await promise;

    isLoaded = true;
  }

  // console.log("NEW CLOUDINARY UPLOADER", config);

  return cloudinary.createUploadWidget(
    {
      sources: ["local", "url", "camera"],
      cropping: false,
      ...config,
      cloudName: config.cloudName,
      secure: true,
      uploadSignature: async function (cb, paramsToSign) {
        const res = await client.mutate({
          mutation: SIGN_ARGS_MUTATION,
          variables: {
            args: paramsToSign
          },
        });

        cb(res.data.signUpload);
      }
    },
    callback
  );
}

export function destroy(widget) {}
