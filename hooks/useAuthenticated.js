import { useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { useRouter } from "next/router";

export function useAuthenticated() {
  const [authenticated, setAuthenticated] = useState(false),
    router = useRouter();

  useEffect(() => {
    return auth.onAuthStateChanged(user => {
      if (user) {
        setAuthenticated(true);
      } else {
        router.push("/auth/login");
      }
    });
  });

  return authenticated;
}
