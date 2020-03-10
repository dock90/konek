import { useQuery } from "react-apollo";
import styled from "styled-components";
import { ME_QUERY } from "../queries/MeQueries";
// components
import Header from "./Header";
import Nav from "./Nav";
import Loading from "./Loading";
import { MeContext } from "../contexts/MeContext";
import {useAuthenticated} from "../hooks/useAuthenticated";

const Container = styled.div`
  display: grid;
  grid-template-columns: 240px auto;
  grid-template-rows: 64px auto;
  grid-template-areas:
    "header header"
    "nav main";
  height: 100vh;
`;

const Dashboard = ({ children }) => {
  const authenticated = useAuthenticated();

  // We run this query at the top level so that the cache is populated. Future queries will never
  // be in the loading state and can use the data directly.
  const { loading, error, data } = useQuery(ME_QUERY, {
    skip: !authenticated
  });

  if (loading) return <Loading />;
  if (error) return <p>Error: {error.message}</p>;

  if (authenticated) {
    return (
      <MeContext.Provider value={data.me}>
        <Container>
          <Header />
          <Nav />
          {children}
        </Container>
      </MeContext.Provider>
    );
  }
  return null;
};

export default Dashboard;
