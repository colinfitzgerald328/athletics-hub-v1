const API_URL = "https://athletics-hub-engine-production.up.railway.app";

import createClient from "openapi-fetch";
import type { paths } from "@/src/lib/api/v1";
import { components } from "@/src/lib/api/v1";

type CreateCollectionPayload = components['schemas']['CreateCollectionPayload'];
type CreateAccountPayload = components['schemas']['CreateAccountPayload']
type LoginPayload = components['schemas']['LoginPayload']
type ModifyCollectionPayload = components['schemas']['ModifyCollectionPayload']


const client = createClient<paths>({ baseUrl: API_URL });


export async function getSearchResultsForQuery(search: string) {
  console.log("search, ", search)
  return await client.GET("/athlete/search", {
    params: {
      query: {
          search_query: search
      }
  }
  })
}

export async function getRandomDoc() {
  return await client.GET("/athlete/random", {
    params: {},
  });
}

export async function getAthleteById(athlete_id: number) {
  return await client.GET("/athletes/{athlete_id}", {
    params: {
      path: {
        athlete_id: athlete_id
      }
    },
  });
}

export async function loginUser(payload: LoginPayload) {
  return await client.POST("/account/login", {
    params: {}, 
    body: payload
  })
}

export async function createAccount(payload: CreateAccountPayload) {
  return await client.POST("/account/create", {
    params: {}, 
    body: payload 
  });
}


export async function createCollection(
  payload: CreateCollectionPayload
) {
  return await client.POST("/collections/create", {
    params: {}, 
    body: payload
  })
} 



export async function getCollectionsForAccount(account_id: number) {
  return await client.GET("/collections/user", {
    params: {
      query: {
        account_id: account_id
      }
    }
  })
}

export async function modifyCollection(payload: ModifyCollectionPayload
) {
  return await client.POST("/collections/modify", 
  {
    params: {}, 
    body: payload
  })
 }

export async function deleteCollection(collection_id: number) {
  return await client.POST("/collections/delete", 
  {
    params: {}, 
    body: {
      collection_id: collection_id
    }
  })
}

export async function getLetsRunDailySummary() {
  return await client.GET("/letsrun/daily_summary", {
    params: {}
  })
}

export async function compareTwoAthletes(athlete_id_1: number, athlete_id_2: number, comparison_distance: number | string) {
  return await client.POST("/athletes/compare", {
    params: {
      query: {
        athlete_id_1: athlete_id_1, 
        athlete_id_2: athlete_id_2, 
        comparison_distance: comparison_distance
      }
    }
  })
}

