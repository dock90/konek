import gql from "graphql-tag";

export const ROLE_FIELDS = gql`
  fragment RoleFields on Role {
    __typename
    roleId
    name
  }
`;

export const ROLES_QUERY = gql`
  query ROLES_QUERY {
    roles {
      ...RoleFields
    }
  }
  ${ROLE_FIELDS}
`;
