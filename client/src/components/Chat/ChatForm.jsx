import {
  RiAttachment2,
  RiEmotionHappyLine,
  RiMicLine,
  RiSendPlane2Fill,
} from 'react-icons/ri';
import { socket } from '../../sockets/socket.js';
import { useSelector } from 'react-redux';

const ChatForm = ({ socketData }) => {
  const { data } = useSelector((state) => state.conversation);
  const { data: user } = useSelector((state) => state.user);

  const handleForm = (e) => {
    e.preventDefault();
    if (!socketData.connected) return;

    socket.emit('newMsgToConvo', {
      content: e.target[0].value,
      userId: user.id,
      convoId: data.id,
    });
  };

  return (
    <form className="chat__form" onSubmit={handleForm}>
      <RiEmotionHappyLine />
      <RiAttachment2 />
      <input className="chat__form-input" placeholder="👋🏻 Say hello" />
      <RiMicLine />
      <RiSendPlane2Fill />
    </form>
  );
};

export default ChatForm;
