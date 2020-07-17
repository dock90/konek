import gql from 'graphql-tag';

export const ASSET_FIELDS = gql`
  fragment AssetFields on Asset {
    __typename
    format
    publicId
    resourceType
    type
    isAudio
  }
`;

export const SIGN_ARGS_MUTATION = gql`
  mutation SIGN_ARGS_MUTATION($args: ParamsToSign!) {
    signUpload(argToSign: $args)
  }
`;
