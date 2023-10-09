import './App.scss';
import Sidebar from './components/Sidebar/Sidebar.jsx';
import Chat from './components/Chat/Chat.jsx';
import Details from './components/Details/Details.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login.jsx';

function App() {
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
