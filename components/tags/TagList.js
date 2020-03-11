import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";
import { TAGS_QUERY } from "../../queries/TagQueries";
import Loading from "../Loading";
import TagItem from "./TagItem";
import { useState } from "react";
import EditTagDialog from "./EditTagDialog";

const TagWidget = styled.span`
  opacity: ${props => props.isHidden ? .75 : 1};
  background-color: ${props => props.isHidden ? 'white' : 'transparent'};
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

  if (loading) return <Loading />;
  if (error) return <div>{error}</div>;

  const handleClick = tag => {
    setEditTag(tag);
    toggleDialogOpen(true);
  };

  return (
    <div>
      <Info>Click a tag to edit it.</Info>
      {data.tags.map(t => (
        <TagWidget isHidden={t.hidden} key={t.tagId} onClick={() => handleClick(t)}>
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
