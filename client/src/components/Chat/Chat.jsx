import './Chat.scss';
import { useSelector } from 'react-redux';
import ChatProfile from './ChatProfile.jsx';
import ChatForm from './ChatForm.jsx';
import ChatMessages from './ChatMessages.jsx';

const Chat = ({ onDetailsOpen }) => {
  const { partner } = useSelector((state) => state.conversation);

  const socketData = useSelector((state) => state.socket);

  return (
    <div className="chat">
      {partner && (
        <ChatProfile
          partner={partner}
          socketData={socketData}
          onDetailsOpen={onDetailsOpen}
        />
      )}

      <ChatMessages />
      <ChatForm socketData={socketData} />
    </div>
  );
};

export default Chat;
