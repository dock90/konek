import Dashboard from "../components/Dashboard";
import {
  ContentContainer,
  ContentHeader
} from "../components/styles/PageStyles";
import { H1 } from "../components/styles/Typography";
import TagsEdit from "../components/tags/TagsEdit";

const Tags = () => (
  <Dashboard>
    <ContentContainer>
      <ContentHeader>
        <H1>Tags</H1>
      </ContentHeader>
      <TagsEdit />
    </ContentContainer>
  </Dashboard>
);

export default Tags;
