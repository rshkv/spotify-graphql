import * as DataLoader from "dataloader";

export default (spotifyApi) => ({
    artistLoader: new DataLoader(
        async (artistIds) => (
            (await spotifyApi.getArtists(artistIds)).body.artists
        ),
    ),
});
