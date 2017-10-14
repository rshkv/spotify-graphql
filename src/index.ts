import * as express from "express";
import * as graphqlHTTP from "express-graphql";
import * as SpotifyWebApi from "spotify-web-api-node";
import { clientId, clientSecret } from "./apiConfig";
import authorizeApi from "./authorize";
import buildLoaders from "./dataloaders";
import schema from "./schema";

const PORT = 4000;
const app = express();
const api = new SpotifyWebApi();

const startServer = async () => {
    // Retrieve and set access token
    await authorizeApi(api);

    // Setup graphql handler
    app.use("/graphql", graphqlHTTP({
        context: { api, ...buildLoaders(api) },
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
