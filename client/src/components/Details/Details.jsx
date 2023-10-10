import './Details.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  RiArrowRightSLine,
  RiCloseLine,
  RiLogoutBoxLine,
  RiSettings5Line,
} from 'react-icons/ri';

const Details = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  return (
    <div className="details">
      <div className="details__header">
        <RiCloseLine />
        <span>Profile</span>
      </div>
      {user && (
        <>
          <div className="details__profile">
            <img
              src="https://randomuser.me/api/portraits/men/43.jpg"
              alt="User avatar"
            />
            <p className="details__profile-heading">{user.name}</p>
          </div>
          <div className="details__info">
            <p className="details__profile-heading">Info</p>
            <p className="details__profile-text">{user.bio}</p>
          </div>
        </>
      )}
      <div className="details__section">
        <div className="details__link">
          <RiSettings5Line />
          <span>Settings</span>
          <RiArrowRightSLine />
        </div>
        <div className="details__link" style={{ color: '#ef4444' }}>
          <RiLogoutBoxLine />
          <span>Log out</span>
          {/*<RiArrowRightSLine />*/}
        </div>
      </div>
    </div>
  );
};

export default Details;
