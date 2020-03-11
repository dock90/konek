import styled from "styled-components";
import TagItem from "./TagItem";

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const TagWidget = styled.div`
  margin: 2px 4px;
  // So they are all the same height.
  display: flex;
`;

const TagsList = ({ tags }) => {
  if (!tags) {
    return null;
  }
  return (
    <TagContainer>
      {tags.map(t => (
        <TagWidget key={t.tagId}>
          <TagItem tag={t} />
        </TagWidget>
      ))}
    </TagContainer>
  );
};

export default TagsList;
