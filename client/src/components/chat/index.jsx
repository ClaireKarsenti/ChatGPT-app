import {
  useMultiChatLogic,
  MultiChatSocket,
  MultiChatWindow,
} from 'react-chat-engine-advanced';
import Header from '../customHeader/index';
import StandardMessageForm from '../customMessageForms/StandardMessageForm';
import Ai from '../customMessageForms/Ai';

const projectId = import.meta.env.VITE_PROJECT_ID;
const username = 'testuser';
const secret = '1234';

const Chat = () => {
  const chatProps = useMultiChatLogic(projectId, username, secret);

  return (
    <div style={{ flexBasis: '100%' }}>
      <MultiChatSocket {...chatProps} />
      <MultiChatWindow
        {...chatProps}
        style={{ height: '100vh' }}
        renderChatHeader={(chat) => <Header chat={chat} />}
        renderMessageForm={(props) => {
          if (chatProps.chat?.title.startsWith('AiChat_')) {
            return <Ai props={props} activeChat={chatProps.chat} />;
          }
          return (
            <StandardMessageForm props={props} activeChat={chatProps.chat} />
          );
        }}
      />
    </div>
  );
};

export default Chat;
