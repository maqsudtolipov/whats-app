import { RiMore2Line, RiSearch2Line } from 'react-icons/ri';

const getHours = (date) => {
  const hours = new Date(date).getHours();
  const minutes = new Date(date).getMinutes();
  const hoursFixed = hours >= 10 ? hours : '0' + hours;
  const minutesFixed = minutes >= 10 ? minutes : '0' + minutes;

  return `${hoursFixed}:${minutesFixed}`;
};

const ChatProfile = ({ partner, socketData, onDetailsOpen }) => {
  const partnerStatus = (
    <>
      {socketData.onlineUsers?.find(
        (onlineUser) => onlineUser.userId === partner.id,
      ) ? (
        <span className="chat__profile-status chat__profile-status--online">
          Online
        </span>
      ) : (
        <span className="chat__profile-status">
          Last seen at&nbsp;
          {getHours(partner.lastSeen)}
        </span>
      )}
    </>
  );

  return (
    <div className="chat__profile">
      <img
        // src="https://xsgames.co/randomusers/assets/avatars/male/23.jpg"
        src={partner.img}
        alt="Partner profile"
      />
      <div className="chat__profile-name">
        <span>{partner.name}</span>
        {partnerStatus}
      </div>
      
      <RiSearch2Line />
      <RiMore2Line
        style={{ cursor: 'pointer' }}
        onClick={() => onDetailsOpen(true)}
      />
    </div>
  );
};

export default ChatProfile;
