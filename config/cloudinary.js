import { client } from '../config/apollo';
import { SIGN_ARGS_MUTATION } from '../queries/AssetQueries';

let isLoaded = false;

async function initWidget(config) {
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
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://widget.cloudinary.com/v2.0/global/all.js';

      script.onload = () => {
        resolve();
      };

      document.body.appendChild(script);
    });
    await promise;

    isLoaded = true;
  }
}

/**
 * See https://cloudinary.com/documentation/upload_widget#upload_widget_options for available options.
 * @param config
 * @param callback
 * @return {Promise<{open: Function, close: Function}>}
 */
export async function getWidget(config, callback) {
  await initWidget(config);

  return cloudinary.createUploadWidget(
    {
      sources: ['local', 'url', 'camera'],
      cropping: false,
      ...config,
      cloudName: config.cloudName,
      secure: true,
      uploadSignature: async function(cb, paramsToSign) {
        const res = await client.mutate({
          mutation: SIGN_ARGS_MUTATION,
          variables: {
            args: paramsToSign,
          },
        });

        cb(res.data.signUpload);
      },
    },
    callback,
  );
}

export const RESOURCE_TYPE_AUDIO = 'video';

export async function uploadFile(config, file) {
  await initWidget(config);
  const timestamp = Math.round(Date.now() / 1000),
    params = {
      timestamp,
      folder: config.folder,
      tags: config.tags,
    };

  if (config.tags) {
    if (config.tags.length > 0) {
      params.tags = config.tags.join(',');
    }
  }

  const signed = await client.mutate({
    mutation: SIGN_ARGS_MUTATION,
    variables: { args: params },
  });

  const data = new FormData();
  data.append('timestamp', params.timestamp);
  data.append('api_key', config.apiKey);
  data.append('file', file);
  data.append('signature', signed.data.signUpload);
  data.append('folder', config.folder);
  if (params.tags) {
    data.append('tags', params.tags);
  }

  const url = `https://api.cloudinary.com/v1_1/${config.cloudName}/${config.resourceType}/upload`;

  const response = await fetch(url, {
      method: 'post',
      body: data,
    }),
    resData = await response.json();

  return {
    format: resData.format,
    publicId: resData.public_id,
    resourceType: resData.resource_type,
    type: resData.type,
    isAudio: !!resData.is_audio,
  };
}
