import { ChatBubbleLeftRightIcon, PhoneIcon } from '@heroicons/react/24/solid';

export type Chat = {
  title: string;
  description: string;
};

export interface CustomerHeaderProps {
  chat: Chat;
}

const CustomerHeader = ({ chat }: CustomerHeaderProps) => {
  return (
    <div className="chat-header">
      <div className="flexbetween">
        <ChatBubbleLeftRightIcon className="icon-chat" />
        <h3 className="header-text">{chat.title}</h3>
      </div>
      <div className="flexbetween">
        <PhoneIcon className="icon-phone" />
        <p className="header-text">
          {chat.description === '⬅️ ⬅️ ⬅️'
            ? 'No chat selected'
            : `${chat.description}`}
        </p>
      </div>
    </div>
  );
};

export default CustomerHeader;
