import './Chat.scss';
import { RiMore2Line, RiSearch2Line } from 'react-icons/ri';

const Chat = () => {
  return (
    <div className="chat">
      <div className="chat__profile">
        <img
          src="https://xsgames.co/randomusers/assets/avatars/male/23.jpg"
          alt="Chat group"
        />
        <div className="chat__profile-name">Luis Suarez</div>
        <RiSearch2Line />
        <RiMore2Line />
      </div>
    </div>
  );
};

export default Chat;
