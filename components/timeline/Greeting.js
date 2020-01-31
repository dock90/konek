import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { H3, H5 } from '../styles/Typography';

const ME_QUERY = gql`
  query ME_QUERY {
    me {
      name
    }
  }
`;

const Greeting = () => (
  <Query query={ME_QUERY}>
    {({ data, error, loading }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error: {error.message}</p>;
      const {
        me: { name },
      } = data;
      return (
        <>
          <H3>Good morning, {name}.</H3>
          <H5>Heres what happened while you were away.</H5>
        </>
      );
    }}
  </Query>
);

export default Greeting;
