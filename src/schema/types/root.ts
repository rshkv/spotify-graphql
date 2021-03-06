import * as DataLoader from "dataloader";
import * as _ from "lodash";

export const schema = `
    type Query {
        search(q: String!, type: [SearchType!]): SearchResult!
        artist(id: ID!): ArtistFull!
        artists(ids: [ID!]!): [ArtistFull]!
        playlist(user_id: ID!, playlist_id: ID!): PlaylistFull!
    }
`;

export const resolvers = {

    Query: {

        artist: async (obj, { id }, { artistLoader }: { artistLoader: DataLoader<string, any> }) => ( 
            await artistLoader.load(id)
         ),

        artists: async (obj, { ids }, { artistLoader }: { artistLoader: DataLoader<string, any> }) => (
            await artistLoader.loadMany(ids)
        ),

        playlist: async (obj, args, { playlistLoader }: { playlistLoader: DataLoader<string[], any> }) => {
            const { user_id, playlist_id } = args;
            return await playlistLoader.load([user_id, playlist_id]);
        },

        search: async (obj, { q, type }, { api }) => {
            const searchResponse = await api.search(q, type, { limit: 1 });
            const items = _.mapValues(searchResponse.body, (v) => v.items);
            return {
                albums: [], artists: [], playlists: [], tracks: [],
                ...items,
            };
        },

    },

};
