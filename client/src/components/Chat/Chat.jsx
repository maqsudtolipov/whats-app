import './Chat.scss';
import { RiMore2Line, RiSearch2Line } from 'react-icons/ri';

const Chat = () => {
  return (
    <div className="chat">
      <div className="chat__profile">
        <img
          src="https://xsgames.co/randomusers/assets/avatars/male/23.jpg"
          alt="Chat group"
        />
        <div className="chat__profile-name">Luis Suarez</div>
        <RiSearch2Line />
        <RiMore2Line />
      </div>

      <section className="chat__section">
        <div className="message">
          Both with sisters first very to remodelling logbook due and attempt.
          Dropped him is the come comment a candidates, to pointing problem
          infinity, completely cheerful, help their found I payload them. Is if
          it facilitate live the with writer's she more duckthemed together
          could still skyline.
        </div>
        <div className="message">
          gilded the go so might that mail odd they after recently than be
          around times, by on when that a than game, not gods, at great service,
          semantics, now, interaction way. Her whenever a long be go the this
          while able would desires.
        </div>
        <div className="message message--you">Ok</div>
        <div className="message message--you">See you later ✌️</div>
      </section>
    </div>
  );
};

export default Chat;
