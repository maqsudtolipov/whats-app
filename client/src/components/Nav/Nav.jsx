import './Nav.scss';
import { useSelector } from 'react-redux';
import {
  RiChatSmile2Line,
  RiSearch2Line,
  RiSettings4Line,
} from 'react-icons/ri';
import { Link } from 'react-router-dom';

const Nav = () => {
  const user = useSelector((state) => state.user.data);

  return (
    <nav className="nav">
      <div className="nav__user-img">
        <img src={user.img} alt="" />
      </div>
      <div className="nav__links">
        <Link to="/" className="nav__link">
          <RiChatSmile2Line />
        </Link>
        <Link to="/" className="nav__link">
          <RiSearch2Line />
        </Link>
        <Link to="/settings" className="nav__link">
          <RiSettings4Line />
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
