export const schema = `
    type ArtistSimplified {
        external_urls: ExternalUrl!
        href: String
        id: String
        name: String!
        type: String!
        uri: String
    }

    type ArtistFull {
        external_urls: ExternalUrl!
        followers: Followers
        genres: [String!]!
        href: String!
        id: String!
        images: [Image!]!
        name: String!
        popularity: Int!
        type: String!
        uri: String!
    }
`;
