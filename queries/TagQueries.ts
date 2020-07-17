import { gql } from '@apollo/client';

export const TAG_FIELDS = gql`
  fragment TagFields on Tag {
    __typename
    tagId
    name
    color
    hidden
    access
    isMine
  }
`;

export const TAGS_QUERY = gql`
  query TagsQuery {
    tags {
      ...TagFields
    }
  }
  ${TAG_FIELDS}
`;

export const CREATE_TAG_MUTATION = gql`
  mutation CreateTagMutation($name: String!, $color: String!) {
    createTag(input: { name: $name, hidden: false, color: $color }) {
      ...TagFields
    }
  }
  ${TAG_FIELDS}
`;

export const UPDATE_TAG_MUTATION = gql`
  mutation UpdateTagMutation(
    $tagId: ID!
    $name: String
    $color: String
    $hidden: Boolean
    $access: TagAccessType
  ) {
    updateTag(
      input: {
        tagId: $tagId
        name: $name
        color: $color
        hidden: $hidden
        access: $access
      }
    ) {
      ...TagFields
    }
  }
  ${TAG_FIELDS}
`;
