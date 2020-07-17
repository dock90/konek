import PropTypes from 'prop-types';
import { IconButton, TextField, MenuItem } from '@material-ui/core';
import { Add, Delete } from '@material-ui/icons';
import { BaseButton } from '../styles/Button';

const ContactNewGroups = ({ onChange, value, groups, roles, disabled }) => {
  value = value || [{ groupId: '', roleId: '' }];

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
    value.push({ groupId: '', roleId: '' });
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
                style={{ width: '100%' }}
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
                style={{ width: '100%' }}
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
              <IconButton
                onClick={() => removeGroup(k)}
                style={{ minWidth: 0 }}
                disabled={disabled}
              >
                <Delete />
              </IconButton>
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td>&nbsp;</td>
          <td colSpan={2}>
            <BaseButton onClick={addGroup} disabled={disabled}>
              <Add /> Add Group
            </BaseButton>
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
