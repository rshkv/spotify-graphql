
import * as rp from "request-promise";
import { clientId, clientSecret } from "./apiConfig";

export default function authorizeApi(api) {
    const authorizeString = new Buffer(`${clientId}:${clientSecret}`).toString("base64");
    const options = {
        form: { grant_type: "client_credentials" },
        headers: { Authorization: `Basic ${authorizeString}` },
        json: true,
        uri: "https://accounts.spotify.com/api/token",
    };

    return rp.post(options)
        .then((body) => {
            api.setAccessToken(body.access_token);
        });
}
