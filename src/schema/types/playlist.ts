import * as _ from "lodash";

export const schema = `
    type PlaylistFull {
        collaborative: Boolean!
        description: String
        external_urls: ExternalUrl!
        followers: Followers!
        href: String!
        id: String!
        images: [Image!]!
        name: String!
        owner: UserPublic!
        public: Boolean
        snapshot_id: String!
        tracks(limit: Int = 100, offset: Int = 0): [PlaylistTrack!]!
        # Total number of tracks in playlist.
        total_tracks: Int
        type: String!
        uri: String!
    }

    type PlaylistSimplified {
        collaborative: Boolean!
        external_urls: ExternalUrl!
        href: String!
        id: String!
        images: [Image!]!
        name: String!
        owner: UserPublic!
        public: Boolean
        snapshot_id: String!
        tracks(limit: Int, offset: Int): [PlaylistTrack!]!
        type: String!
        uri: String!
    }

    type PlaylistTrack {
        added_at: String
        added_by: UserPublic
        is_local: Boolean!
        track: TrackFull!
    }
`;

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

export const resolvers = {

    PlaylistFull: {

        total_tracks: (obj, args, context) => obj.tracks.total,

        tracks: async (obj, { limit, offset }, { api }) => {
            if (limit === -1) { limit = obj.tracks.total - offset; }

            if (obj.tracks.limit < offset + limit) {
                const ownerId = obj.owner.id;
                const playlistId = obj.id;
                return await paginatePlaylistTracks(api, ownerId, playlistId, offset, limit);
            } else {
                return _.slice(obj.tracks.items, offset, offset + limit);
            }
        },

    },

};
