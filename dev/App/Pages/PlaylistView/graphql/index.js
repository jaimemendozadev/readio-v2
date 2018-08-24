import { gql } from "apollo-boost";

export const LOAD_PLAYLIST_IN_CACHE = gql`
  mutation LoadPlaylistInCache($playlistArg: LoadPlaylist!) {
    loadPlaylistInCache(playlistArg: $playlistArg) @client
  }
`;
