import {
  PaperAirplaneIcon,
  PaperClipIcon,
  XMarkIcon,
} from '@heroicons/react/24/solid';
import { useState, ChangeEvent } from 'react';
import Dropzone, { FileWithPath, DropzoneState } from 'react-dropzone';

export type StandardMessageFormProps = {
  props: {
    username: string;
    onSubmit: (form: MessageForm) => void;
  };
  activeChat: {
    id: string;
  };
};

type Attachment = {
  blob: File | null;
  file: string | null;
};

type MessageForm = {
  attachments: Attachment[];
  created: string;
  sender_username: string;
  text: string;
  activeChatId: string;
};

const StandardMessageForm = ({
  props,
  activeChat,
}: StandardMessageFormProps) => {
  const [message, setMessage] = useState('');
  const [attachment, setAttachment] = useState<Attachment>({
    blob: null,
    file: null,
  });
  const [preview, setPreview] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async () => {
    const date = new Date()
      .toISOString()
      .replace('T', ' ')
      .replace('Z', `${Math.floor(Math.random() * 1000)}+00:00`);
    const attachments = attachment.blob
      ? [{ blob: attachment.blob, file: attachment.file }]
      : [];
    const form: MessageForm = {
      attachments,
      created: date,
      sender_username: props.username,
      text: message,
      activeChatId: activeChat.id,
    };

    props.onSubmit(form);
    setMessage('');
    setAttachment({ blob: null, file: null });
  };

  return (
    <div className="message-form-container">
      {preview && (
        <div className="message-form-preview">
          <img
            className="message-form-preview-image"
            src={preview}
            alt="message-form-preview-image"
            onLoad={() => URL.revokeObjectURL(preview)}
          />
          <XMarkIcon
            className="message-form-icon-x"
            onClick={() => {
              setPreview('');
              setAttachment({ blob: null, file: null });
            }}
          />
        </div>
      )}
      <div className="message-form">
        <div className="message-form-input-container">
          <input
            className="message-form-input"
            type="text"
            value={message}
            onChange={handleChange}
            placeholder="Send a message..."
          />
        </div>
        <div className="message-form-icons">
          <Dropzone
            acceptedFiles=".jpg, .jpeg,.png"
            multiple={false}
            noClick={true}
            onDrop={(acceptedFiles: FileWithPath[]) => {
              const file = acceptedFiles[0];
              setAttachment({ blob: file, file: file.name });
              setPreview(URL.createObjectURL(file));
            }}
          >
            {({ getRootProps, getInputProps, open }: DropzoneState) => (
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <PaperClipIcon
                  className="message-form-icon-clip"
                  onClick={open}
                />
              </div>
            )}
          </Dropzone>
          <hr className="vertical-line" />
          <PaperAirplaneIcon
            className="message-form-icon-airplane"
            onClick={() => {
              setPreview('');
              handleSubmit();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default StandardMessageForm;
