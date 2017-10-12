import * as DataLoader from "dataloader";
import * as _ from "lodash";

function log(o) {
    // tslint:disable-next-line no-console
    console.log(JSON.stringify(o, null, 2));
}

async function paginatePlaylistTracks(api, ownerId, playlistId, offset, limit) {
    const MAX_PAGINATION_LIMIT = 100;
    if (MAX_PAGINATION_LIMIT < limit) {
        const offsets = _.range(offset, offset + limit, MAX_PAGINATION_LIMIT);
        const requests = offsets.map((o) => (
            api.getPlaylistTracks(ownerId, playlistId, {
                limit: MAX_PAGINATION_LIMIT,
                offset: o,
            })
        ));
        const requestResults = await Promise.all(requests);
        return _.flatMap(requestResults, (r) => r.body.items);
    } else {
        return (await api.getPlaylistTracks(ownerId, playlistId, { limit, offset }))
            .body.items;
    }
}

export default {

    PlaylistFull: {

        total_tracks: (root, data, context) => root.tracks.total,

        tracks: async (root, { limit = 100, offset = 0, all = false }, { api }) => {
            if (limit === -1) { limit = root.tracks.total - offset; }

            if (root.tracks.limit < offset + limit) {
                const ownerId = root.owner.id;
                const playlistId = root.id;
                return await paginatePlaylistTracks(api, ownerId, playlistId, offset, limit);
            } else {
                return _.slice(root.tracks.items, offset, offset + limit);
            }
        },

    },

    Query: {

        artist: async (root, { id }, { artistLoader }: { artistLoader: DataLoader<string, any> }) => (
            await artistLoader.load(id)
        ),

        artists: async (root, { ids }, { artistLoader }: { artistLoader: DataLoader<string, any> }) => (
            await artistLoader.loadMany(ids)
        ),

        playlist: async (root, { user_id, playlist_id }, { api }) => {
            return (await api.getPlaylist(user_id, playlist_id)).body;
        },

        search: async (root, { q, type }, { api }) => {
            const searchResponse = await api.search(q, type, { limit: 1 });
            const items = _.mapValues(searchResponse.body, (v) => v.items);
            return {
                albums: [], artists: [], playlists: [], tracks: [],
                ...items,
            };
        },

    },

};
