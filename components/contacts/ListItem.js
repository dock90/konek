import PropTypes from "prop-types";
import Link from "next/link";
import styled from "styled-components";
// components
import { H5, H6, AltText } from "../styles/Typography";
import { BorderButton } from "../material/StyledButton";
import AvatarPicture from "../assets/AvatarPicture";
import MessageAction from "../actions/MessageAction";
import TagsList from "../tags/TagsList";

// styles
const ListCard = styled.div`
  background: ${props => props.theme.white};
  box-shadow: 0px 1px 3px rgba(63, 63, 68, 0.15),
    0px 0px 0px rgba(63, 63, 68, 0.05);
  border-radius: 4px;
  height: 80px;
  margin-bottom: 1.6rem;
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

const ListItem = ({ contactData }) => {
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
          <BorderButton>View</BorderButton>
        </Link>
      </div>
    </ListCard>
  );
};

ListItem.propTypes = {
  contactData: PropTypes.shape({
    contactId: PropTypes.string.isRequired,
    country: PropTypes.string,
    name: PropTypes.string.isRequired
  }).isRequired
};

export default ListItem;
