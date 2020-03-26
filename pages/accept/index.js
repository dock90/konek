import { useRouter } from "next/router";
import { useAuthenticated } from "../../hooks/useAuthenticated";
import { useEffect } from "react";
import { useAcceptInvitation } from "../../hooks/useAcceptInvitation";

const Index = () => {
  const router = useRouter();
  // If we aren't authenticated, we'll get forwarded to login. After login we'll get forwarded back here.
  const authenticated = useAuthenticated();
  const [acceptInvitation] = useAcceptInvitation();

  useEffect(() => {
    if (!authenticated || !router.query.code) {
      return;
    }

    acceptInvitation({
      variables: { code: router.query.code }
    }).then(() => {
      router.replace("/");
    });
  }, [authenticated]);

  return null;
};

export default Index;
