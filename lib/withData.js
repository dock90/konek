import withApollo from 'next-with-apollo';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { endpoint } from '../config';
import { auth } from '../firebase';

const token = auth.currentUser ? localStorage.getItem('token') : 'no-banana';

const createClient = ({ ctx, headers, initialState }) => {
  console.log('IM THE TOKEN: ', token);
  return new ApolloClient({
    uri: process.env.NODE_ENV === 'development' ? endpoint : endpoint,
    cache: new InMemoryCache().restore(initialState || {}),
    request: operation => {
      operation.setContext({
        fetchOptions: {
          credentials: 'include',
        },
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : '',
          // 'Dev-Profile-Id': '5e1cc0d41c9d4400005a548c',
        },
      });
    },
  });
};

export default withApollo(createClient);
