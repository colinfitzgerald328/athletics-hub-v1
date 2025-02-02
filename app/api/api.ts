const API_URL = "https://athletics-hub-engine-production.up.railway.app";
import createClient from "openapi-fetch";
import type { paths } from "@/src/lib/api/v1";
import mixpanel from "mixpanel-browser";

// This is the client for the athletics-hub-engine API.  It is an
// automatically generated client that uses the openapi-fetch library.
const client = createClient<paths>({ baseUrl: API_URL });

export async function getSearchResultsForQuery(search: string) {
  mixpanel.track('search for athletes', { query: search });
  return await client.GET("/athlete/search", {
    params: {
      query: {
        search_query: search,
      },
    },
  });
}

export async function getRandomDoc() {
  mixpanel.track('get random athlete');
  return await client.GET("/athlete/random");
}

export async function getAthleteById(athlete_id: number) {
  mixpanel.track('get athlete by id', { id: athlete_id });
  return await client.GET("/athletes/{athlete_id}", {
    params: {
      path: {
        athlete_id: athlete_id,
      },
    },
  });
}

export async function getLetsRunSummaryParts() {
  mixpanel.track('get letsrun summary');
  return await client.GET("/get_letsrun_summary");
}
