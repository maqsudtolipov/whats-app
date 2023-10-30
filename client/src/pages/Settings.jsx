import './Settings.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';
import { updateMe } from '../store/thunks/user.js';
import { toggleDark } from '../store/reducers/theme.js';
import Switch from '../ui/Switch.jsx';

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
        <div className="settings__part">
          <h3>Account</h3>
          <div className="settings__account">
            <img className="settings__img" src={user.img} />
            <form ref={formRef} onSubmit={formHandler}>
              <input type="text" name="name" placeholder={user.name} />
              <textarea name="bio" placeholder={user.bio} />
              <button type="submit">Save</button>
            </form>
          </div>
        </div>
        <div className="settings__part">
          <h3>Display</h3>
          <div className="settings__option">
            <span>Dark Mode</span>
            <Switch onToggle={toggleDarkHandler} checked />
          </div>
          <div className="settings__option">
            <span>Color</span>
            <div className="settings__colors">
              <div className="settings__color settings__color--purple"></div>
              <div className="settings__color settings__color--green"></div>
              <div className="settings__color settings__color--blue"></div>
              <div className="settings__color settings__color--gray"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
