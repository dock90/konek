import PropTypes from 'prop-types';
import styled from 'styled-components';
import TagItem from './TagItem';

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  font-size: ${(props) => props.size}em;
`;
const TagWidget = styled.div`
  margin: 2px 4px;
  // So they are all the same height.
  display: flex;
`;

const TagsList = ({ tags, size }) => {
  if (!tags) {
    return null;
  }
  if (!size) {
    size = 1;
  }
  return (
    <TagContainer size={size}>
      {tags.map((t) => (
        <TagWidget key={t.tagId}>
          <TagItem tag={t} />
        </TagWidget>
      ))}
    </TagContainer>
  );
};

TagsList.propTypes = {
  tags: PropTypes.array,
  size: PropTypes.number,
};

export default TagsList;
