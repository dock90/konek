import { gql } from '@apollo/client';
import { ROLE_FIELDS } from './RoleQueries';
import { MEMBER_FIELDS } from './MemberQueries';
import { ASSET_FIELDS } from './AssetQueries';
import { GROUP_INVITATION_FIELDS } from './GroupInvitationQueries';

const GROUP_FIELDS = gql`
  fragment GroupFields on Group {
    __typename
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
    invitations {
      ...GroupInvitation
    }
  }
  ${ROLE_FIELDS}
  ${ASSET_FIELDS}
  ${GROUP_INVITATION_FIELDS}
`;

export const GROUP_MEMBERS_QUERY = gql`
  query GroupMembersQuery($groupId: ID!) {
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
  query GroupsQuery {
    groups {
      ...GroupFields
    }
  }
  ${GROUP_FIELDS}
`;

export const GROUP_QUERY = gql`
  query GroupQuery($groupId: ID!) {
    group(groupId: $groupId) {
      ...GroupFields
    }
  }
  ${GROUP_FIELDS}
`;

export const GROUP_UPDATE_MUTATION = gql`
  mutation GroupUpdateMutation(
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
  mutation GroupCreateMutation(
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
