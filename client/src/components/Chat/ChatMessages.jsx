import { RiCheckDoubleLine, RiCheckLine } from 'react-icons/ri';
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

const ChatMessages = () => {
  const user = useSelector((state) => state.user.data);
  const { data, messagesByDate } = useSelector((state) => state.conversation);

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

  return (
    <section className="chat__messages" ref={chatRef}>
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
  );
};

export default ChatMessages;
