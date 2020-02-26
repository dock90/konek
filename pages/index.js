import { useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { useQuery } from "@apollo/react-hooks";
import { ME_QUERY } from "../queries/MeQueries";
import Loading from "../components/Loading";
import Messages from "./messages";
import Invitation from "./invitation";

const Index = () => {
  const [haveUser, setHaveUser] = useState(false);

  useEffect(() => {
    return auth.onAuthStateChanged(user => {
      setHaveUser(!!user);
    });
  });

  const { loading, data } = useQuery(ME_QUERY, {
    // Only load the me query if we have a user.
    skip: !haveUser
  });

  if (loading || !data) {
    return <Loading/>;
  }

  if (data.me.access.messages) {
    return <Messages/>
  }

  return <Invitation />
};

export default Index;
