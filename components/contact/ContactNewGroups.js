import PropTypes from "prop-types";
import { Button, TextField, MenuItem } from "@material-ui/core";
import { Add, Delete } from "@material-ui/icons";

const ContactNewGroups = ({ onChange, value, groups, roles, disabled }) => {
  value = value || [{ groupId: "", roleId: "" }];

  const handleUpdate = (e, key) => {
    value[key][e.target.name] = e.target.value;
    onChange(value);
  };

  const removeGroup = key => {
    value.splice(key, 1);
    if (value.length === 0) {
      addGroup();
      return;
    }
    onChange(value);
  };

  const addGroup = () => {
    value.push({ groupId: "", roleId: "" });
    onChange(value);
  };

  return (
    <>
      <tbody>
        {value.map((cg, k) => (
          <tr key={k}>
            <td>
              <TextField
                select
                name="groupId"
                value={cg.groupId}
                onChange={e => handleUpdate(e, k)}
                style={{ width: "100%" }}
                disabled={disabled}
              >
                {groups.map(g => (
                  <MenuItem key={g.groupId} value={g.groupId}>
                    {g.hierarchy}
                  </MenuItem>
                ))}
              </TextField>
            </td>
            <td>
              <TextField
                select
                name="roleId"
                value={cg.roleId}
                onChange={e => handleUpdate(e, k)}
                style={{ width: "100%" }}
                disabled={disabled}
              >
                {roles.map(r => (
                  <MenuItem key={r.roleId} value={r.roleId}>
                    {r.name}
                  </MenuItem>
                ))}
              </TextField>
            </td>
            <td>
              <Button onClick={() => removeGroup(k)} style={{minWidth: 0}} disabled={disabled}>
                <Delete />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td>&nbsp;</td>
          <td colSpan={2}>
            <Button onClick={addGroup} disabled={disabled}>
              <Add /> Add Group
            </Button>
          </td>
        </tr>
      </tfoot>
    </>
  );
};

ContactNewGroups.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.array,
  groups: PropTypes.array.isRequired,
  roles: PropTypes.array.isRequired,
  disabled: PropTypes.bool
};

export default ContactNewGroups;
