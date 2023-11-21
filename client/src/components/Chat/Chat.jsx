import './Chat.scss';
import {
  RiAttachment2,
  RiCheckDoubleLine,
  RiCheckLine,
  RiEmotionHappyLine,
  RiMicLine,
  RiMore2Line,
  RiSearch2Line,
  RiSendPlane2Fill,
} from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import { socket } from '../../sockets/socket.js';

const getHours = (date) => {
  const hours = new Date(date).getHours();
  const minutes = new Date(date).getMinutes();
  const hoursFixed = hours >= 10 ? hours : '0' + hours;
  const minutesFixed = minutes >= 10 ? minutes : '0' + minutes;

  return `${hoursFixed}:${minutesFixed}`;
};

const Chat = ({ onDetailsOpen }) => {
  const { data, partner, messagesByDate } = useSelector(
    (state) => state.conversation,
  );
  const user = useSelector((state) => state.user.data);
  const socketData = useSelector((state) => state.socket);

  const chatRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          socket.emit('messageDelivered', {
            messageId: entry.target.id,
            conversationId: data.id,
          });
        }
      });
    });

    const messages = chatRef.current.querySelectorAll(
      '.message:not(.message--you)[data-seen="false"]',
    );
    if (messages.length >= 1)
      messages.forEach((msgEl) => observer.observe(msgEl));
  }, [messagesByDate]);

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
                Last seen at&nbsp;
                {getHours(partner.lastSeen)}
              </span>
            )}
          </div>
          <RiSearch2Line />
          <RiMore2Line
            style={{ cursor: 'pointer' }}
            onClick={() => onDetailsOpen(true)}
          />
        </div>
      )}

      <section className="chat__section" ref={chatRef}>
        {messagesByDate &&
          Object.keys(messagesByDate).map((date) => (
            <>
              <div className="messages__date">
                <span>
                  {date.split(' ')[1]} {date.split(' ')[2]}
                </span>
              </div>
              {messagesByDate[date].map((msg) =>
                msg.isSticker ? (
                  <div
                    key={msg.id}
                    id={msg.id}
                    className={`message message--sticker ${
                      msg.sender === user.id ? 'message--you' : ''
                    }`}
                  >
                    <img src={msg.stickerUrl} alt="sticker" />
                    <span className="message__date">
                      {getHours(msg.createdAt)}
                    </span>
                  </div>
                ) : (
                  <div
                    key={msg.id}
                    id={msg.id}
                    className={`message ${
                      msg.sender === user.id ? 'message--you' : ''
                    }`}
                    data-seen={!!msg.isSeen}
                  >
                    {msg.content}
                    <span className="message__date">
                      {getHours(msg.createdAt) + ' '}
                      {msg.sender === user.id &&
                        (msg.isSeen ? <RiCheckDoubleLine /> : <RiCheckLine />)}
                    </span>
                  </div>
                ),
              )}
            </>
          ))}
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
