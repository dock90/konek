import gql from "graphql-tag";

export const ASSET_FIELDS = gql`
  fragment AssetFields on Asset {
    format
    publicId
    resourceType
    type
  }
`;

export const SIGN_ARGS_MUTATION = gql`
  mutation SIGN_ARGS_MUTATION($args: ParamsToSign!) {
    signUpload(argToSign: $args)
  }
`;
