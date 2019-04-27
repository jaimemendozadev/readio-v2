import React from 'react';
import ErrorMessage from './ErrorMessage.jsx';

const ServerMessage = ({message}) => {
  if (message) {
    return <ErrorMessage errorMessage={message} />;
  }

  return null;
};

export default ServerMessage;
