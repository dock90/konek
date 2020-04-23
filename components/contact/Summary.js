import { useContext } from "react";
import { ContactContext } from "../../contexts/ContactContext";
import ProfileInfo from "./summary/ProfileInfo";
import { Invitation } from "./summary/Invitation";
import EntryList from "./EntryList";

const Summary = () => {
  const { profile, pinnedEntries } = useContext(ContactContext);

  return (
    <div>
      {pinnedEntries.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <EntryList entries={{ data: pinnedEntries }} />
        </div>
      )}
      {profile ? <ProfileInfo /> : <Invitation />}
    </div>
  );
};

export default Summary;
