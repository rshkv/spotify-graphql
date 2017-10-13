import * as DataLoader from "dataloader";

export default (spotifyApi) => ({

    artistLoader: new DataLoader(
        async (artistIds) => (
            (await spotifyApi.getArtists(artistIds)).body.artists
        ),
    ),

    playlistLoader: new DataLoader(
        async (groupedIds: string[][]) => {
            const playlistRequests = groupedIds.map(([ownerId, playlistId]) => (
                spotifyApi.getPlaylist(ownerId, playlistId)
            ));
            return (await Promise.all(playlistRequests)).map((r) => r.body);
        },
        { cacheKeyFn: ([ownerId, playlistId]: [string, string]) => ownerId + playlistId },
    ),

});
