////////  pea ---> create callApi ////////
////////  game ---> connect config (28 - 4 - 64)////////
import { get, omitBy, isNil, sumBy } from "lodash";
import * as SecureStore from "expo-secure-store";
// import Cookies from 'js-cookie' ;
import URL from "url";
import config from "../config";

export default async ({ fullURL, url, method, query, body }) => {

  console.log(
    "FullURL : ",
    `${
      fullURL ||
      `${config.apiHost}${encodeURI(url)}${URL.format({
        query,
      })}`
    }
`
  );
  const response = await fetch(
    `${fullURL || `${config.apiHost}${encodeURI(url)}`}${URL.format({
      query,
    })}`,

    omitBy(
      {
        method: method || (body ? "POST" : "GET"),
        headers: omitBy(
          {
            "Content-Type": "application/json; charset=utf-8",
            // accessToken: token,
          },
          isNil
        ),
        body: body ? JSON.stringify(body) : undefined,
      },
      isNil
    )
  );

  if (response.status === 200) {
    const json = await response.json();
    return Promise.resolve(json);
  } else {
    const json = await response.json();
    return Promise.reject({ statusCode: response.status, reason: json }); // eslint-disable-line
  }
};
