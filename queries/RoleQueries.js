import gql from "graphql-tag";

export const ROLE_FIELDS = gql`
  fragment RoleFields on Role {
    name
    roleId
    __typename
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
