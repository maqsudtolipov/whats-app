import './App.scss';
import Sidebar from './components/Sidebar/Sidebar.jsx';
import Chat from './components/Chat/Chat.jsx';
import Details from './components/Details/Details.jsx';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login.jsx';
import Signup from './components/Auth/Signup.jsx';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isLoggedIn, logOut } from './store/thunks/user.js';
import { socket } from './sockets/socket.js';
import { joinConversation } from './store/reducers/wire.js';

function App() {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(isLoggedIn());
  }, []);

  useEffect(() => {
    // Only connect after user is logged
    if (user.auth) {
      socket.on('connect', () => {
        console.log('Connected');
      });

      socket
        .emitWithAck('joinConversation', {
          cId: '65258626d1c13c1f9bb25d57',
          userId: user.data.id,
        })
        .then((data) => {
          dispatch(joinConversation(data));
        });
    }

    return () => {
      socket.off('connect', () => console.log('Disconnected'));
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
                  <Sidebar />
                  <Chat />
                  <Details />
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
