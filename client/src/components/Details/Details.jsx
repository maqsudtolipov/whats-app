import './Details.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  RiArrowRightSLine,
  RiCloseLine,
  RiLogoutBoxLine,
  RiSettings5Line,
} from 'react-icons/ri';
import { logOut } from '../../store/thunks/user.js';
import { useNavigate } from 'react-router-dom';

const Details = ({ isOpen, onToggle }) => {
  const user = useSelector((state) => state.user.data);
  const { partner } = useSelector((state) => state.conversation);
  const { onlineUsers } = useSelector((state) => state.socket);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const logOutHandler = async () => {
    await dispatch(logOut());
    await navigate(0);
  };

  return (
    <div className={`details ${!isOpen ? 'details--close' : ''}`}>
      <div className="details__header">
        <RiCloseLine onClick={() => onToggle(false)} />
        <span>Contact Info</span>
      </div>
      {partner && (
        <>
          <div className="details__profile">
            <img
              // src="https://randomuser.me/api/portraits/men/43.jpg"
              src={partner.img}
              alt="User avatar"
            />
            <p className="details__profile-heading">{partner.name}</p>

            <span className="details__profile-online">
              {onlineUsers?.find(
                (onlineUser) => onlineUser.userId === partner.id,
              ) && 'online'}
            </span>
          </div>
          <div className="details__info">
            <p className="details__profile-heading">About Me</p>
            <p className="details__profile-text">{partner.bio}</p>
          </div>
        </>
      )}
      <div className="details__section">
        <div className="details__link">
          <RiSettings5Line />
          <span>Settings</span>
          <RiArrowRightSLine />
        </div>
        <div
          className="details__link"
          style={{ color: '#ef4444' }}
          onClick={logOutHandler}
        >
          <RiLogoutBoxLine />
          <span>Log out</span>
          {/*<RiArrowRightSLine />*/}
        </div>
      </div>
    </div>
  );
};

export default Details;
