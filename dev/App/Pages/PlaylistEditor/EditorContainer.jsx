import React from 'react';

const EditorContainer = ({children}) => (
  <div id="top" className="playlist-editor">
    <div className="playlist-editor-header-container">
      <div>
        <h1>Click on a playlist to update or delete it from your account!</h1>
      </div>
    </div>

    {children}
  </div>
);

export default EditorContainer;
