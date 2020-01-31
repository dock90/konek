import PropTypes from 'prop-types';
import Link from 'next/link';
import styled from 'styled-components';
// material
import Avatar from '@material-ui/core/Avatar';
// components
import { H5, H6, AltText } from '../styles/Typography';
import { BorderButton } from '../material/StyledButton';

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
  const { contactId, name, country } = contactData;
  return (
    <ListCard key={contactId}>
      <Overview>
        <Avatar
          alt="User Profile Image"
          src="https://raw.githubusercontent.com/EdwardGoomba/imgHost/master/crmBeta/profile.png"
          style={{
            height: 40,
            width: 40,
            marginRight: 10,
          }}
        />
        <H5>{name}</H5>
      </Overview>
      {country && (
        <Location>
          <H6>{country}</H6>
          <AltText>Country</AltText>
        </Location>
      )}
      <Link href={`/contacts/contact?id=${contactId}`}>
        <a>
          <BorderButton>View</BorderButton>
        </a>
      </Link>
    </ListCard>
  );
};

ListItem.propTypes = {
  contactData: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

export default ListItem;
