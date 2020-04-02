import PropTypes from "prop-types";
import Link from "next/link";
import styled from "styled-components";
// components
import { Paper } from "@material-ui/core";
import { H5, H6, AltText } from "../styles/Typography";
import AvatarPicture from "../assets/AvatarPicture";
import TagsList from "../tags/TagsList";
import { BaseButton } from "../styles/Button";

// styles
const ListCard = styled(Paper)`
  background: ${props => props.theme.white};
  height: 80px;
  margin-bottom: 8px;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Overview = styled.div`
  display: flex;
  align-items: center;
`;

const Location = styled.div``;

const ContactListItem = ({ contactData }) => {
  const { contactId, name, country, picture } = contactData;
  return (
    <ListCard>
      <Overview>
        <AvatarPicture
          size={40}
          picture={picture}
          style={{
            marginRight: 10
          }}
        />
        <div>
          <H5>{name}</H5>
          <TagsList tags={contactData.tags} size={0.75} />
        </div>
      </Overview>
      {country && (
        <Location>
          <H6>{country}</H6>
          <AltText>Country</AltText>
        </Location>
      )}
      <div>
        <Link href={`/contacts/[id]`} as={`/contacts/${contactId}`}>
          <BaseButton>View</BaseButton>
        </Link>
      </div>
    </ListCard>
  );
};

ContactListItem.propTypes = {
  contactData: PropTypes.shape({
    contactId: PropTypes.string.isRequired,
    country: PropTypes.string,
    name: PropTypes.string.isRequired
  }).isRequired
};

export default ContactListItem;
