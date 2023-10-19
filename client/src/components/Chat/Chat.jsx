import './Chat.scss';
import {
  RiAttachment2,
  RiEmotionHappyLine,
  RiMicLine,
  RiMore2Line,
  RiSearch2Line,
  RiSendPlane2Fill,
} from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import { socket } from '../../sockets/socket.js';

const Chat = ({ onToggle }) => {
  const { data, messages, partner } = useSelector(
    (state) => state.conversation,
  );
  const user = useSelector((state) => state.user.data);
  const socketData = useSelector((state) => state.socket);

  const chatRef = useRef();

  useEffect(() => {}, [socketData.connected]);

  // useEffect(() => {
  //   if (messages.at(-1).sender === user?.id) {
  //     chatRef.current.scrollTop = chatRef.current.scrollHeight;
  //   }
  // }, [messages]);

  const formHandler = (e) => {
    e.preventDefault();
    if (!socketData.connected) return;

    socket.emit('newMsgToConvo', {
      content: e.target[0].value,
      userId: user.id,
      convoId: data.id,
    });
  };

  return (
    <div className="chat">
      {partner && (
        <div className="chat__profile">
          <img
            // src="https://xsgames.co/randomusers/assets/avatars/male/23.jpg"
            src={partner.img}
            alt="Chat group"
          />
          <div className="chat__profile-name">
            <span>{partner.name} </span>
            {socketData.onlineUsers?.find(
              (onlineUser) => onlineUser.userId === partner.id,
            ) ? (
              <span className="chat__profile-status chat__profile-status--online">
                Online
              </span>
            ) : (
              <span className="chat__profile-status">
                {new Date(partner.lastSeen).getHours()}:
                {new Date(partner.lastSeen).getMinutes()}
              </span>
            )}
          </div>
          <RiSearch2Line />
          <RiMore2Line onClick={() => onToggle(true)} />
        </div>
      )}

      <section className="chat__section" ref={chatRef}>
        {messages?.length > 0 &&
          messages.map((msg) =>
            msg.isSticker ? (
              <div
                className={`message message--sticker ${
                  msg.sender === user.id ? 'message--you' : ''
                }`}
              >
                <img src={msg.stickerUrl} alt="sticker" />
                <span className="message__date">
                  {new Date(msg.createdAt).getHours()}:
                  {new Date(msg.createdAt).getMinutes()}
                </span>
              </div>
            ) : (
              <div
                className={`message ${
                  msg.sender === user.id ? 'message--you' : ''
                }`}
              >
                {msg.content}
                <span className="message__date">
                  {new Date(msg.createdAt).getHours()}:
                  {new Date(msg.createdAt).getMinutes()}
                </span>
              </div>
            ),
          )}
      </section>

      <form className="chat__form" onSubmit={formHandler}>
        <RiEmotionHappyLine />
        <RiAttachment2 />
        <input className="chat__form-input" placeholder="👋🏻 Say hello" />
        <RiMicLine />
        <RiSendPlane2Fill />
      </form>
    </div>
  );
};

export default Chat;
