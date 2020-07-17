import { useQuery } from '@apollo/react-hooks';
import { ME_QUERY } from '../queries/MeQueries';
import Loading from '../components/Loading';
import Messages from './messages';
import Invitation from './invitation';
import { useAuthenticated } from '../hooks/useAuthenticated';

const Index = () => {
  const authenticated = useAuthenticated();

  const { loading, data } = useQuery(ME_QUERY, {
    // Only load the me query if we have a user.
    skip: !authenticated
  });

  if (loading || !data) {
    return <Loading />;
  }

  if (data.me.access.messages) {
    return <Messages />;
  }

  return <Invitation />;
};

export default Index;
