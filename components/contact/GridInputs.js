import PropTypes from "prop-types";
import styled from "styled-components";
import { TextField, Button } from "@material-ui/core";
import { Add, Delete } from "@material-ui/icons";

const Table = styled.table`
  width: 100%;
  td {
    width: ${props => Math.round(100 / props.cols)}%;
  }
`;
const InputField = styled(TextField)`
  width: 100%;
`;

const GridInputs = ({ value, onChange, columns, rowOneDisabled, disabled }) => {
  const addRow = () => {
    const row = {};
    for (const col of columns) {
      row[col.name] = "";
    }
    value.push(row);
  };

  const handleChange = (e, rowKey) => {
    value[rowKey][e.target.name] = e.target.value;
    onChange(value);
  };
  const handleAddRow = () => {
    addRow();
    onChange(value);
  };
  const handleRemoveRow = rowId => {
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
                  <InputField
                    label={`${col.label} ${rowKey + 1}`}
                    name={col.name}
                    value={val[col.name] || ""}
                    onChange={e => handleChange(e, rowKey)}
                    required={col.required}
                    disabled={disabled}
                  />
                )}
              </td>
            ))}
            <td>
              {(!rowOneDisabled || (rowOneDisabled && rowKey > 0)) && (
                <Button
                  onClick={() => handleRemoveRow(rowKey)}
                  style={{ minWidth: 0 }}
                  disabled={disabled}
                >
                  <Delete />
                </Button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={columns.length + 1}>
            <Button onClick={handleAddRow} disabled={disabled}>
              <Add /> Add {columns[0].label}
            </Button>
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
  rowOneDisabled: PropTypes.string,
  disabled: PropTypes.bool
};

export default GridInputs;
