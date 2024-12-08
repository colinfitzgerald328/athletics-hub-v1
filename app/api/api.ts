const API_URL = "http://127.0.0.1:8000";

import createClient from "openapi-fetch";
import type { paths } from "@/src/lib/api/v1";

// This is the client for the athletics-hub-engine API.  It is an
// automatically generated client that uses the openapi-fetch library.
const client = createClient<paths>({ baseUrl: API_URL });

export async function getSearchResultsForQuery(search: string) {
  console.log("search, ", search);
  return await client.GET("/athlete/search", {
    params: {
      query: {
        search_query: search,
      },
    },
  });
}

export async function getRandomDoc() {
  return await client.GET("/athlete/random");
}

export async function getAthleteById(athlete_id: number) {
  return await client.GET("/athletes/{athlete_id}", {
    params: {
      path: {
        athlete_id: athlete_id,
      },
    },
  });
}

export async function getLetsRunDailySummary() {
  return await client.GET("/letsrun/daily_summary");
}



type LoginRequestBody = FormData & {
  username: string;
  password: string;
  scope: string;
  grant_type?: string;
  client_id?: string;
  client_secret?: string;
};

export async function loginUser({ username, password }: { username: string; password: string }) {
  const formData = new FormData();

  formData.append("username", username);
  formData.append("password", password);
  formData.append("grant_type", "password");
  formData.append("scope", "read");
  formData.append("client_id", "client_id");
  formData.append("client_secret", "client_secret");

  const body: LoginRequestBody = formData;

  return await client.POST("/login", { body: body });
}



