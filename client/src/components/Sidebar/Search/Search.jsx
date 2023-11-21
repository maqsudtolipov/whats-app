import axios from '../../../api/axios.js';
import './Search.scss';
import { useState } from 'react';
import { RiCloseCircleLine, RiSearch2Line } from 'react-icons/ri';
import { addNewConversationToUser } from '../../../store/reducers/user.js';
import { useDispatch, useSelector } from 'react-redux';

const Search = ({ onJoinConversation }) => {
  const [users, setUsers] = useState();

  const { data: user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleSearch = async (e) => {
    e.preventDefault();

    const res = await axios.get(`/users?name=${e.target[0].value}`);
    setUsers(res.data.data);
  };

  const handleCreateConversation = async (id) => {
    const res = await axios.post('/conversations', {
      users: [user.id, id],
    });

    onJoinConversation(res.data.data.id);
    dispatch(addNewConversationToUser(res.data.data));
  };

  return (
    <div>
      <div className="search">
        <form onSubmit={handleSearch}>
          <input type="text" placeholder="Search" />
          <RiCloseCircleLine
            onClick={() => {
              setUsers(null);
            }}
          />
          <RiSearch2Line />
        </form>
      </div>

      <ul className="search__users">
        {users?.length >= 1 &&
          users.map((user) => (
            <li
              key={user.id}
              className="search__user"
              onClick={() => handleCreateConversation(user.id)}
            >
              <img src={user.img} />
              <span>{user.name}</span>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Search;
