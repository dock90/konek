import gql from "graphql-tag";

export const TAG_FIELDS = gql`
  fragment TagFields on Tag {
    __typename
    tagId
    name
    color
    hidden
  }
`;
