import * as express from "express";
import * as graphqlHTTP from "express-graphql";
import * as SpotifyWebApi from "spotify-web-api-node";
import { clientId, clientSecret } from "./apiConfig";
import schema from "./schema";

const PORT = 4000;
const app = express();
const spotifyApi = new SpotifyWebApi({
    clientId,
    clientSecret,
    redirectUri: `https://localhost:${PORT}/login`,
});

const startServer = async () => {
    // Retrieve and set access token
    const accessToken = (await spotifyApi.clientCredentialsGrant())
        .body
        .access_token;
    spotifyApi.setAccessToken(accessToken);

    // Setup graphql handler
    app.use("/graphql", graphqlHTTP({
        context: { spotifyApi },
        graphiql: true,
        schema,
    }));

    app.listen(PORT, () => {
        // tslint:disable-next-line no-console
        console.log(`Spotify GraphQL server running on port ${PORT}.`);
    });
};

startServer().catch((e) => {
    // tslint:disable-next-line no-console
    console.error(e);
});
