import './Sidebar.scss';
import {
  RiAddLine,
  RiChatNewLine,
  RiMore2Line,
  RiSearch2Line,
} from 'react-icons/ri';
import { useSelector } from 'react-redux';

const Sidebar = () => {
  const partners = useSelector((state) => state.user.partners);

  return (
    <div className="sidebar">
      <div className="sidebar__profile">
        <img
          src="https://randomuser.me/api/portraits/men/43.jpg"
          alt="Profile"
        />
        <div className="sidebar__profile-icons">
          <RiChatNewLine />
          <RiMore2Line />
        </div>
      </div>

      <div className="sidebar__search">
        <form>
          <input type="text" value="Maqsud" placeholder="Search" />
          <RiSearch2Line />
        </form>
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
        {partners &&
          partners.map((partner) => (
            <li key={partner.id} className="sidebar__chat">
              <img
                className="sidebar__chat-img"
                src={partner.img}
                alt="User avatar"
              />
              <div className="sidebar__chat-content">
                <div className="sidebar__chat-title">
                  <div className="sidebar__chat-name">{partner.name}</div>
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
        <h2>Fakes</h2>
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
        <li className="sidebar__chat sidebar__chat--active">
          <img
            className="sidebar__chat-img"
            src="https://xsgames.co/randomusers/assets/avatars/female/1.jpg"
            alt="User avatar"
          />
          <div className="sidebar__chat-content">
            <div className="sidebar__chat-title">
              <div className="sidebar__chat-name">Lanell Rhubart</div>
              <div className="sidebar__chat-time">16:53</div>
            </div>
            <div className="sidebar__chat-latest">
              Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore
            </div>
          </div>
        </li>
        <li className="sidebar__chat">
          <img
            className="sidebar__chat-img"
            src="https://xsgames.co/randomusers/assets/avatars/male/2.jpg"
            alt="User avatar"
          />
          <div className="sidebar__chat-content">
            <div className="sidebar__chat-title">
              <div className="sidebar__chat-name">Rodolfo Wydick</div>
              <div className="sidebar__chat-time">16:53</div>
            </div>
            <div className="sidebar__chat-latest">
              Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore
            </div>
          </div>
        </li>
        <li className="sidebar__chat">
          <img
            className="sidebar__chat-img"
            src="https://xsgames.co/randomusers/assets/avatars/female/2.jpg"
            alt="User avatar"
          />
          <div className="sidebar__chat-content">
            <div className="sidebar__chat-title">
              <div className="sidebar__chat-name">Lyndia Oseguera</div>
              <div className="sidebar__chat-time">16:53</div>
            </div>
            <div className="sidebar__chat-latest">
              Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore
            </div>
          </div>
        </li>{' '}
        <li className="sidebar__chat">
          <img
            className="sidebar__chat-img"
            src="https://xsgames.co/randomusers/assets/avatars/male/3.jpg"
            alt="User avatar"
          />
          <div className="sidebar__chat-content">
            <div className="sidebar__chat-title">
              <div className="sidebar__chat-name">Derrick Buzan</div>
              <div className="sidebar__chat-time">16:53</div>
            </div>
            <div className="sidebar__chat-latest">
              Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore
            </div>
          </div>
        </li>
        <li className="sidebar__chat">
          <img
            className="sidebar__chat-img"
            src="https://xsgames.co/randomusers/assets/avatars/female/3.jpg"
            alt="User avatar"
          />
          <div className="sidebar__chat-content">
            <div className="sidebar__chat-title">
              <div className="sidebar__chat-name">Karleen Stepanski</div>
              <div className="sidebar__chat-time">16:53</div>
            </div>
            <div className="sidebar__chat-latest">
              Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore
            </div>
          </div>
        </li>{' '}
        <li className="sidebar__chat">
          <img
            className="sidebar__chat-img"
            src="https://xsgames.co/randomusers/assets/avatars/male/4.jpg"
            alt="User avatar"
          />
          <div className="sidebar__chat-content">
            <div className="sidebar__chat-title">
              <div className="sidebar__chat-name">Stanton Menzer</div>
              <div className="sidebar__chat-time">16:53</div>
            </div>
            <div className="sidebar__chat-latest">
              Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore
            </div>
          </div>
        </li>
        <li className="sidebar__chat">
          <img
            className="sidebar__chat-img"
            src="https://xsgames.co/randomusers/assets/avatars/female/4.jpg"
            alt="User avatar"
          />
          <div className="sidebar__chat-content">
            <div className="sidebar__chat-title">
              <div className="sidebar__chat-name">Ashton Duhl</div>
              <div className="sidebar__chat-time">16:53</div>
            </div>
            <div className="sidebar__chat-latest">
              Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore
            </div>
          </div>
        </li>{' '}
        <li className="sidebar__chat">
          <img
            className="sidebar__chat-img"
            src="https://xsgames.co/randomusers/assets/avatars/male/5.jpg"
            alt="User avatar"
          />
          <div className="sidebar__chat-content">
            <div className="sidebar__chat-title">
              <div className="sidebar__chat-name">Norris Mastrovito</div>
              <div className="sidebar__chat-time">16:53</div>
            </div>
            <div className="sidebar__chat-latest">
              Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore
            </div>
          </div>
        </li>
        <li className="sidebar__chat">
          <img
            className="sidebar__chat-img"
            src="https://xsgames.co/randomusers/assets/avatars/female/5.jpg"
            alt="User avatar"
          />
          <div className="sidebar__chat-content">
            <div className="sidebar__chat-title">
              <div className="sidebar__chat-name">Luba Pennyman</div>
              <div className="sidebar__chat-time">16:53</div>
            </div>
            <div className="sidebar__chat-latest">
              Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
