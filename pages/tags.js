import Dashboard from "../components/Dashboard";
import {
  ContentContainer,
  ContentHeader
} from "../components/styles/PageStyles";
import { H1 } from "../components/styles/Typography";
import TagList from "../components/tags/TagList";

const Tags = () => (
  <Dashboard>
    <ContentContainer>
      <ContentHeader>
        <H1>Tags</H1>
      </ContentHeader>
      <TagList />
    </ContentContainer>
  </Dashboard>
);

export default Tags;
