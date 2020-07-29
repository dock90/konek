import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { useMutation } from '@apollo/client';
import {
  CREATE_TAG_MUTATION,
  TAGS_QUERY,
  UPDATE_TAG_MUTATION,
} from '../../queries/TagQueries';
import {
  Checkbox,
  Switch,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Popover,
} from '@material-ui/core';
import { Save, Cancel, Check } from '@material-ui/icons';
import { SketchPicker } from 'react-color';
import { BaseButton } from '../styles/Button';
import { TextField } from '../styles/TextField';
import { BaseIconButton } from '../styles/IconButton';
import TagItem from './TagItem';
import { FlexContainer } from '../styles/LayoutStyles';

const FieldWrapper = styled.div`
  margin-bottom: 10px;
`;

const accessToggle = {
  PRIVATE: 'SHARED',
  SHARED: 'PRIVATE',
};

export const NewTag = () => ({
  tagId: null,
  name: 'New Tag',
  access: 'PRIVATE',
  color: 'FFFFFF',
  isMine: true,
});

const EditTagDialog = ({ tag, open, onClose }) => {
  const [tagState, setTagState] = useState({}),
    [hasChange, setHasChange] = useState(false),
    [isSaving, setSaving] = useState(false),
    [colorPickOpen, setColorPickOpen] = useState(false);
  const colorSelector = useRef(null);
  const [updateTag] = useMutation(UPDATE_TAG_MUTATION, {
    refetchQueries: [{ query: TAGS_QUERY }],
  });
  const [createTag] = useMutation(CREATE_TAG_MUTATION, {
    refetchQueries: [{ query: TAGS_QUERY }],
  });

  useEffect(() => {
    const t = { ...tag };
    // Clean up so it doesn't bother the mutation.
    delete t.__typename;

    setTagState(t);
    setHasChange(false);
    setColorPickOpen(false);
  }, [tag, open]);

  const toggleAccess = () => {
    const access = accessToggle[tagState.access];
    setTagState({
      ...tagState,
      access,
    });
    setHasChange(true);
  };

  const handleChange = e => {
    let { name, value } = e.target;

    if (name === 'hidden') {
      value = e.target.checked;
    }

    setHasChange(true);
    setTagState({
      ...tagState,
      [name]: value,
    });
  };

  const handleColorChange = color => {
    setHasChange(true);
    setTagState({
      ...tagState,
      color: color.hex.replace('#', ''),
    });
  };

  const handleToggleColorPickOpen = () => {
      setColorPickOpen(!colorPickOpen);
    },
    handleColorPickClose = () => {
      setColorPickOpen(false);
    };

  const handleSave = async () => {
    if (hasChange) {
      setSaving(true);
      if (!tag.tagId) {
        await createTag({
          variables: tagState,
        });
      } else {
        await updateTag({
          variables: tagState,
        });
      }
      setSaving(false);
    }

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {tagState.tagId ? `Edit Tag "${tagState.name}"` : 'New Tag'}
      </DialogTitle>
      <DialogContent>
        <FieldWrapper>
          <TextField
            name="name"
            label="Name"
            value={tagState.name || ''}
            onChange={handleChange}
            required
            disabled={isSaving}
          />
        </FieldWrapper>
        <FieldWrapper>
          <FlexContainer>
            <BaseButton
              ref={colorSelector}
              style={{
                backgroundColor: tagState.color,
              }}
              onClick={handleToggleColorPickOpen}
              disabled={isSaving}
            >
              Set Color
            </BaseButton>
            <TagItem style={{ alignSelf: 'center' }} tag={tagState} />
          </FlexContainer>
          <Popover
            open={colorPickOpen}
            anchorEl={colorSelector.current}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            onClose={handleColorPickClose}
          >
            <SketchPicker
              onChange={handleColorChange}
              color={tagState.color}
              disableAlpha={true}
            />
            <BaseIconButton
              style={{ float: 'right' }}
              onClick={handleToggleColorPickOpen}
            >
              <Check />
            </BaseIconButton>
          </Popover>
        </FieldWrapper>
        {tag.isMine ? (
          <FieldWrapper>
            <FormControlLabel
              control={
                <Switch
                  checked={tagState.access === 'SHARED'}
                  onChange={toggleAccess}
                  color="primary"
                  disabled={isSaving}
                />
              }
              label={tagState.access}
            />
          </FieldWrapper>
        ) : (
          tag.access
        )}
        <FieldWrapper>
          <FormControlLabel
            control={
              <Checkbox
                name="hidden"
                checked={!!tagState.hidden}
                onChange={handleChange}
                disabled={isSaving}
              />
            }
            label="Hidden"
          />
        </FieldWrapper>
      </DialogContent>
      <DialogActions>
        <BaseButton primary onClick={handleSave} disabled={isSaving}>
          <Save />
          &nbsp;Save
        </BaseButton>
        <BaseButton onClick={() => onClose()} disabled={isSaving}>
          <Cancel />
          &nbsp;Cancel
        </BaseButton>
      </DialogActions>
    </Dialog>
  );
};

EditTagDialog.propTypes = {
  tag: PropTypes.object.isRequired,
};

export default EditTagDialog;
