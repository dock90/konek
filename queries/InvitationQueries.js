import gql from "graphql-tag";
import { ME_FIELDS } from "./MeQueries";

export const ACCEPT_INVITATION_MUTATION = gql`
  mutation ACCEPT_INVITATION_MUTATION ($code: String!) {
    acceptInvitation(code: $code) {
      ...MeFields
    }
  }
  ${ME_FIELDS}
`;
