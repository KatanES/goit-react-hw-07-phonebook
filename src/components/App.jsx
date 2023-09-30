import { PhoneForm } from './Phonebook/PhoneForm';
import { FormList } from './Phonebook/FormList.jsx';
import { Layout } from './Layout/Layout';

import { useEffect } from 'react';
import { ContactFilter } from './Phonebook/ContactFilter';
import { useDispatch, useSelector } from 'react-redux';
import { selectError, selectIsLoading } from 'redux/selectors';
import { fetchContacts } from 'redux/operations';

export const App = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <Layout>
      <div>
        <PhoneForm />
        {isLoading && !error && <b>Request in progress...</b>}
        <ContactFilter />
        <FormList />
      </div>
    </Layout>
  );
};
