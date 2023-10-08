import './Sidebar.scss';
import {
  RiChatNewLine,
  RiMore2Line,
  RiSearch2Fill,
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
          <input type="text" />
          <RiSearch2Line />
        </form>
      </div>
    </div>
  );
};

export default Sidebar;
