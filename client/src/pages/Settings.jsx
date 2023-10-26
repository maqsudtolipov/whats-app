import './Settings.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';
import { updateMe } from '../store/thunks/user.js';
import { toggleDark } from '../store/reducers/theme.js';

const Settings = () => {
  const user = useSelector((state) => state.user.data);

  const dispatch = useDispatch();

  const formRef = useRef();

  const formHandler = (e) => {
    e.preventDefault();

    const name = e.target[0].value;
    const bio = e.target[1].value;

    dispatch(updateMe({ name, bio }));
  };

  const toggleDarkHandler = () => {
    dispatch(toggleDark());
  };

  return (
    <div className="settings">
      <h2>Settings</h2>
      <div className="settings__grid">
        <div>
          <h3>Account</h3>
          <form ref={formRef} onSubmit={formHandler}>
            <input type="text" name="name" placeholder={user.name} />
            <input type="text" name="bio" placeholder={user.bio} />
            <button type="submit">Update</button>
          </form>
          <h3>Display</h3>
          <p>Theme - dark</p>
          <button onClick={toggleDarkHandler}>toggle</button>
          <p>Color - purple</p>
        </div>
        <h3>Preferences</h3>
      </div>
    </div>
  );
};

export default Settings;
