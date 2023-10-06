import './App.scss'
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import Chat from "./components/Chat/Chat.jsx";
import Details from "./components/Details/Details.jsx";

function App() {
  return (
    <div className='app'>
      <Sidebar />
      <Chat />
      <Details />
    </div>
  )
}

export default App
