import PropTypes from "prop-types";
import styled from "styled-components";

import { Edit, Delete } from "@material-ui/icons";
import { useMemo, useState } from "react";
import { EditMembership } from "./dialogs/EditMembership";
import RemoveMembership from "./dialogs/RemoveMembership";

const Hierarchy = styled.div`
  font-size: 0.8em;
  color: gray;
  font-style: italic;
`;

const ContactGroupEdit = ({ contactGroup, roles, groups, contactId }) => {
  const [isEditing, setIsEditing] = useState(false),
    [isDeleting, setIsDeleting] = useState(false);

  const role = useMemo(() => {
      return roles.find(r => r.roleId === contactGroup.role.roleId);
    }, [contactGroup]),
    group = useMemo(() => {
      return groups.find(g => g.groupId === contactGroup.group.groupId);
    }, [contactGroup]);

  const handleOpenEdit = () => {
    setIsEditing(true);
  };
  const handleCloseEdit = () => {
    setIsEditing(false);
  };
  const handleOpenDelete = () => {
    setIsDeleting(true);
  };
  const handleCloseDelete = () => {
    setIsDeleting(false);
  };

  return (
    <tr>
      <td>
        {group.name}
        {group.name.length !== group.hierarchy.length && (
          <Hierarchy>{group.hierarchy}</Hierarchy>
        )}
      </td>
      <td>{role.name}</td>
      {group.group.canManage && (
        <td>
          <Edit onClick={handleOpenEdit} />
          <Delete onClick={handleOpenDelete} />
          <EditMembership
            contactGroup={contactGroup}
            onClose={handleCloseEdit}
            group={group}
            open={isEditing}
            contactId={contactId}
            roles={roles}
          />
          <RemoveMembership
            group={group}
            onClose={handleCloseDelete}
            open={isDeleting}
            contactId={contactId}
          />
        </td>
      )}
    </tr>
  );
};

ContactGroupEdit.propTypes = {
  contactId: PropTypes.string.isRequired,
  contactGroup: PropTypes.object.isRequired,
  groups: PropTypes.array.isRequired,
  roles: PropTypes.array.isRequired
};

export default ContactGroupEdit;
