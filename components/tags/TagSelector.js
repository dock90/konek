import PropTypes from 'prop-types';
import Autocomplete, {
  createFilterOptions,
} from '@material-ui/lab/Autocomplete';
import { Cancel } from '@material-ui/icons';
import { useQuery } from '@apollo/react-hooks';
import { TAGS_QUERY } from '../../queries/TagQueries';
import { useState } from 'react';
import styled from 'styled-components';
import TagItem from './TagItem';
import { StyledTextField } from '../material/StyledTextField';
import EditTagDialog, { NewTag } from './EditTagDialog';

const filter = createFilterOptions();

const TagItemWrapper = styled.span`
  padding-right: 4px;
  display: block;
  height: 15px;
`;

const RemoveTag = styled.span`
  cursor: pointer;
  margin-left: 3px;
`;

const TagSelector = ({ value, onChange, variant }) => {
  if (!variant) {
    variant = 'outlined';
  }
  const { loading, data, error } = useQuery(TAGS_QUERY);
  const [dialogOpen, toggleDialog] = useState(false);
  const [newTag, setNewTag] = useState('');

  let options = [];
  if (!loading) {
    if (error) {
      options.push({ name: error, color: 'red' });
    } else {
      options = data.tags;
    }
  }

  const handleChange = (e, newValue) => {
    const addItem = newValue.find((v) => !!v.inputValue);
    if (addItem) {
      toggleDialog(true);
      setNewTag({
        ...NewTag(),
        name: addItem.inputValue,
      });
      return;
    }

    onChange(newValue);
  };

  const filterOptions = (options, params) => {
    const filtered = filter(options, params).filter((t) => !t.hidden);

    if (params.inputValue !== '') {
      filtered.push({
        inputValue: params.inputValue,
        name: `Add "${params.inputValue}"`,
        color: 'ffffff',
      });
    }

    return filtered;
  };

  const dialogClose = (newTag) => {
    toggleDialog(false);
    if (newTag) {
      onChange([...value, newTag]);
    }
  };

  const removeItem = (tagId) => {
    const newValue = value.filter((t) => t.tagId !== tagId);
    onChange(newValue);
  };

  return (
    <>
      <Autocomplete
        multiple={true}
        value={value || []}
        options={options}
        getOptionLabel={(t) => t.name}
        filterOptions={filterOptions}
        filterSelectedOptions={true}
        loading={loading}
        renderInput={(params) => (
          <StyledTextField {...params} label="Tags" variant={variant} />
        )}
        renderOption={(t) => <TagItem tag={t} />}
        renderTags={(value, getTagProps) =>
          value.map((t) => (
            <TagItemWrapper key={t.tagId}>
              <TagItem tag={t}>
                <RemoveTag onClick={() => removeItem(t.tagId)}>
                  <Cancel />
                </RemoveTag>
              </TagItem>
            </TagItemWrapper>
          ))
        }
        onChange={handleChange}
        getOptionSelected={(a, b) => a.tagId === b.tagId}
      />
      <EditTagDialog open={dialogOpen} tag={newTag} onClose={dialogClose} />
    </>
  );
};

TagSelector.propTypes = {
  value: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  variant: PropTypes.string,
};

export default TagSelector;
