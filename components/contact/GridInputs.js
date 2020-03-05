import PropTypes from "prop-types";
import styled from "styled-components";
import { TextField, Button } from "@material-ui/core";
import { Add, Delete } from "@material-ui/icons";

const Table = styled.table`
  width: 100%;
`;
const InputField = styled(TextField)`
  width: 100%;
`;

const GridInputs = ({ value, onChange, columns }) => {
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
    <Table>
      <tbody>
        {value.map((val, rowKey) => (
          <tr key={rowKey}>
            {columns.map((col, colKey) => (
              <td key={colKey}>
                <InputField
                  label={`${col.label} ${rowKey + 1}`}
                  name={col.name}
                  value={val[col.name] || ""}
                  onChange={e => handleChange(e, rowKey)}
                />
              </td>
            ))}
            <td>
              <Button
                onClick={() => handleRemoveRow(rowKey)}
                style={{minWidth: 0}}
              ><Delete /></Button>
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
      <tr>
        <td colSpan={columns.length + 1}>
          <Button onClick={handleAddRow}>
            <Add /> Add Row
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
  columns: PropTypes.array.isRequired
};

export default GridInputs;
