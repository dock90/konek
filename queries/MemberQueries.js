import gql from "graphql-tag";
import { ROLE_FRAGMENT } from "./RoleQueries";

export const MEMBER_FIELDS = gql`
  fragment MemberFields on Member {
    name
    memberId
    picture {
      format
      publicId
      resourceType
      type
    }
    role {
      ...RoleFields
    }
    profile {
      roomId
    }
    contact {
      contactId
      name
    }
  }
  ${ROLE_FRAGMENT}
`;

export const MEMBER_QUERY = gql`
  query MEMBER_QUERY($memberId: ID!, $roomId: ID!) {
    member(input: { memberId: $memberId, roomId: $roomId }) {
      ...MemberFields
    }
  }
  ${MEMBER_FIELDS}
`;
