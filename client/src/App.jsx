import './App.scss';
import Sidebar from './components/Sidebar/Sidebar.jsx';
import Chat from './components/Chat/Chat.jsx';
import Details from './components/Details/Details.jsx';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login.jsx';
import Signup from './components/Auth/Signup.jsx';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isLoggedIn } from './store/thunks/user.js';
import { socket } from './sockets/socket.js';
import { messageDelivered, newMessage } from './store/reducers/conversation.js';
import { connectSocket, updateOnlineUsers } from './store/reducers/socket.js';
import { updateLatestMessage } from './store/reducers/user.js';
import Nav from './components/Nav/Nav.jsx';
import Settings from './pages/Settings.jsx';

function App() {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const user = useSelector((state) => state.user);
  const theme = useSelector((state) => state.theme);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(isLoggedIn());
  }, []);

  useEffect(() => {
    // Only connect after user is logged
    if (user.auth) {
      socket.connect();

      socket.emit('join', user.data.id);

      socket.on('connect', () => {
        console.log('📡 Connected');
        dispatch(connectSocket(socket.id));
      });

      socket.on('msgToRoom', (data, con) => {
        dispatch(newMessage(data));
        dispatch(updateLatestMessage(con));
      });

      socket.on('msgDeliverConfirm', (data) => {
        dispatch(messageDelivered(data));
      });

      socket.on('updateOnlineUsers', (onlineUsers) => {
        dispatch(updateOnlineUsers(onlineUsers));
      });
    }

    return () => {
      socket.off('connect', () => console.log('Disconnected'));
      socket.off('msgToRoom', () => console.log('Disconnected'));
    };
  }, [user.auth]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              {user.auth ? (
                <div className={`app ${theme.dark ? '' : 'light'}`}>
                  <Nav />
                  <Sidebar />
                  <Chat onDetailsOpen={setIsDetailsOpen} />
                  <Details
                    isDetailsOpen={isDetailsOpen}
                    onToggle={setIsDetailsOpen}
                  />
                </div>
              ) : (
                <Navigate to="/login" />
              )}
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              {user.auth ? (
                <div className={`app ${theme.dark ? '' : 'light'}`}>
                  <Nav />
                  <Settings />
                </div>
              ) : (
                <Navigate to="/login" />
              )}
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
