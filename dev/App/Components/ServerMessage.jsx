import React from 'react';

const ServerMessage = ({message}) => {
  if (message) {
    return <div className="error-msg">{message}</div>;
  }

  return null;
};

export default ServerMessage;
