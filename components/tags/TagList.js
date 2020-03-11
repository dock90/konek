import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";
import { TAGS_QUERY } from "../../queries/TagQueries";
import Loading from "../Loading";
import TagItem from "./TagItem";
import { useState } from "react";
import EditTagDialog from "./EditTagDialog";
import { Checkbox, FormControlLabel } from "@material-ui/core";

const TagWidget = styled.span`
  :hover {
    cursor: pointer;
  }
`;

const Info = styled.div`
  margin-bottom: 1em;
`;

const TagList = () => {
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
      {tags.map(t => (
        <TagWidget key={t.tagId} onClick={() => handleClick(t)}>
          <TagItem tag={t} />
        </TagWidget>
      ))}
      <EditTagDialog
        tag={editTag}
        onClose={() => toggleDialogOpen(false)}
        open={dialogOpen}
      />
    </div>
  );
};

export default TagList;
