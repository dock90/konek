import { gql } from '@apollo/client';

export const ROLE_FIELDS = gql`
  fragment RoleFields on Role {
    __typename
    roleId
    name
  }
`;

export const ROLES_QUERY = gql`
  query RolesQuery {
    roles {
      ...RoleFields
    }
  }
  ${ROLE_FIELDS}
`;
