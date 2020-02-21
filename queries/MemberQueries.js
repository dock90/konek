import gql from "graphql-tag";

export const MEMBER_FIELDS = gql`
  fragment MemberFields on Member {
    name
    memberId
  }
`;

export const MEMBER_QUERY = gql`
  query MEMBER_QUERY($memberId: ID!, $roomId: ID!) {
    member(input: {memberId: $memberId, roomId: $roomId}) {
      ...MemberFields
    }
  }
  ${MEMBER_FIELDS}
`;
