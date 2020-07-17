import { useMutation } from '@apollo/client';
import { useContext, useMemo, useState } from 'react';
import { UPDATE_CONTACT_MUTATION } from '../../../queries/ContactQueries';
import { ContactContext } from '../../../contexts/ContactContext';
import { FileCopy, Cancel } from '@material-ui/icons';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@material-ui/core';
import { BaseButton } from '../../styles/Button';
import Loading from '../../Loading';
import { ContactInformation } from '../ContactInformation';
import AvatarPicture from '../../assets/AvatarPicture';
import { FlexContainer } from '../../styles/LayoutStyles';
import { H5 } from '../../styles/Typography';

const fields = [
    'name',
    'picture',
    'city',
    'state',
    'country',
    'postalCode',
    'language',
  ],
  merge = ['phones', 'emails'],
  doMerge = (contact) => {
    const c = {
        contactId: contact.contactId,
      },
      clean = (val) => {
        if (val.__typename !== undefined) {
          const newVal = { ...val };
          delete newVal.__typename;
          return newVal;
        } else if (Array.isArray(val)) {
          const newVal = [];
          for (const valElement of val) {
            newVal.push(clean(valElement));
          }

          return newVal;
        }

        return val;
      };

    for (const field of fields) {
      if (contact.profile[field]) {
        c[field] = clean(contact.profile[field]);
      }
    }

    for (const field of merge) {
      const newValue = [...contact[field]];
      if (contact.profile[field]) {
        for (const row of contact.profile[field]) {
          newValue.push(row);
        }
      }
      c[field] = clean(newValue);
    }

    return c;
  };

export const CopyProfileToContact = () => {
  const contact = useContext(ContactContext);
  const [open, setOpen] = useState(false);
  const [updateProfile, { loading }] = useMutation(UPDATE_CONTACT_MUTATION);

  const mergedContact = useMemo(() => {
    return doMerge(contact);
  }, [contact]);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const executeCopy = async () => {
    await updateProfile({ variables: mergedContact });
    setOpen(false);
  };

  return (
    <>
      <BaseButton onClick={handleOpen}>
        <FileCopy />
        &nbsp;Copy To Contact
      </BaseButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Fields to be copied:</DialogTitle>
        <DialogContent>
          {loading ? (
            <Loading />
          ) : (
            <>
              <FlexContainer>
                {mergedContact.picture && (
                  <AvatarPicture
                    size={50}
                    style={{ marginRight: 10 }}
                    picture={mergedContact.picture}
                  />
                )}
                <H5>{mergedContact.name}</H5>
              </FlexContainer>
              <ContactInformation info={mergedContact} fullWidth />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <BaseButton primary onClick={executeCopy} disabled={loading}>
            <FileCopy />
            &nbsp;Copy
          </BaseButton>
          <BaseButton onClick={handleClose} disabled={loading}>
            <Cancel />
            &nbsp;Cancel
          </BaseButton>
        </DialogActions>
      </Dialog>
    </>
  );
};
