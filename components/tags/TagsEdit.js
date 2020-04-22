import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";
import { TAGS_QUERY } from "../../queries/TagQueries";
import Loading from "../Loading";
import TagItem from "./TagItem";
import { useState } from "react";
import EditTagDialog from "./EditTagDialog";
import { Checkbox, FormControlLabel, Popover } from "@material-ui/core";
import { People, Person, Edit, Search } from "@material-ui/icons";
import { BaseIconButton } from "../styles/IconButton";
import Link from "next/link";

const TagsListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const TagWidget = styled.div`
  margin: 2px 4px;
  cursor: pointer;
  transition: opacity linear 150ms;

  :hover {
    opacity: 60%;
  }
`;
const TagActions = styled.div`
  display: none;
`;
const TagWrapper = styled.div`
  // So they are all the same height.
  display: flex;
  margin: 4px;
  :hover {
    ${TagActions} {
      display: block;
    }
  }
`;
const TagDetails = styled.div`
  text-align: center;
`;
const Info = styled.div`
  margin-bottom: 1em;
`;

const TagsEdit = () => {
  const { loading, data, error } = useQuery(TAGS_QUERY);
  const [dialogOpen, toggleDialogOpen] = useState(false);
  const [editTag, setEditTag] = useState({});
  const [showHidden, toggleShowHidden] = useState(false);
  const [targetEl, setTargetEl] = useState(null);

  if (loading) return <Loading />;
  if (error) return <div>{error}</div>;

  const handleEditClick = e => {
    setTargetEl(null);
    toggleDialogOpen(true);
  };

  const handleTagSelect = tag => e => {
    setEditTag(tag);
    setTargetEl(e.currentTarget);
  };

  const handleTagLeave = e => {
    setTargetEl(null);
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
      <TagsListContainer>
        {tags.map(t => (
          <TagWrapper
            key={t.tagId}
            onClick={handleTagSelect(t)}
          >
            <TagWidget>
              <TagItem tag={t} />
            </TagWidget>
          </TagWrapper>
        ))}
      </TagsListContainer>
      <Popover
        open={!!targetEl}
        anchorEl={targetEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
        onClose={handleTagLeave}
      >
        <div>
          <Link
            href={{ pathname: "/contacts", query: { tagId: editTag.tagId } }}
            passHref={true}
          >
            <BaseIconButton>
              <Search />
            </BaseIconButton>
          </Link>
          <BaseIconButton onClick={handleEditClick}>
            <Edit />
          </BaseIconButton>
        </div>
        <TagDetails>
          {editTag.access === "SHARED" ? <People /> : <Person />}&nbsp;
          {editTag.access}
        </TagDetails>
      </Popover>
      <EditTagDialog
        tag={editTag}
        onClose={() => toggleDialogOpen(false)}
        open={dialogOpen}
      />
    </div>
  );
};

export default TagsEdit;
