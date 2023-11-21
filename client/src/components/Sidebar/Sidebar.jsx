import './Sidebar.scss';
import {
  RiAddLine,
  RiChatNewLine,
  RiCloseCircleLine,
  RiSearch2Line,
} from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { joinConversation } from '../../store/reducers/conversation.js';
import { socket } from '../../sockets/socket.js';
import axios from '../../api/axios.js';
import { useState } from 'react';
import { addNewConversationToUser } from '../../store/reducers/user.js';
import SidebarStories from './Stories.jsx';
import SidebarConversations from './SidebarConversations.jsx';
import Search from './Search/Search.jsx';

const Sidebar = () => {
  const { conversations, data: user } = useSelector((state) => state.user);
  const socketData = useSelector((state) => state.socket);

  const dispatch = useDispatch();

  const handleJoinConversation = (id) => {
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

  return (
    <div className="sidebar">
      <Search onJoinConversation={handleJoinConversation} />

      <SidebarStories />

      {conversations && (
        <SidebarConversations
          conversations={conversations}
          onJoinConversation={handleJoinConversation}
        />
      )}
    </div>
  );
};

export default Sidebar;
