var API_URL = "https://savvy-webbing-422303-r1.uc.r.appspot.com";

function genericPost(subRoute, data, callback) {
  fetch(API_URL + subRoute, {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      callback(data);
    })
    .catch((error) => {
      console.error("Error:", error);
      callback(error);
    });
}

function genericGet(subRoute, callback) {
  fetch(API_URL + subRoute, {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      callback(data);
    })
    .catch((error) => {
      console.error("Error:", error);
      callback(error);
    });
}

export async function getSearchResultsForQuery(search, callback) {
  var subRoute = `/athlete/search?search_query=${search}`;
  return genericGet(subRoute, callback);
}

export async function getRandomDoc(callback) {
  var subRoute = "/athlete/random";
  return genericGet(subRoute, callback);
}

export async function getAthleteById(athlete_id, callback) {
  var subRoute = `/athletes/${athlete_id}`;
  return genericGet(subRoute, callback);
}

export async function loginUser(username, password, callback) {
  var data = {
    username: username,
    password: password,
  };

  var subRoute = "/account/login";

  return genericPost(subRoute, data, callback);
}

export async function createAccount(username, password, callback) {
  var data = {
    username: username,
    password: password,
  };

  var subRoute = "/account/create";

  return genericPost(subRoute, data, callback);
}

export async function createCollection(
  collectionName,
  collectionAthletes,
  callback,
) {
  var data = {
    collection_name: collectionName,
    account_id: localStorage.getItem("account_id"),
    athlete_ids: collectionAthletes,
  };

  var subRoute = "/collections/create";

  return genericPost(subRoute, data, callback);
}

export async function getCollectionsForAccount(callback) {
  var subRoute = `/collections/user?account_id=${localStorage.getItem(
    "account_id",
  )}`;
  return genericGet(subRoute, callback);
}

export async function modifyCollection(
  newName,
  action,
  collectionId,
  athleteId,
  athleteIds,
  callback,
) {
  var data = {
    new_name: newName,
    action: action,
    collection_id: collectionId,
    athlete_id: athleteId,
    athlete_ids: athleteIds,
  };

  var subRoute = "/collections/modify";
  return genericPost(subRoute, data, callback);
}

export async function deleteCollection(collectionId, callback) {
  var data = {
    collection_id: collectionId,
  };

  var subRoute = "/collections/delete";
  return genericPost(subRoute, data, callback);
}

export async function getLetsRunDailySummary(callback) {
  var subRoute = "/letsrun/daily_summary";
  return genericGet(subRoute, callback);
}

export async function compareTwoAthletes(
  athlete_id_1,
  athlete_id_2,
  comparison_distance,
  callback,
) {
  var subRoute = `/athletes/compare?athlete_id_1=${athlete_id_1}&athlete_id_2=${athlete_id_2}&comparison_distance=${comparison_distance}`;
  return genericPost(subRoute, null, callback);
}
