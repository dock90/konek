import PropTypes from "prop-types";
import Autocomplete, {
  createFilterOptions
} from "@material-ui/lab/Autocomplete";
import { TextField, Chip } from "@material-ui/core";
import { useQuery } from "@apollo/react-hooks";
import { TAGS_QUERY } from "../../queries/TagQueries";
import CreateTagDialog from "./CreateTagDialog";
import { useState } from "react";
import styled from "styled-components";

const filter = createFilterOptions();

const TagOptions = styled.span`
  padding: 2px;
  border-radius: 2px;
`;

const TagSelector = ({ value, onChange }) => {
  const { loading, data, error } = useQuery(TAGS_QUERY);
  const [dialogOpen, toggleDialog] = useState(false);
  const [dialogName, setDialogName] = useState("");

  let options = [];
  if (!loading) {
    if (error) {
      options.push({ name: error, color: "red" });
    } else {
      options = data.tags;
    }
  }

  const handleChange = (e, newValue) => {
    const addItem = newValue.find(v => !!v.inputValue);
    if (addItem) {
      toggleDialog(true);
      setDialogName(addItem.inputValue);
      return;
    }

    onChange(newValue);
  };

  const filterOptions = (options, params) => {
    const filtered = filter(options, params);

    if (params.inputValue !== "") {
      filtered.push({
        inputValue: params.inputValue,
        name: `Add "${params.inputValue}"`
      });
    }

    return filtered;
  };

  const dialogClose = (newTag) => {
    toggleDialog(false);
    setDialogName("");
    if (newTag) {
      onChange([
        ...value,
        newTag
      ]);
    }
  };

  return (
    <>
      <Autocomplete
        multiple={true}
        value={value || []}
        options={options}
        getOptionLabel={t => t.name}
        filterOptions={filterOptions}
        filterSelectedOptions={true}
        loading={loading}
        renderInput={params => (
          <TextField {...params} label="Tags" variant="outlined" />
        )}
        renderOption={t => (
          <TagOptions color={t.color}>
            {t.name}
          </TagOptions>
        )}
        onChange={handleChange}
        getOptionSelected={(a, b) => a.tagId === b.tagId}
      />
      <CreateTagDialog open={dialogOpen} name={dialogName} onClose={dialogClose} />
    </>
  );
};

TagSelector.propTypes = {
  value: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default TagSelector;
