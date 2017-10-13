import { makeExecutableSchema } from "graphql-tools";
// import resolvers from "./resolvers";
import { schema as album } from "./types/album";
import { schema as artist } from "./types/artist";
import { resolvers as playlistResolvers, schema as playlist } from "./types/playlist";
import { resolvers as rootResolvers, schema as root } from "./types/root";
import { schema as track } from "./types/track";
import { schema as user } from "./types/user";
import { schema as util } from "./types/util";

const typeDefs = [root, album, artist, playlist, track, user, util];
const resolvers = { ...rootResolvers, ...playlistResolvers };
export default makeExecutableSchema({ typeDefs, resolvers });
