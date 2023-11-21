import { RiCheckDoubleLine, RiCheckLine } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import { socket } from '../../sockets/socket.js';
import Message from './Message.jsx';

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
                <>
                  <Message
                    key={msg.id}
                    isSticker={true}
                    stickerUrl={msg.stickerUrl}
                    isSender={msg.sender === user.id}
                    isSeen={msg.isSeen}
                    sentTime={getHours(msg.createdAt)}
                    data-seen={!!msg.isSeen}
                  />
                </>
              ) : (
                <Message
                  key={msg.id}
                  content={msg.content}
                  isSender={msg.sender === user.id}
                  isSeen={msg.isSeen}
                  sentTime={getHours(msg.createdAt)}
                  data-seen={!!msg.isSeen}
                />
              ),
            )}
          </>
        ))}
    </section>
  );
};

export default ChatMessages;
