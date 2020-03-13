import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";
import { TAGS_QUERY } from "../../queries/TagQueries";
import Loading from "../Loading";
import TagItem from "./TagItem";
import { useState } from "react";
import EditTagDialog from "./EditTagDialog";
import { Checkbox, FormControlLabel } from "@material-ui/core";

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const TagWidget = styled.div`
  margin: 2px 4px;
  cursor: pointer;
  transition: opacity linear 150ms;
  // So they are all the same height.
  display: flex;
  
  :hover {
    opacity: 65%;
  }
`;

const Info = styled.div`
  margin-bottom: 1em;
`;

const TagsEdit = () => {
  const { loading, data, error } = useQuery(TAGS_QUERY);
  const [dialogOpen, toggleDialogOpen] = useState(false);
  const [editTag, setEditTag] = useState({});
  const [showHidden, toggleShowHidden] = useState(false);

  if (loading) return <Loading />;
  if (error) return <div>{error}</div>;

  const handleClick = tag => {
    setEditTag(tag);
    toggleDialogOpen(true);
  };

  let tags = data.tags;
  if (!showHidden) {
    tags = tags.filter(t => !t.hidden);
  }

  return (
    <div>
      <Info>
        Click a tag to edit it.
        <div>
          <FormControlLabel
            control={
              <Checkbox
                checked={showHidden}
                onChange={e => toggleShowHidden(e.target.checked)}
              />
            }
            label="Show Hidden"
          />
        </div>
      </Info>
      <TagContainer>
        {tags.map(t => (
          <TagWidget key={t.tagId} onClick={() => handleClick(t)}>
            <TagItem tag={t} />
          </TagWidget>
        ))}
      </TagContainer>
      <EditTagDialog
        tag={editTag}
        onClose={() => toggleDialogOpen(false)}
        open={dialogOpen}
      />
    </div>
  );
};

export default TagsEdit;
