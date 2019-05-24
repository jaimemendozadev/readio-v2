import React from 'react';
import CustomMutation from '../../Components/CustomMutation.jsx';
import {
  UPDATE_PLAYLIST,
  DELETE_PLAYLIST,
  GET_USER_INFO,
} from '../../Apollo/API/graphql/index.js';

const UpdateContainer = ({children}) => (
  <CustomMutation
    mutation={UPDATE_PLAYLIST}
    refetchQueries={() => [{query: GET_USER_INFO}]}
  >
    {updatePlaylistMutation => (
      <CustomMutation
        mutation={DELETE_PLAYLIST}
        refetchQueries={() => [{query: GET_USER_INFO}]}
      >
        {deletePlaylistMutation => {
          const mutationsProp = {
            delete: deletePlaylistMutation,
            update: updatePlaylistMutation,
          };

          // const serverResponses = {
          //   delete: deleteServerResponse,
          //   update: updateServerResponse,
          // };
          return children(mutationsProp);
        }}
      </CustomMutation>
    )}
  </CustomMutation>
);

export default UpdateContainer;
