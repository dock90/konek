import { useEffect, useState } from 'react';
import { auth } from '../config/firebase';
import { useRouter } from 'next/router';

export function useAuthenticated(requireAuth) {
  if (requireAuth === undefined) {
    requireAuth = true;
  }
  const [authenticated, setAuthenticated] = useState(false),
    router = useRouter();

  useEffect(() => {
    return auth.onAuthStateChanged(user => {
      if (user) {
        setAuthenticated(true);
      } else if (requireAuth) {
        let url = '/auth/login';

        if (router.asPath !== '/') {
          const target = encodeURIComponent(router.asPath);
          url = `${url}?target=${target}`;
        }

        router.push(url);
      }
    });
  });

  return authenticated;
}
