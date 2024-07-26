const API_URL = "https://savvy-webbing-422303-r1.uc.r.appspot.com";

import createClient from "openapi-fetch";
import type { paths } from "@/src/lib/api/v1";
import { components } from "@/src/lib/api/v1";

type CreateCollectionPayload = components['schemas']['CreateCollectionPayload'];
type CreateAccountPayload = components['schemas']['CreateAccountPayload']
type LoginPayload = components['schemas']['LoginPayload']


const client = createClient<paths>({ baseUrl: API_URL });



export async function getSearchResultsForQuery(search: string) {
  const { data, error } = await client.GET("/athlete/search", {
    params: {
      query: { search_query: search },
    },
  });

  if (error) {
    return error
  } 
  return data
}

export async function getRandomDoc() {
  const { data, error } = await client.GET("/athlete/random", {
    params: {
    },
  });

  if (error) {
    return error
  } 
  return data
}

export async function getAthleteById(athlete_id: number) {
  const { data, error } = await client.GET("/athletes/{athlete_id}", {
    params: {
      path: {
        athlete_id: athlete_id
      }
    },
  });

  if (error) {
    return error
  } 

  return data 

}

export async function loginUser(payload: LoginPayload) {
  const { data, error } = await client.POST("/account/login", {
    params: {}, 
    body: payload
  })

  if (error) {
    return error
  } 

  return data 

}

export async function createAccount(body: CreateAccountPayload) {
  const { data, error } = await client.POST("/account/create", {
    params: {}, 
    body: body // Remove the extra nested "body" key
  });

  if (error) {
    return error;
  } 

  return data;
}


export async function createCollection(
  payload: CreateCollectionPayload
) {
  const { data, error } = await client.POST("/collections/create", {
    params: {}, 
    body: payload
  })

  if (error) {
    return error
  }

  return data 

} 



export async function getCollectionsForAccount() {
  const subRoute = `/collections/user?account_id=${localStorage.getItem(
    "account_id"
  )}`;
  return genericGet(subRoute);
}

export async function modifyCollection(
  newName,
  action,
  collectionId,
  athleteId,
  athleteIds,
) {
  const data = {
    new_name: newName,
    action: action,
    collection_id: collectionId,
    athlete_id: athleteId,
    athlete_ids: athleteIds
  };

  const subRoute = "/collections/modify";
  return genericPost(subRoute, data);
}

export async function deleteCollection(collectionId) {
  const data = {
    collection_id: collectionId
  };

  const subRoute = "/collections/delete";
  return genericPost(subRoute, data);
}

export async function getLetsRunDailySummary() {
  const subRoute = "/letsrun/daily_summary";
  return genericGet(subRoute);
}

export async function compareTwoAthletes(
  athlete_id_1,
  athlete_id_2,
  comparison_distance,
) {
  const subRoute = `/athletes/compare?athlete_id_1=${athlete_id_1}&athlete_id_2=${athlete_id_2}&comparison_distance=${comparison_distance}`;
  return genericPost(subRoute, null);
}
