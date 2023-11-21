import { RiChatNewLine } from 'react-icons/ri';

const SidebarConversations = ({ conversations, onJoinConversation }) => {
  const checkDateHandler = (date) => {
    const diff = Date.now() - new Date(date).getTime();

    if (diff < 60 * 1000) {
      return 'Now';
    }

    if (diff < 24 * 60 * 60 * 1000) {
      const hour = new Date(date).getHours();
      const minute = new Date(date).getMinutes();

      return hour + ':' + minute;
    }

    if (diff < 7 * 24 * 60 * 60 * 1000) {
      const weekday = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ];
      const day = new Date(date).getDay();

      return weekday[day];
    }

    return '👀 A long time ago';
  };

  return (
    <ul className="sidebar__conversations">
      <h2
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        Messages <RiChatNewLine />
      </h2>
      {conversations &&
        conversations.map((con) => (
          <li
            key={con.partner.id}
            className="sidebar__chat"
            onClick={() => onJoinConversation(con.id)}
          >
            <img
              className="sidebar__chat-img"
              src={con.partner.img}
              alt="User avatar"
            />
            <div className="sidebar__chat-content">
              <div className="sidebar__chat-title">
                <div className="sidebar__chat-name">{con.partner.name}</div>
                {con.latestMessageDate && (
                  <div className="sidebar__chat-time">
                    {`${checkDateHandler(con.latestMessageDate)}`}
                  </div>
                )}
              </div>
              {con.latestMessage && (
                <div className="sidebar__chat-latest">{con.latestMessage}</div>
              )}

              {/*<div className="sidebar__chat-count">8</div>*/}
            </div>
          </li>
        ))}
    </ul>
  );
};

export default SidebarConversations;
