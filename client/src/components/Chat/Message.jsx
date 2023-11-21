import { RiCheckDoubleLine, RiCheckLine } from 'react-icons/ri';

const Message = ({
  isSticker = false,
  stickerUrl = '',
  content = '',
  isSender = false,
  isSeen = false,
  sentTime = '00:00',
}) => {
  return (
    <div
      className={`message ${isSender && 'message--you'} ${
        isSticker && 'message--sticker'
      }`}
    >
      {isSticker ? <img src={stickerUrl} alt="sticker" /> : content}
      <span className="message__date">
        {sentTime + ' '}
        {isSender && (isSeen ? <RiCheckDoubleLine /> : <RiCheckLine />)}
      </span>
    </div>
  );
};

export default Message;
