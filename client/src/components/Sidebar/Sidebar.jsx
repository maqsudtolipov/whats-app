import './Sidebar.scss';
import {
  RiAddLine,
  RiChatNewLine,
  RiCloseCircleLine,
  RiMore2Line,
  RiSearch2Line,
} from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { joinConversation } from '../../store/reducers/conversation.js';
import { socket } from '../../sockets/socket.js';
import axios from '../../api/axios.js';
import { useState } from 'react';
import { addNewConversationToUser } from '../../store/reducers/user.js';

const Sidebar = ({ onToggle }) => {
  const [users, setUsers] = useState();
  const [openSearch, setOpenSearch] = useState(false);

  const { conversations, data: user } = useSelector((state) => state.user);
  const socketData = useSelector((state) => state.socket);

  const dispatch = useDispatch();

  const joinConversationHandler = (id) => {
    if (!socketData.connected) return;

    socket
      .emitWithAck('joinConversation', {
        cId: id,
        userId: user.id,
      })
      .then((data) => {
        dispatch(joinConversation(data));
      });
  };

  const searchHandler = async (e) => {
    e.preventDefault();

    setOpenSearch(true);

    const res = await axios.get(`/users?name=${e.target[0].value}`);
    setUsers(res.data.data);
  };

  const createConversationHandler = async (id) => {
    const res = await axios.post('/conversations', {
      users: [user.id, id],
    });

    // Join conversation after it's created
    joinConversationHandler(res.data.data.id);
    dispatch(addNewConversationToUser(res.data.data));
  };

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
    <div className="sidebar">
      <div className="sidebar__profile">
        {user && (
          <img src={user.img} alt="Profile" onClick={() => onToggle(true)} />
        )}
        <div className="sidebar__profile-icons">
          <RiChatNewLine />
          <RiMore2Line />
        </div>
      </div>

      <div className="sidebar__search">
        <form onSubmit={searchHandler}>
          <input type="text" placeholder="Search" />

          {openSearch ? (
            <RiCloseCircleLine
              onClick={() => {
                setOpenSearch(false);
                setUsers(null);
              }}
            />
          ) : (
            <RiSearch2Line />
          )}
        </form>
      </div>

      {openSearch && (
        <ul className="sidebar__search-users">
          {users?.length >= 1 &&
            users.map((user) => (
              <li
                key={user.id}
                className="sidebar__search-user"
                onClick={() => createConversationHandler(user.id)}
              >
                <img src={user.img} />
                <span>{user.name}</span>
              </li>
            ))}
        </ul>
      )}

      {!openSearch && (
        <>
          <div className="sidebar__stories">
            <h2>Stories</h2>
            <ul className="sidebar__stories-users">
              <div className="sidebar__stories-user sidebar__stories-user--icon">
                <RiAddLine />
              </div>
              <img
                className="sidebar__stories-user"
                src="https://xsgames.co/randomusers/assets/avatars/male/37.jpg"
                alt="User avatar"
              />
              <img
                className="sidebar__stories-user"
                src="https://xsgames.co/randomusers/assets/avatars/male/12.jpg"
                alt="User avatar"
              />
              <img
                className="sidebar__stories-user"
                src="https://xsgames.co/randomusers/assets/avatars/male/31.jpg"
                alt="User avatar"
              />
              <img
                className="sidebar__stories-user"
                src="https://xsgames.co/randomusers/assets/avatars/male/3.jpg"
                alt="User avatar"
              />{' '}
              <img
                className="sidebar__stories-user"
                src="https://xsgames.co/randomusers/assets/avatars/male/9.jpg"
                alt="User avatar"
              />{' '}
              <img
                className="sidebar__stories-user"
                src="https://xsgames.co/randomusers/assets/avatars/male/43.jpg"
                alt="User avatar"
              />
            </ul>
          </div>

          <ul className="sidebar__chats">
            <h2>Messages</h2>
            {conversations &&
              conversations.map((con) => (
                <li
                  key={con.partner.id}
                  className="sidebar__chat"
                  onClick={() => joinConversationHandler(con.id)}
                >
                  <img
                    className="sidebar__chat-img"
                    src={con.partner.img}
                    alt="User avatar"
                  />
                  <div className="sidebar__chat-content">
                    <div className="sidebar__chat-title">
                      <div className="sidebar__chat-name">
                        {con.partner.name}
                      </div>
                      {con.latestMessageDate && (
                        <div className="sidebar__chat-time">
                          {`${checkDateHandler(con.latestMessageDate)}`}
                        </div>
                      )}
                    </div>
                    {con.latestMessage && (
                      <div className="sidebar__chat-latest">
                        {con.latestMessage}
                      </div>
                    )}

                    {/*<div className="sidebar__chat-count">8</div>*/}
                  </div>
                </li>
              ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Sidebar;
