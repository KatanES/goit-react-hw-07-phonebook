import { Formik } from 'formik';
import { StyledForm, StyledField, StyledError } from './PhoneForm.styled';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import { useDispatch, useSelector } from 'react-redux';
import { selectContacts } from 'redux/selectors';
import { addContacts } from 'redux/operations';

const schema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/)
    .required('Required!')
    .min(2, 'Too Short!')
    .max(50, 'Too Long!'),
  number: Yup.string()
    .matches(
      /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/
    )
    .required('Required!')
    .min(2, 'Too Short!')
    .max(50, 'Too Long!'),
});

const initialValues = { name: '', number: '' };

export const PhoneForm = () => {
  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();

  const onAddContact = newContact => {
    const existingContact = contacts.find(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );
    console.log(newContact);
    if (existingContact) {
      toast.info(`${newContact.name} is already in contacts.`, {
        position: 'top-right',
        autoClose: 2000,
      });
      return;
    }
    // const newItem = {
    //   id: nanoid(),
    //   name: newContact.name,
    //   number: newContact.number,
    // };
    const action = addContacts(newContact);
    dispatch(action);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={(values, actions) => {
        onAddContact({ ...values });
        actions.resetForm();
      }}
    >
      {({ handleSubmit }) => (
        <StyledForm onSubmit={handleSubmit}>
          <h2>PhoneBook</h2>
          <label>
            Name
            <StyledField name="name" />
            <StyledError name="name" component="div" />
          </label>
          <label>
            Number
            <StyledField name="number" />
            <StyledError name="number" component="div" />
          </label>

          <button type="submit">Add contact</button>
        </StyledForm>
      )}
    </Formik>
  );
};
