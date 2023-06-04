import { usePostAiTextMutation } from '@/state/api';
import { useState } from 'react';
import MessageFormUI from './MessageFormUI';
import { createFormWithDate } from './helper/customMessageFormsHelper';

const Ai = ({ props, activeChat }) => {
  const [message, setMessage] = useState('');
  const [attachment, setAttachment] = useState('');
  const [trigger] = usePostAiTextMutation();

  const handleChange = (e) => setMessage(e.target.value);

  const handleSubmit = async () => {
    const form = createFormWithDate(attachment, props, message, activeChat);

    props.onSubmit(form);
    trigger(form);
    setMessage('');
    setAttachment('');
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

export default Ai;
