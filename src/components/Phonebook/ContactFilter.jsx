import { useDispatch, useSelector } from 'react-redux';
import { setContactFilter } from 'redux/filterSlice';
import { selectFilter } from 'redux/selectors';

export const ContactFilter = () => {
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();
  const changeContactFilter = evt => {
    dispatch(setContactFilter(evt.target.value.toLowerCase().trim()));
  };
  return (
    <div>
      <h2>Find contacts by name</h2>
      <input type="text" value={filter} onChange={changeContactFilter}></input>
    </div>
  );
};
