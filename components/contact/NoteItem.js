import { useState } from "react";
import PropTypes from "prop-types";
// material
import { Card, CardContent, CardHeader } from "@material-ui/core";
import { People, Person, Edit } from "@material-ui/icons";
import NoteEdit from "./NoteEdit";
// styled
import { BodyText } from "../styles/Typography";
import { Container } from "./EntryStyles";
import styled from "styled-components";
import AssetDisplay from "../assets/AssetDisplay";
import TagsList from "../tags/TagsList";
import { BaseIconButton } from "../styles/IconButton";

const CardTitle = styled(CardHeader)`
  && {
    padding: 10px;
  }
`;
const AccessIcon = styled.span`
  padding: 2px;
  // TODO: These colors are ugly.
  background-color: ${props => (props.isShared ? "lightpink" : "lightgray")};
  border: 1px solid ${props => (props.isShared ? "deeppink" : "grey")};
  border-radius: 4px;
  margin-right: 10px;
  // To vertically align the icon in the span.
  display: inline-flex;
  align-items: center;
`;
const CardBody = styled(CardContent)`
  && {
    padding: 10px;
    :last-child {
      padding-bottom: 10px;
    }
  }
`;
const NoteMessage = styled(BodyText)`
  white-space: pre-wrap;
`;
const AssetsWrapper = styled.div`
  margin-top: 1em;
  display: flex;
  flex-wrap: wrap;
  > div {
    margin-right: 15px;
  }
`;

const NoteItem = ({ note }) => {
  const { entryId, title, message, assets } = note;
  const [edit, setEdit] = useState(false);

  const handleEdit = () => {
    setEdit(true);
  };

  return (
    <>
      {edit ? (
        <NoteEdit note={note} setEdit={setEdit} />
      ) : (
        <Container key={entryId}>
          <Card>
            <CardTitle
              title={
                <span>
                  <AccessIcon isShared={note.access === "SHARED"}>
                    {note.access === "SHARED" ? <People /> : <Person />}
                  </AccessIcon>
                  {title}
                </span>
              }
              style={{ borderBottom: "1px solid #EEEEEE" }}
              action={
                <>
                  <BaseIconButton title="Edit Note" onClick={handleEdit}>
                    <Edit size="large" />
                  </BaseIconButton>
                </>
              }
            />
            <CardBody>
              {note.tags && (
                <div>
                  <TagsList tags={note.tags} />
                </div>
              )}
              <NoteMessage>{message}</NoteMessage>
              {assets && assets.length > 0 && (
                <AssetsWrapper>
                  {assets.map((a, k) => (
                    <AssetDisplay
                      key={k}
                      asset={a.asset}
                      description={a.description}
                      size={100}
                    />
                  ))}
                </AssetsWrapper>
              )}
            </CardBody>
          </Card>
        </Container>
      )}
    </>
  );
};

NoteItem.propTypes = {
  // TODO: add shape to prop type
  note: PropTypes.object.isRequired
};

export default NoteItem;
