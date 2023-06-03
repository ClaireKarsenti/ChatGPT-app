import {
  useMultiChatLogic,
  MultiChatSocket,
  MultiChatWindow,
} from 'react-chat-engine-advanced';
import Header from '@/components/customHeader';
import StandardMessageForm from '@/components/customMessageForms/StandardMessageForm';
import Ai from '@/components/customMessageForms/Ai';
import AiCode from '@/components/customMessageForms/AiCode';
import AiAssist from '@/components/customMessageForms/AiAssist';

const projectId = import.meta.env.VITE_PROJECT_ID;
const username = 'testuser';
const secret = '1234';

const Chat = () => {
  const chatProps = useMultiChatLogic(projectId, username, secret);

  const renderMessageForm = (props) => {
    const { chat } = chatProps;

    if (chat) {
      if (chat.title.startsWith('AiChat_')) {
        return <Ai props={props} activeChat={chat} />;
      } else if (chat.title.startsWith('AiCode_')) {
        return <AiCode props={props} activeChat={chat} />;
      } else if (chat.title.startsWith('AiAssist_')) {
        return <AiAssist props={props} activeChat={chat} />;
      }
    }
    return <StandardMessageForm props={props} activeChat={chat} />;
  };

  return (
    <div style={{ flexBasis: '100%' }}>
      <MultiChatSocket {...chatProps} />
      <MultiChatWindow
        {...chatProps}
        style={{ height: '100vh' }}
        renderChatHeader={(chat) => <Header chat={chat} />}
        renderMessageForm={renderMessageForm}
      />
    </div>
  );
};

export default Chat;
