import gql from "graphql-tag";

export const SIGN_ARGS_MUTATION = gql`
  mutation SIGN_ARGS_MUTATION($args: ParamsToSign!) {
    signUpload(argToSign: $args)
  }
`;
