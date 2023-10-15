import './App.scss';
import Sidebar from './components/Sidebar/Sidebar.jsx';
import Chat from './components/Chat/Chat.jsx';
import Details from './components/Details/Details.jsx';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login.jsx';
import Signup from './components/Auth/Signup.jsx';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isLoggedIn, logOut } from './store/thunks/user.js';
import { socket } from './sockets/socket.js';
import { joinConversation, newMessage } from './store/reducers/conversation.js';
import { connectSocket } from './store/reducers/socket.js';
import { updateLatestMessage } from './store/reducers/user.js';

function App() {
  const [isOpen, setIsOpen] = useState(true);

  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(isLoggedIn());
  }, []);

  useEffect(() => {
    // Only connect after user is logged
    if (user.auth) {
      socket.connect();

      socket.on('connect', () => {
        console.log('📡 Connected');
        dispatch(connectSocket());
      });

      socket.on('msgToRoom', (data, con) => {
        dispatch(newMessage(data));
        dispatch(updateLatestMessage(con));
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
                <div className="app">
                  <Sidebar onToggle={setIsOpen} />
                  <Chat />
                  <Details isOpen={isOpen} onToggle={setIsOpen} />
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
