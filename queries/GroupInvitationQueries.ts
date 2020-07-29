import { gql } from '@apollo/client';
import { ROLE_FIELDS } from './RoleQueries';

export const GROUP_INVITATION_FIELDS = gql`
  fragment GroupInvitation on GroupInvitation {
    __typename
    groupInvitationId
    code
    description
    active
    role {
      ...RoleFields
    }
  }
`;

export const CREATE_GROUP_INVITE_MUTATION = gql`
  mutation GroupInvitationCreateMutation(
    $code: String!
    $groupId: ID!
    $roleId: ID!
    $description: String
    $active: Boolean
  ) {
    createGroupInvitation(
      input: {
        code: $code
        groupId: $groupId
        roleId: $roleId
        description: $description
        active: $active
      }
    ) {
      ...GroupInvitation
    }
  }
  ${GROUP_INVITATION_FIELDS}
  ${ROLE_FIELDS}
`;

export const UPDATE_GROUP_INVITATION_MUTATION = gql`
  mutation GroupInvitationUpdateMutation(
    $id: ID!
    $roleId: ID
    $code: String
    $description: String
    $active: Boolean
  ) {
    updateGroupInvitation(
      input: {
        groupInvitationId: $id
        roleId: $roleId
        code: $code
        description: $description
        active: $active
      }
    ) {
      ...GroupInvitation
    }
  }
  ${GROUP_INVITATION_FIELDS}
  ${ROLE_FIELDS}
`;
