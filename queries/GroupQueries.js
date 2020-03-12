import gql from "graphql-tag";
import { ROLE_FIELDS } from "./RoleQueries";
import { MEMBER_FIELDS } from "./MemberQueries";
import { ASSET_FIELDS } from "./AssetQueries";

const GROUP_FIELDS = gql`
  fragment GroupFields on Group {
    groupId
    name
    description
    roomId
    canManage
    defaultRole {
      ...RoleFields
    }
    ancestors {
      groupId
    }
    picture {
      ...AssetFields
    }
    __typename
  }
  ${ROLE_FIELDS}
  ${ASSET_FIELDS}
`;

export const GROUP_MEMBERS_QUERY = gql`
  query GROUP_MEMBERS_QUERY($groupId: ID!) {
    group(groupId: $groupId) {
      ...GroupFields
      members {
        ...MemberFields
      }
    }
  }
  ${MEMBER_FIELDS}
  ${GROUP_FIELDS}
`;

export const GROUPS_QUERY = gql`
  query GROUPS_QUERY {
    groups {
      ...GroupFields
    }
  }
  ${GROUP_FIELDS}
`;

export const GROUP_QUERY = gql`
  query GROUP_QUERY($groupId: ID!) {
    group(groupId: $groupId) {
      ...GroupFields
    }
  }
  ${GROUP_FIELDS}
`;

export const GROUP_UPDATE_MUTATION = gql`
  mutation GROUP_UPDATE_MUTATION(
    $groupId: ID!
    $name: String
    $description: String
    $defaultRoleId: ID
    $parentGroupId: ID
    $picture: AssetInput
  ) {
    updateGroup(
      input: {
        groupId: $groupId
        name: $name
        description: $description
        defaultRoleId: $defaultRoleId
        parentGroupId: $parentGroupId
        picture: $picture
      }
    ) {
      ...GroupFields
    }
  }
  ${GROUP_FIELDS}
`;

export const GROUP_CREATE_MUTATION = gql`
  mutation GROUP_CREATE_MUTATION(
    $name: String!
    $description: String
    $defaultRoleId: ID!
    $parentGroupId: ID!
    $picture: AssetInput
  ) {
    createGroup(
      input: {
        name: $name
        description: $description
        defaultRoleId: $defaultRoleId
        parentGroupId: $parentGroupId
        picture: $picture
      }
    ) {
      ...GroupFields
    }
  }
  ${GROUP_FIELDS}
`;
