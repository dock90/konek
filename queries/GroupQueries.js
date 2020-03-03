import gql from "graphql-tag";
import { ROLE_FRAGMENT } from "./RoleQueries";

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
    __typename
  }
  ${ROLE_FRAGMENT}
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
  ) {
    updateGroup(
      input: {
        groupId: $groupId
        name: $name
        description: $description
        defaultRoleId: $defaultRoleId
        parentGroupId: $parentGroupId
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
  ) {
    createGroup(
      input: {
        name: $name
        description: $description
        defaultRoleId: $defaultRoleId
        parentGroupId: $parentGroupId
      }
    ) {
      ...GroupFields
    }
  }
  ${GROUP_FIELDS}
`;
