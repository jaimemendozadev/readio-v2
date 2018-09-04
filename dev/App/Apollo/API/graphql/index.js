import { gql } from "apollo-boost";

export const ADD_TO_SONG_LIST = gql`
  mutation AddToSongList($songToAdd: CreateSong!) {
    addToSongList(songToAdd: $songToAdd) @client {
      id_user_id_identifier
      title
      permalink_url
      artwork_url
    }
  }
`;

export const DELETE_FROM_SONG_LIST = gql`
  mutation DeleteFromSongList($songID: String!) {
    deleteFromSongList(songID: $songID) @client {
      id_user_id_identifier
      title
      permalink_url
      artwork_url
    }
  }
`;

export const DELETE_PLAYLIST = gql`
  mutation DeletePlaylist($playlistID: ID!, $userID: ID!) {
    deletePlaylist(playlistID: $playlistID, userID: $userID) {
      error
      message
    }
  }
`;


export const GET_CURRENT_SONG = gql`
  query CurrentlyPlaying {
    currentlyPlaying @client {
      __typename
      currentSong
      stack
      playlistStack
      storedPlaylist
      userSelectedPlaylist
      playing
    }
  }
`;


export const GET_CURRENTLY_PLAYING_SONG = gql`
  query GetCurrentlyPlayingSong {
    currentlyPlaying @client {
      currentSong
      stack
      playlistStack
      storedPlaylist
      userSelectedPlaylist
      playing
    }
  }
`;

export const GET_LOCAL_USER_INFO = gql`
  query GetLocalUserInfo {
    currentUser @client {
      id
      first_name
      last_name
      email
      playlists
    }
  }
`;


export const GET_SONG_LIST = gql`
  query getSongList {
    songList @client {
      __typename
      name
      list
    }
  }
`;


export const GET_STORED_PLAYLIST = gql`
  query GetStoredPlaylist {
    currentlyPlaying @client {
      storedPlaylist
    }
  }
`;


export const GET_USER_ID = gql`
  query getCurrentUser {
    currentUser @client {
      __typename
      id
    }
  }
`;


export const GET_USER_INFO = gql`
  query getUserInfo {
    getUser {
      id
      first_name
      last_name
      email
      playlists {
        id
        name
        songs {
          id_user_id_identifier
          title
          permalink_url
          artwork_url
        }
      }
    }
  }
`;


export const LOAD_PLAYLIST_IN_CACHE = gql`
  mutation($playlistArg: LoadPlaylist!) {
    loadPlaylistInCache(playlistArg: $playlistArg) @client
  }
`;


export const LOAD_SONG_IN_PLAYER = gql`
  mutation LoadSongInPlayer($songArg: UrlInput!) {
    loadSongInPlayer(songArg: $songArg) @client {
      __typename
      currentSong
      playing
    }
  }
`;

export const SAVE_SONGLIST_TO_DB = gql`
  mutation SaveSonglistToDB($userID: ID!, $input: CreatePlaylist!) {
    createPlaylist(userID: $userID, input: $input) {
      error
      message
    }
  }
`;

export const SAVE_USER_IN_CACHE = gql`
  query getCurrentUser {
    currentUser @client {
      __typename
      id
      first_name
      last_name
      email
      playlists
    }
  }
`;


export const SEARCH_SOUND_CLOUD = gql`
  mutation SearchSoundCloud($searchTerm: String!) {
    searchSoundCloud(searchTerm: $searchTerm) {
      id_user_id_identifier
      title
      permalink_url
      artwork_url
    }
  }
`;

export const UPDATE_PLAYLIST = gql`
  mutation UpdatePlaylist($playlistID: ID!, $updatedList: UpdatePlaylist!) {
    updatePlaylist(playlistID: $playlistID, updatedList: $updatedList) {
      error
      message
    }
  }
`;
