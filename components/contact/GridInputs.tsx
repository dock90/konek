import React, { ChangeEvent } from 'react';
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
    width: ${(props: { cols: number }) => Math.round(100 / props.cols)}%;
  }
`;

interface ValueInterface extends Record<string, string | null | undefined> {
  label?: string | null;
}

interface Props {
  value: Array<ValueInterface>;
  onChange: (newVal: Array<ValueInterface>) => void;
  columns: Array<{ label: string; name: string; required?: boolean }>;
  rowOneDisabled?: boolean;
  disabled?: boolean;
}

const GridInputs: React.FC<Props> = ({
  value,
  onChange,
  columns,
  rowOneDisabled,
  disabled,
}) => {
  const createRow = (): Record<string, string> => {
    const row: Record<string, string> = {};
    for (const col of columns) {
      row[col.name] = '';
    }
    return row;
  };

  const handleChange = (rowKey: number) => (
    e: ChangeEvent<HTMLInputElement>,
  ): void => {
    value[rowKey][e.target.name] = e.target.value;
    onChange(value);
  };
  const handleAddRow = () => {
    const row = createRow();
    value.push(row);
    onChange(value);
  };
  const handleRemoveRow = (rowId: number) => () => {
    value.splice(rowId, 1);
    onChange(value);
  };

  if (!value) {
    value = [];
  }
  if (value.length === 0) {
    // addRow();
    const row: Record<string, string> = {};
    for (const col of columns) {
      row[col.name] = '';
    }
    value = [createRow()];
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
