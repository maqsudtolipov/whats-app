import './App.scss';
import Sidebar from './components/Sidebar/Sidebar.jsx';
import Chat from './components/Chat/Chat.jsx';
import Details from './components/Details/Details.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login.jsx';
import Signup from './components/Auth/Signup.jsx';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { isLoggedIn } from './store/thunks/user.js';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(isLoggedIn());
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className="app">
              <Sidebar />
              <Chat />
              <Details />
            </div>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
