export function createFormWithDate(attachment, props, message, activeChat) {
  const date = new Date()
    .toISOString()
    .replace('T', ' ')
    .replace('Z', `${Math.floor(Math.random() * 1000)}+00:00`);
  const at = attachment ? [{ blob: attachment, file: attachment.name }] : [];
  const form = {
    attachments: at,
    created: date,
    sender_username: props.username,
    text: message,
    activeChatId: activeChat.id,
  };
  return form;
}
