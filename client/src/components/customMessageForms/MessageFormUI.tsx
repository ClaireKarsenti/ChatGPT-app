import { ChangeEvent, useState } from 'react';
import Dropzone, { FileWithPath, DropzoneState } from 'react-dropzone';
import {
  PaperAirplaneIcon,
  PaperClipIcon,
  XMarkIcon,
} from '@heroicons/react/24/solid';

type MessageFormUIProps = {
  setAttachment: (attachment: File) => void;
  message: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
};

const MessageFormUI = ({
  setAttachment,
  message,
  handleChange,
  handleSubmit,
}: MessageFormUIProps) => {
  const [preview, setPreview] = useState('');

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
              setAttachment({ blob: '', file: '' });
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
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            noClick={true}
            onDrop={(acceptedFiles: FileWithPath[]) => {
              setAttachment(acceptedFiles[0]);
              setPreview(URL.createObjectURL(acceptedFiles[0]));
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

export default MessageFormUI;
