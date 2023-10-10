import './Chat.scss';
import {
  RiAttachment2,
  RiEmotionHappyLine,
  RiMicLine,
  RiMore2Line,
  RiSearch2Line,
  RiSendPlane2Fill,
} from 'react-icons/ri';
import { useSelector } from 'react-redux';

const Chat = () => {
  const { data, messages, partner } = useSelector(
    (state) => state.conversation,
  );
  const user = useSelector((state) => state.user.data);

  return (
    <div className="chat">
      {partner && (
        <div className="chat__profile">
          <img
            // src="https://xsgames.co/randomusers/assets/avatars/male/23.jpg"
            src={partner.img}
            alt="Chat group"
          />
          <div className="chat__profile-name">{partner.name}</div>
          <RiSearch2Line />
          <RiMore2Line />
        </div>
      )}

      <section className="chat__section">
        {/*<div className="message">*/}
        {/*  Both with sisters first very to remodelling logbook due and attempt.*/}
        {/*  Dropped him is the come comment a candidates, to pointing problem*/}
        {/*  infinity, completely cheerful, help their found I payload them. Is if*/}
        {/*  it facilitate live the with writers she more duck themed together*/}
        {/*  could still skyline.*/}
        {/*</div>*/}
        {/*<div className="message message--you">See you later ✌️</div>*/}

        {/* Render messages  */}
        {messages?.length > 0 &&
          messages.map((msg) => (
            <div
              className={`message ${
                msg.sender === user.id ? 'message--you' : ''
              }`}
            >
              {msg.content}
            </div>
          ))}
      </section>

      <form className="chat__form">
        <RiEmotionHappyLine />
        <RiAttachment2 />
        <input className="chat__form-input" placeholder="👋🏻 Say hello" />
        <RiMicLine />
        <RiSendPlane2Fill />
      </form>
    </div>
  );
};

export default Chat;
