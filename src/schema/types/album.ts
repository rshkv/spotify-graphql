export const schema = `
    type AlbumSimplified {
        album_type: String!
        artists: [ArtistSimplified!]!
        available_markets: [String!]!
        external_urls: ExternalUrl!
        href: String!
        id: String!
        images: [Image!]!
        name: String!
        type: String!
        uri: String!
    }
`;
