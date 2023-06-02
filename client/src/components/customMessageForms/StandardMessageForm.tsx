import { useState, ChangeEvent } from 'react';
import MessageFormUI from './MessageFormUI';

export type StandardMessageFormProps = {
  props: {
    username: string;
    onSubmit: (form: MessageFormType) => void;
  };
  activeChat: {
    id: string;
  };
};

export type MessageFormType = {
  attachments: AttachmentType[];
  created: string;
  sender_username: string;
  text: string;
  activeChatId: string;
};

export type AttachmentType = {
  blob: File | string;
  file: string;
};

const StandardMessageForm = ({
  props,
  activeChat,
}: StandardMessageFormProps) => {
  const [message, setMessage] = useState('');
  const [attachment, setAttachment] = useState<AttachmentType>({
    blob: '',
    file: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setMessage(e.target.value);

  const handleSubmit = async () => {
    const date = new Date()
      .toISOString()
      .replace('T', ' ')
      .replace('Z', `${Math.floor(Math.random() * 1000)}+00:00`);
    const at = attachment.blob
      ? [{ blob: attachment.blob, file: attachment.file }]
      : [];
    const form = {
      attachments: at,
      created: date,
      sender_username: props.username,
      text: message,
      activeChatId: activeChat.id,
    };

    props.onSubmit(form);
    setMessage('');
    setAttachment({ blob: '', file: '' });
  };

  return (
    <MessageFormUI
      setAttachment={setAttachment}
      message={message}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default StandardMessageForm;
