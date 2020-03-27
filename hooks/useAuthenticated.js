import { useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { useRouter } from "next/router";

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
        let target = encodeURIComponent(router.asPath);
        router.push(`/auth/login?target=${target}`);
      }
    });
  });

  return authenticated;
}
