import gql from "graphql-tag";

export const ME_FIELDS = gql`
  fragment MeFields on Me {
    name
    picture
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
    searchKey
    access {
      timeline
      contacts
      messages
      groups
      hasContact
    }
  }
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
    $name: String!
    $picture: AssetId
    $emails: [EmailInput!]
    $phones: [PhoneInput!]
    $city: String
    $state: String
    $country: String
    $postalCode: String
    $language: String # $gender: String # $groups: ContactGroup
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
        # gender: $gender
        # groups: $groups
      }
    ) {
      ...MeFields
    }
  }
  ${ME_FIELDS}
`;
