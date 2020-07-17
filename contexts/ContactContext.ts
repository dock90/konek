import { createContext } from 'react';
import { ContactFields } from '../queries/types/ContactFields';

export const ContactContext = createContext<ContactFields>({} as ContactFields);
