import { omitBy, isNil } from "lodash";
import URL from "url";
import * as SecureStore from "expo-secure-store";

export default async ({ url, method, query, body }) => {

  let token = await SecureStore.getItemAsync("accessToken");
  const URL1 = "https://us-central1-kslstaging.cloudfunctions.net/api/v1" + url;
  const response = await fetch(
    `${URL1}${URL.format({ query })}`,
    omitBy(
      {
        method: method || (body ? "POST" : "GET"),
        headers: omitBy(
          {
            "Content-Type": "application/json; charset=utf-8",
            accessToken: token,
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
