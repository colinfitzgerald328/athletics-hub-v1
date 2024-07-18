const API_URL = "https://savvy-webbing-422303-r1.uc.r.appspot.com";

export async function genericPost(subRoute, data) {
  try {
    const response = await fetch(API_URL + subRoute, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    return await response.json();
  }
  catch (error) {
    console.log(error);
    throw new Error(error)
  }
}

export async function genericGet(subRoute) {
  try {
    const response = await fetch(API_URL + subRoute, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    })
    return await response.json();
  } catch (error) {
    console.log(error);
    throw new Error(error)
  }
}

export async function getSearchResultsForQuery(search) {
  const subRoute = `/athlete/search?search_query=${search}`;
  return genericGet(subRoute);
}

export async function getRandomDoc() {
  const subRoute = "/athlete/random";
  return genericGet(subRoute);
}

export async function getAthleteById(athlete_id) {
  const subRoute = `/athletes/${athlete_id}`;
  return genericGet(subRoute);
}

export async function loginUser(username, password) {
  const data = {
    username: username,
    password: password
  };

  const subRoute = "/account/login";

  return genericPost(subRoute, data);
}

export async function createAccount(username, password) {
  const data = {
    username: username,
    password: password
  };

  const subRoute = "/account/create";

  return genericPost(subRoute, data);
}

export async function createCollection(
  collectionName,
  collectionAthletes,
) {
  const data = {
    collection_name: collectionName,
    account_id: localStorage.getItem("account_id"),
    athlete_ids: collectionAthletes
  };

  const subRoute = "/collections/create";

  return genericPost(subRoute, data);
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
