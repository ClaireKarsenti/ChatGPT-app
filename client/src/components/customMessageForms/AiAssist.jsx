import { usePostAiAssistMutation } from '@/state/api';
import { useEffect, useState } from 'react';
import MessageFormUI from './MessageFormUI';
import { createFormWithDate } from './helper/customMessageFormsHelper';

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

const AiAssist = ({ props, activeChat }) => {
  const [message, setMessage] = useState('');
  const [attachment, setAttachment] = useState('');
  const [triggerAssist, resultAssist] = usePostAiAssistMutation();
  const [appendText, setAppendText] = useState('');

  const handleChange = (e) => setMessage(e.target.value);

  const handleSubmit = async () => {
    const form = createFormWithDate(attachment, props, message, activeChat);

    props.onSubmit(form);
    setMessage('');
    setAttachment('');
  };

  const debouncedValue = useDebounce(message, 1000);

  useEffect(() => {
    if (debouncedValue) {
      // This make an api call only if there is a debouncedValue
      const form = { text: message };
      triggerAssist(form);
    }
  }, [debouncedValue]); // eslint-disable-line

  const handleKeyDown = (e) => {
    // Handle enter and tab
    if (e.keyCode === 9 || e.keyCode === 13) {
      e.preventDefault(); // To make sure that the page doesn't refresh
      setMessage(`${message} ${appendText}`);
    }
    setAppendText('');
  };

  useEffect(() => {
    if (resultAssist.data?.text) {
      setAppendText(resultAssist.data?.text);
    }
  }, [resultAssist]); // eslint-disable-line

  return (
    <MessageFormUI
      setAttachment={setAttachment}
      message={message}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      appendText={appendText}
      handleKeyDown={handleKeyDown}
    />
  );
};

export default AiAssist;
