export const schema = `
    type ExternalUrl {
        spotify: String
    }

    type ExternalId {
        isrc: String
        ean: String
        upc: String
    }

    type Followers {
        href: String
        total: Int
    }

    type Image {
        height: Int
        url: String!
        width: Int
    }

    type SearchResult {
        albums: [AlbumSimplified]!
        artists: [ArtistFull]!
        playlists: [PlaylistSimplified]!
        tracks: [TrackFull]!
    }

    enum SearchType {
        album
        artist
        playlist
        track
    }
`;
