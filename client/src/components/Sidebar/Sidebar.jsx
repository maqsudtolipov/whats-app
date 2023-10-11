import './Sidebar.scss';
import {
  RiAddLine,
  RiChatNewLine,
  RiMore2Line,
  RiSearch2Line,
} from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { joinConversation } from '../../store/reducers/conversation.js';
import { socket } from '../../sockets/socket.js';
import axios from '../../api/axios.js';
import { useState } from 'react';

const Sidebar = ({ onToggle }) => {
  const [users, setUsers] = useState();

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
        console.log('📡 joined room');
        dispatch(joinConversation(data));
      });
  };

  const searchHandler = async (e) => {
    e.preventDefault();

    const res = await axios.get(`/users?name=${e.target[0].value}`);
    setUsers(res.data.data);
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
          <RiSearch2Line />
        </form>

        <ul className="sidebar__search-users">
          {users?.length >= 1 &&
            users.map((user) => (
              <li key={user.id} className="sidebar__search-user">
                <img src={user.img} />
                <span>{user.name}</span>
              </li>
            ))}
        </ul>
      </div>

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
                  <div className="sidebar__chat-name">{con.partner.name}</div>
                  <div className="sidebar__chat-time">16:53</div>
                </div>
                <div className="sidebar__chat-latest">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore
                </div>

                <div className="sidebar__chat-count">8</div>
              </div>
            </li>
          ))}
        {0 > 100 && (
          <li className="sidebar__chat">
            <img
              className="sidebar__chat-img"
              src="https://xsgames.co/randomusers/assets/avatars/male/1.jpg"
              alt="User avatar"
            />
            <div className="sidebar__chat-content">
              <div className="sidebar__chat-title">
                <div className="sidebar__chat-name">Ambrose Biernat</div>
                <div className="sidebar__chat-time">16:53</div>
              </div>
              <div className="sidebar__chat-latest">
                Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore
              </div>

              <div className="sidebar__chat-count">8</div>
            </div>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
