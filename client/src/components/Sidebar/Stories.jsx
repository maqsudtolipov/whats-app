import { RiAddLine } from 'react-icons/ri';

const Stories = () => {
  return (
    <div className="sidebar__stories">
      <h2>Stories</h2>
      <ul className="sidebar__stories-users">
        <div className="sidebar__stories-user sidebar__stories-user--icon">
          <RiAddLine />
        </div>
        <img
          className="sidebar__stories-user"
          src="https://xsgames.co/randomusers/assets/avatars/male/37.jpg"
          alt="User avatar"
        />
        <img
          className="sidebar__stories-user"
          src="https://xsgames.co/randomusers/assets/avatars/male/12.jpg"
          alt="User avatar"
        />
        <img
          className="sidebar__stories-user"
          src="https://xsgames.co/randomusers/assets/avatars/male/31.jpg"
          alt="User avatar"
        />
        <img
          className="sidebar__stories-user"
          src="https://xsgames.co/randomusers/assets/avatars/male/3.jpg"
          alt="User avatar"
        />{' '}
        <img
          className="sidebar__stories-user"
          src="https://xsgames.co/randomusers/assets/avatars/male/9.jpg"
          alt="User avatar"
        />{' '}
        <img
          className="sidebar__stories-user"
          src="https://xsgames.co/randomusers/assets/avatars/male/43.jpg"
          alt="User avatar"
        />
      </ul>
    </div>
  );
};

export default Stories;
