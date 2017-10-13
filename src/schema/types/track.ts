export const schema = `
    type TrackFull {
        album: AlbumSimplified!
        artists: [ArtistSimplified!]!
        available_markets: [String!]!
        disc_number: Int!
        duration_ms: Int!
        explicit: Boolean!
        external_ids: ExternalId!
        external_urls: ExternalUrl!
        href: String
        id: String
        is_playable: Boolean
        linked_from: TrackLink
        name: String!
        popularity: Int!
        preview_url: String
        track_number: Int!
        type: String!
        uri: String!
    }

    type TrackLink {
        external_urls: ExternalUrl!
        href: String!
        id: String!
        type: String!
        uri: String!
    }
`;