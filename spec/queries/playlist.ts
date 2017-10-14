/* tslint:disable max-line-length */

export const playlistQuery = `
    query {
        playlist(user_id: "1121825855", playlist_id: "3hCbSqdbKmCPlrwI6LdrxZ") {
        collaborative
        description
        external_urls {
            spotify
        }
        followers {
            href
            total
        }
        href
        id
        images {
            width
            height
        }
        name
        owner {
            id
        }
        public
        snapshot_id
        total_tracks
        tracks(limit: 1) {
                track {
            name
            }
        }
        type
        uri
        }
    }
`;

export const playlistResult = JSON.parse(`{"data":{"playlist":{"collaborative":false,"description":"Playlist to test my Spotify API. Don&#x27;t edit.","external_urls":{"spotify":"http://open.spotify.com/user/1121825855/playlist/3hCbSqdbKmCPlrwI6LdrxZ"},"followers":{"href":null,"total":0},"href":"https://api.spotify.com/v1/users/1121825855/playlists/3hCbSqdbKmCPlrwI6LdrxZ","id":"3hCbSqdbKmCPlrwI6LdrxZ","images":[{"width":640,"height":640},{"width":300,"height":300},{"width":60,"height":60}],"name":"API Tests","owner":{"id":"1121825855"},"public":true,"snapshot_id":"UcRr21vrt/PSroZd/UpvfmDZG0cFnKx/K0QEvHBdHjlfRsjUpoxRGt/MILyAihw6","total_tracks":200,"tracks":[{"track":{"name":"Mrs Mr - JackLNDN Remix"}}],"type":"playlist","uri":"spotify:user:1121825855:playlist:3hCbSqdbKmCPlrwI6LdrxZ"}}}`);

export const playlistTracksQuery = `
    query {
        playlist(user_id: "1121825855", playlist_id: "3hCbSqdbKmCPlrwI6LdrxZ") {
        total_tracks
        tracks(limit: -1) {
                track {
            id
            }
        }
        }
    }
`;
