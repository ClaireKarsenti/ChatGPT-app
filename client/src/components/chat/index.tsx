import {
  useMultiChatLogic,
  MultiChatSocket,
  MultiChatWindow,
} from 'react-chat-engine-advanced';
import Header from '@/components/customHeader';

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
      />
    </div>
  );
};

export default Chat;
