import './Settings.scss';

const Settings = () => {
  return (
    <div className="settings">
      <h2>Settings</h2>
      <div className="settings__grid">
        <div>
          <h3>Account</h3>
          <h3>Display</h3>
          <p>Theme - dark</p>
          <p>Color - purple</p>
        </div>
        <h3>Preferences</h3>
      </div>
    </div>
  );
};

export default Settings;
