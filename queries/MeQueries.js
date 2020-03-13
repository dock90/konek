import gql from "graphql-tag";
import { ASSET_FIELDS } from "./AssetQueries";

export const ME_FIELDS = gql`
  fragment MeFields on Me {
    __typename
    name
    picture {
      ...AssetFields
    }
    assetFolderId
    emails {
      email
      label
    }
    phones {
      number
      label
    }
    city
    state
    postalCode
    country
    language
    pubNubInfo {
      subscribeKey
      authKey
      expires
      channelGroup
    }
    algoliaInfo {
      appId
      searchKey
    }
    cloudinaryInfo {
      cloudName
      apiKey
    }
    access {
      timeline
      contacts
      messages
      groups
      hasContact
    }
  }
  ${ASSET_FIELDS}
`;

// ME_QUERY
export const ME_QUERY = gql`
  query ME_QUERY {
    me {
      ...MeFields
    }
  }
  ${ME_FIELDS}
`;

// UPDATE_ME_MUTATION
export const UPDATE_ME_MUTATION = gql`
  mutation UPDATE_ME_MUTATION(
    $name: String
    $picture: AssetInput
    $emails: [EmailInput!]
    $phones: [PhoneInput!]
    $city: String
    $state: String
    $country: String
    $postalCode: String
    $language: String
  ) {
    updateMe(
      input: {
        name: $name
        picture: $picture
        emails: $emails
        phones: $phones
        city: $city
        state: $state
        country: $country
        postalCode: $postalCode
        language: $language
      }
    ) {
      ...MeFields
    }
  }
  ${ME_FIELDS}
`;
