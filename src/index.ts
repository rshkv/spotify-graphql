import * as express from "express";
import * as graphqlHTTP from "express-graphql";
import schema from "./schema";

const PORT = 4000;
const app = express();

app.use("/graphql", graphqlHTTP({
    graphiql: true,
    schema,
}));

app.listen(PORT, () => {
    // tslint:disable-next-line no-console
    console.log(`Spotify GraphQL server running on port ${PORT}.`);
});
