import './Sidebar.scss';
import {
  RiAddLine,
  RiChatNewLine,
  RiMore2Line,
  RiSearch2Line,
} from 'react-icons/ri';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar__profile">
        <img
          src="https://randomuser.me/api/portraits/men/43.jpg"
          alt="Profile"
        />
        <div className="sidebar__profile-icons">
          <RiChatNewLine />
          <RiMore2Line />
        </div>
      </div>

      <div className="sidebar__search">
        <form>
          <input type="text" value="Maqsud" placeholder="Search" />
          <RiSearch2Line />
        </form>
      </div>

      <div className="sidebar__stories">
        <h2>Stories</h2>
        <div className="sidebar__stories-users">
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
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
