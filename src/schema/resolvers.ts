import * as _ from "lodash";

function log(o) {
    // tslint:disable-next-line no-console
    console.log(JSON.stringify(o, null, 2));
}

export default {

    PlaylistFull: {
        tracks: async (root, { limit = 100, offset = 0 }, { spotifyApi }) => {
            if (offset + limit > 100) {
                return (await spotifyApi.getPlaylistTracks(root.owner.id, root.id, { limit, offset }))
                    .body.items;
            }
            return _.slice(root.tracks.items, offset, offset + limit);
        },
    },

    Query: {

        artist: async (root, { id }, { spotifyApi }) => {
            return (await spotifyApi.getArtist(id)).body;
        },

        playlist: async (root, { user_id, playlist_id }, { spotifyApi }) => {
            const res = (await spotifyApi.getPlaylist(user_id, playlist_id)).body;
            return res;
        },

        search: async (root, { q, type }, { spotifyApi }) => {
            const searchResponse = await spotifyApi.search(q, type, { limit: 1 });
            const items = _.mapValues(searchResponse.body, (v) => v.items);
            const searchResult = {
                albums: [], artists: [], playlists: [], tracks: [],
                ...items,
            };
            return ["this", "is", "a", "test"];
        },

    },

};
