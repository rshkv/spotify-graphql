import * as fs from "fs";
import { request } from "graphql-request";
import * as _ from "lodash";

const query = `
query {
    playlist(user_id: "1121825855", playlist_id: "1AnIj6NZP7GvmQJMC4YCSk") {
      tracks(limit: -1) {
        track {
          artists {
              external_urls {
                  spotify
              }
              href
              id
              name
              type
              uri
          }
        }
      }
    }
  }
`;

request("http://localhost:4000/graphql", query)
  .then((data) => {
      console.log(data.playlist.tracks.length);
      const json = JSON.stringify(data, null, 2);
      fs.writeFile("testData.json", json, "utf8", () => {
          console.log("Wrote data");
      });
  });
