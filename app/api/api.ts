const API_URL = "https://savvy-webbing-422303-r1.uc.r.appspot.com";

import createClient from "openapi-fetch";
import type { paths } from "@/src/lib/api/v1";
import { components } from "@/src/lib/api/v1";

type CreateCollectionPayload = components['schemas']['CreateCollectionPayload'];
type CreateAccountPayload = components['schemas']['CreateAccountPayload']
type LoginPayload = components['schemas']['LoginPayload']
type ModifyCollectionPayload = components['schemas']['ModifyCollectionPayload']


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

export async function createAccount(payload: CreateAccountPayload) {
  const { data, error } = await client.POST("/account/create", {
    params: {}, 
    body: payload 
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



export async function getCollectionsForAccount(account_id: number) {
  const { data, error } = await client.GET("/collections/user", {
    params: {
      query: {
        account_id: account_id
      }
    }
  })

  if (error) {
    return error
  }
  return data 
}

export async function modifyCollection(payload: ModifyCollectionPayload
) {
  const { data, error } = await client.POST("/collections/modify", 
  {
    params: {}, 
    body: payload
  })

  if (error) {
    return error
  }

  return data 
}

export async function deleteCollection(collection_id: number) {
  const { data, error } = await client.POST("/collections/delete", 
  {
    params: {}, 
    body: {
      collection_id: collection_id
    }
  })

  if (error) {
    return error
  }

  return data 

}

export async function getLetsRunDailySummary() {
  const { data, error } = await client.GET("/letsrun/daily_summary", {
    params: {}
  })

  if (error) {
    return error
  }

  return data 

}

export async function compareTwoAthletes(athlete_id_1: number, athlete_id_2: number, comparison_distance: number | string) {
  const { data, error } = await client.POST("/athletes/compare", {
    params: {
      query: {
        athlete_id_1: athlete_id_1, 
        athlete_id_2: athlete_id_2, 
        comparison_distance: comparison_distance
      }
    }
  })
  
  if (error) {
    return error
  }

  return data 
}

