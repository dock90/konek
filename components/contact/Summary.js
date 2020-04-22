import { useContext } from "react";
import { ContactContext } from "../../contexts/ContactContext";
import ProfileInfo from "./summary/ProfileInfo";
import { Invitation } from "./summary/Invitation";

const Summary = () => {
  const { profile } = useContext(ContactContext);

  return <div>{profile ? <ProfileInfo /> : <Invitation />}</div>;
};

export default Summary;
