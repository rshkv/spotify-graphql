import { makeExecutableSchema } from "graphql-tools";
import resolvers from "./resolvers";

const typeDefs = `
	type Query {
		search(q: String!, type: [SearchType!]): SearchResult!
		artist(id: ID!): ArtistFull!
		artists(ids: [ID!]!): [ArtistFull]!
		playlist(user_id: ID!, playlist_id: ID!): PlaylistFull!
	}

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

	type UserPublic {
		display_name: String!
		external_urls: ExternalUrl!
		href: String!
		id: String!
		type: String!
		uri: String!
	}

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
		tracks(limit: Int, offset: Int): [PlaylistTrack!]!
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

export default makeExecutableSchema({ typeDefs, resolvers });
