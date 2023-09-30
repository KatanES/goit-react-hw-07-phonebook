import { useDispatch, useSelector } from 'react-redux';

import { deleteContact, restoreDeletedContacts } from 'redux/operations';
import {
  selectFilteredContacts,
  selectRestoredContacts,
} from 'redux/selectors';

export const FormList = () => {
  const filteredContacts = useSelector(selectFilteredContacts);
  // console.log(filteredContacts);
  const restoredContacts = useSelector(selectRestoredContacts);

  const dispatch = useDispatch();

  const onDeleteContact = contactId => {
    dispatch(deleteContact(contactId));
  };

  const resetChanges = () => {
    dispatch(restoreDeletedContacts(restoredContacts));
  };

  if (!Array.isArray(filteredContacts) || filteredContacts.length === 0) {
    // console.log(filteredContacts);
    return null;
  }
  return (
    <div>
      <ul>
        {filteredContacts.map(({ name, number, id }) => (
          <li key={id}>
            <span>{name}:</span>
            <span>{number}</span>
            <button onClick={() => onDeleteContact(id)}>Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={resetChanges}>Reset</button>
    </div>
  );
};
