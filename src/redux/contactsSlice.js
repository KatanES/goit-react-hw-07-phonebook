import { createSlice } from '@reduxjs/toolkit';
import {
  fetchContacts,
  addContacts,
  deleteContact,
  restoreDeletedContacts,
} from './operations';

// import { nanoid } from 'nanoid';

// import initialContacts from '../components/contactsList.json';

const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const handleFetchContactsFulfilled = (state, action) => {
  state.isLoading = false;
  state.error = null;
  state.items = action.payload;
};

const handleAddContactsFulfilled = (state, action) => {
  state.isLoading = false;
  state.error = null;
  state.items.push(action.payload);
};

const handleDeleteContactsFulfilled = (state, action) => {
  state.isLoading = false;
  state.error = null;
  const index = state.items.findIndex(
    contact => contact.id === action.payload.id
  );
  state.items.splice(index, 1);
};

const handleRestoreDeletedContactsFulfilled = (state, action) => {
  state.isLoading = false;
  state.error = null;
  state.deletedContacts = state.deletedContacts.filter(deleteContact => {
    return !action.payload.includes(deleteContact.id);
  });

  state.items = [...state.items, ...action.payload];
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    deletedContacts: [],
    isLoading: false,
    error: null,
  },

  extraReducers: builder =>
    builder
      .addCase(fetchContacts.pending, handlePending)
      .addCase(fetchContacts.fulfilled, handleFetchContactsFulfilled)
      .addCase(fetchContacts.rejected, handleRejected)
      .addCase(addContacts.pending, handlePending)
      .addCase(addContacts.fulfilled, handleAddContactsFulfilled)
      .addCase(addContacts.rejected, handleRejected)
      .addCase(deleteContact.pending, handlePending)
      .addCase(deleteContact.fulfilled, handleDeleteContactsFulfilled)
      .addCase(deleteContact.rejected, handleRejected)
      .addCase(restoreDeletedContacts.pending, handlePending)
      .addCase(
        restoreDeletedContacts.fulfilled,
        handleRestoreDeletedContactsFulfilled
      )
      .addCase(restoreDeletedContacts.rejected, handleRejected),
});

export const contactsReducer = contactsSlice.reducer;
