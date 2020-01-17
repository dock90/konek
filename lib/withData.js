import withApollo, { InMemoryCache } from 'next-with-apollo';
import ApolloClient from 'apollo-boost';
import { endpoint } from '../config';
import { auth } from '../firebase'

const getToken = () => {
  const token = auth.currentUser && auth.currentUser.getIdToken(true);
  return token
}

const createClient = ({ headers }) => {
  const token = getToken()
  console.log("IM THE TOKEN: ", token)
  return new ApolloClient({
    uri: process.env.NODE_ENV === 'development' ? endpoint : endpoint,
    request: operation => {
      operation.setContext({
        fetchOptions: {
          credentials: 'include',
        },
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : '',
          // "Dev-Profile-Id": "5e1cc0d41c9d4400005a548c"
        }
      });
    },
  });
}

export default withApollo(createClient);
