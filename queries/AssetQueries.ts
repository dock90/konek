import { gql } from '@apollo/client';

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
  mutation SignArgsMutation($args: ParamsToSign!) {
    signUpload(argToSign: $args)
  }
`;
