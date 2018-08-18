import React from 'react';

export const defaults = {
    songList: {
      __typename: 'SongList',
      list: []

    },
    currentUser: {
        __typename: 'CurrentUser',
        id: '',
        first_name: '',
        email: '',
        playlists: []
    }
}