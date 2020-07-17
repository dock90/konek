import styled from 'styled-components';
import { useState } from 'react';
import { BaseButton } from '../styles/Button';
import { Add } from '@material-ui/icons';
import NoteEdit from './NoteEdit';

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export function NoteActions() {
  const [showNewForm, toggleNewForm] = useState(false);

  return (
    <>
      <Actions>
        <BaseButton onClick={() => toggleNewForm(true)}>
          <Add />
          &nbsp;New Note
        </BaseButton>
      </Actions>
      {showNewForm ? <NoteEdit setEdit={toggleNewForm} /> : null}
    </>
  );
}
