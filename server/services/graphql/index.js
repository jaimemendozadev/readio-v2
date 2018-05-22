const {makeExecutableSchema} = require('graphql-tools');
import merge from 'lodash.merge';

import {userSchema} from './User/user.graphql';
import {userResolvers} from './User/user.resolvers';

import {songSchema} from './Song/song.graphql';
import {songResolvers} from './Song/song.resolvers';

import {playlistSchema} from './Playlist/playlist.graphql';
import {playlistResolvers} from './Playlist/playlist.resolvers';



//we need to tell the server which types represent the root query
//and root mutation types. We call them RootQuery and RootMutation by convention.
const baseSchema = `
  schema {
    query: Query,
    mutation: Mutation
  }
`

const schema = makeExecutableSchema({
  typeDefs: [
    baseSchema,
    userSchema,
    songSchema,
    playlistSchema
  ],
  resolvers: merge(
    {},
    userResolvers,
    songResolvers,
    playlistResolvers
  )
});

export default schema;