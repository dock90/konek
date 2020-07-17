import { gql } from '@apollo/client';
import { TAG_FIELDS } from './TagQueries';
import { ASSET_FIELDS } from './AssetQueries';
import { PROFILE_FIELDS } from './ProfileQueries';
import { ENTRY_FIELDS } from './EntryQueries';

const CONTACT_SUMMARY_FIELDS = gql`
  fragment ContactSummaryFields on Contact {
    __typename
    contactId
    name
    country
    picture {
      ...AssetFields
    }
    tags {
      ...TagFields
    }
  }
  ${ASSET_FIELDS}
  ${TAG_FIELDS}
`;

const CONTACT_FIELDS = gql`
  fragment ContactFields on Contact {
    __typename
    contactId
    name
    legalName
    picture {
      ...AssetFields
    }
    assetFolderId
    bio
    city
    state
    postalCode
    country
    gender
    language
    invitationCode
    tags {
      ...TagFields
    }
    bio
    fbProfile
    profile {
      ...ProfileFields
      contacts {
        ...ContactSummaryFields
      }
    }
    emails {
      email
      label
    }
    phones {
      number
      label
    }
    groups {
      group {
        __typename
        groupId
        name
      }
      role {
        roleId
      }
    }
    pinnedEntries {
      ...EntryFields
    }
  }
  ${TAG_FIELDS}
  ${ASSET_FIELDS}
  ${PROFILE_FIELDS}
  ${CONTACT_SUMMARY_FIELDS}
  ${ENTRY_FIELDS}
`;

export const ALL_CONTACTS_QUERY = gql`
  query AllContactsQuery($tags: [ID!]) {
    contacts(tags: $tags) {
      data {
        ...ContactSummaryFields
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${CONTACT_SUMMARY_FIELDS}
`;

export const CONTACT_QUERY = gql`
  query ContactQuery($contactId: ID!) {
    contact(contactId: $contactId) {
      ...ContactFields
    }
  }
  ${CONTACT_FIELDS}
`;

export const UPDATE_CONTACT_MUTATION = gql`
  mutation UpdateContactMutation(
    $contactId: ID!
    $name: String
    $legalName: String
    $bio: String
    $city: String
    $state: String
    $postalCode: String
    $country: String
    $language: String
    $fbProfile: String
    $phones: [PhoneInput!]
    $emails: [EmailInput!]
    $picture: AssetInput
    $gender: Gender
    $tags: [ID!]
  ) {
    updateContact(
      input: {
        contactId: $contactId
        name: $name
        legalName: $legalName
        bio: $bio
        city: $city
        state: $state
        postalCode: $postalCode
        country: $country
        language: $language
        fbProfile: $fbProfile
        phones: $phones
        emails: $emails
        picture: $picture
        gender: $gender
        tags: $tags
      }
    ) {
      ...ContactFields
    }
  }
  ${CONTACT_FIELDS}
`;

export const CREATE_CONTACT_MUTATION = gql`
  mutation CreateContactMutation(
    $name: String!
    $legalName: String
    $bio: String
    $city: String
    $state: String
    $postalCode: String
    $country: String
    $language: String
    $fbProfile: String
    $groups: [ContactGroupInput!]!
    $phones: [PhoneInput!]
    $emails: [EmailInput!]
  ) {
    createContact(
      input: {
        name: $name
        legalName: $legalName
        bio: $bio
        city: $city
        state: $state
        postalCode: $postalCode
        country: $country
        language: $language
        fbProfile: $fbProfile
        groups: $groups
        phones: $phones
        emails: $emails
      }
    ) {
      ...ContactFields
    }
  }
  ${CONTACT_FIELDS}
`;

export const UPDATE_CONTACT_GROUP = gql`
  mutation UpdateContactGroup($contactId: ID!, $groupId: ID!, $roleId: ID!) {
    updateContactGroup(
      input: { contactId: $contactId, groupId: $groupId, roleId: $roleId }
    ) {
      ...ContactFields
    }
  }
  ${CONTACT_FIELDS}
`;

export const REMOVE_CONTACT_GROUP = gql`
  mutation RemoveContactGroup($contactId: ID!, $groupId: ID!) {
    removeContactGroup(input: { contactId: $contactId, groupId: $groupId }) {
      ...ContactFields
    }
  }
  ${CONTACT_FIELDS}
`;

export const ADD_CONTACT_GROUP = gql`
  mutation AddContactGroup($contactId: ID!, $groupId: ID!, $roleId: ID!) {
    addContactGroup(
      input: { contactId: $contactId, groupId: $groupId, roleId: $roleId }
    ) {
      ...ContactFields
    }
  }
  ${CONTACT_FIELDS}
`;

export const GENERATE_INVITATION_CODE = gql`
  mutation GenerateInvitationCode($contactId: ID!) {
    generateInvitationCode(input: { contactId: $contactId })
  }
`;
