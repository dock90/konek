import PropTypes from 'prop-types';
import styled from 'styled-components';
import { IconButton } from '@material-ui/core';
import { Add, Delete } from '@material-ui/icons';
import { BaseButton } from '../styles/Button';
import { StyledTextField } from '../material/StyledTextField';

const Table = styled.table`
  width: 100%;
  margin-bottom: 10px;
  td {
    width: ${(props) => Math.round(100 / props.cols)}%;
  }
`;

const GridInputs = ({ value, onChange, columns, rowOneDisabled, disabled }) => {
  const addRow = () => {
    const row = {};
    for (const col of columns) {
      row[col.name] = '';
    }
    value.push(row);
  };

  const handleChange = (rowKey) => (e) => {
    value[rowKey][e.target.name] = e.target.value;
    onChange(value);
  };
  const handleAddRow = () => {
    addRow();
    onChange(value);
  };
  const handleRemoveRow = (rowId) => () => {
    value.splice(rowId, 1);
    onChange(value);
  };

  if (!value) {
    value = [];
  }
  if (value.length === 0) {
    addRow();
  }

  return (
    <Table cols={columns.length}>
      <tbody>
        {value.map((val, rowKey) => (
          <tr key={rowKey}>
            {columns.map((col, colKey) => (
              <td key={colKey}>
                {rowOneDisabled && rowKey === 0 ? (
                  val[col.name]
                ) : (
                  <StyledTextField
                    label={`${col.label} ${rowKey + 1}`}
                    name={col.name}
                    value={val[col.name] || ''}
                    onChange={handleChange(rowKey)}
                    required={col.required}
                    disabled={disabled}
                  />
                )}
              </td>
            ))}
            <td>
              {(!rowOneDisabled || (rowOneDisabled && rowKey > 0)) && (
                <IconButton
                  onClick={handleRemoveRow(rowKey)}
                  style={{ minWidth: 0 }}
                  disabled={disabled}
                >
                  <Delete />
                </IconButton>
              )}
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={columns.length + 1}>
            <BaseButton onClick={handleAddRow} disabled={disabled} size="small">
              <Add /> Add {columns[0].label}
            </BaseButton>
          </td>
        </tr>
      </tfoot>
    </Table>
  );
};

GridInputs.propTypes = {
  value: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  columns: PropTypes.array.isRequired,
  rowOneDisabled: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default GridInputs;
