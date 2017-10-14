import { expect } from "chai";
import { graphql } from "graphql";
import "mocha";
import * as SpotifyWebApi from "spotify-web-api-node";
import authorizeApi from "../src/authorize";
import buildLoaders from "../src/dataloaders";
import schema from "../src/schema";
import { playlistQuery, playlistResult, playlistTracksQuery } from "./queries/playlist";

function log(obj) {
    /* tslint:disable no-console */
    console.log(JSON.stringify(obj, null, 2));
}

const api = new SpotifyWebApi();

const context = { api, ...buildLoaders(api) };

const execute = async (query) => await graphql(schema, query, {}, context);

describe("Playlist", () => {

    before(async () => {
        // Retrieve and set access token
        await authorizeApi(api);
    });

    it("should return expected properties", async () => {
        const result = await execute(playlistQuery);
        expect(result).to.deep.equal(playlistResult);
    });

    it("should return contained tracks", async () => {
        const result = await execute(playlistTracksQuery);
        expect(result.data.playlist.total_tracks).to.equal(200);
        expect(result.data.playlist.tracks).to.have.lengthOf(200);
    });

});
