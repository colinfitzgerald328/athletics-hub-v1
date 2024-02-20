var API_URL = "http://127.0.0.1:8080";

export async function getSearchResultsForQuery(search, callback) {
  var data = {
    search_term: search,
  };

  var url = new URL(API_URL + "/v1/query/results");
  url.search = new URLSearchParams(data).toString();
  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Something went wrong ...");
      }
    })
    .then((data) => {
      callback(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function getRandomDoc(callback) {
  var url = new URL(API_URL + "/v1/query/random");
  url.search = new URLSearchParams().toString();
  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Something went wrong ...");
      }
    })
    .then((data) => {
      callback(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function getTopRecords(callback) {
  var url = new URL(API_URL + "/v1/query/top");
  url.search = new URLSearchParams().toString();
  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Something went wrong ...");
      }
    })
    .then((data) => {
      callback(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function getPBSForAthlete(athlete_code, callback) {
  var data = {
    athlete_id: athlete_code,
  };

  var url = new URL(API_URL + "/athlete/pbs");
  url.search = new URLSearchParams(data).toString();
  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Something went wrong ...");
      }
    })
    .then((data) => {
      callback(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function getAccoladesForAthlete(url_slug, callback) {
  var data = {
    url_slug: url_slug,
  };

  var url = new URL(API_URL + "/athlete/accolades");
  url.search = new URLSearchParams(data).toString();
  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Something went wrong ...");
      }
    })
    .then((data) => {
      callback(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function getAthleteById(athlete_id, callback) {
  var data = {
    athlete_id: athlete_id,
  };

  var url = new URL(API_URL + "/v1/athlete/byId");
  url.search = new URLSearchParams(data).toString();
  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Something went wrong ...");
      }
    })
    .then((data) => {
      callback(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function getSimilarAthletes(athlete_id, callback) {
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      athlete_id: athlete_id,
    }),
  };

  fetch(API_URL + "/athlete/similar", options)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Something went wrong ...");
      }
    })
    .then((data) => {
      callback(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function getTopCompetitors(athlete_id, callback) {
  var data = {
    athlete_id: athlete_id,
  };

  var url = new URL(API_URL + "/v1/athlete/competitors");
  url.search = new URLSearchParams(data).toString();
  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Something went wrong ...");
      }
    })
    .then((data) => {
      callback(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function loginUser(username, password, callback) {
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  };

  fetch(API_URL + "/v1/account/login", options)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Something went wrong ...");
      }
    })
    .then((data) => {
      callback(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function createAccount(username, password, callback) {
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  };

  fetch(API_URL + "/v1/account/create", options)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Something went wrong ...");
      }
    })
    .then((data) => {
      callback(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function createCollection(
  collectionName,
  collectionAthletes,
  callback,
) {
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      collection_name: collectionName,
      collection_athletes: collectionAthletes,
      account_id: parseInt(localStorage.getItem("account_id")),
    }),
  };

  fetch(API_URL + "/v1/collections/insert", options)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Something went wrong ...");
      }
    })
    .then((data) => {
      callback(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function getCollectionsForAccount(callback) {
  var data = {
    account_id: localStorage.getItem("account_id"),
  };

  var url = new URL(API_URL + "/v1/account/collections");
  url.search = new URLSearchParams(data).toString();
  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Something went wrong ...");
      }
    })
    .then((data) => {
      callback(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function addAthletesToCollection(
  collectionId,
  athleteIds,
  callback,
) {
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      collection_id: collectionId,
      athlete_ids: athleteIds,
    }),
  };

  fetch(API_URL + "/v1/collections/update", options)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Something went wrong ...");
      }
    })
    .then((data) => {
      callback(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function deleteAthleteFromCollection(
  collectionId,
  athleteId,
  callback,
) {
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      collection_id: collectionId,
      athlete_id: athleteId,
    }),
  };

  fetch(API_URL + "/v1/collection/athlete/remove", options)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Something went wrong ...");
      }
    })
    .then((data) => {
      callback(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function deleteCollection(collectionId, callback) {
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      collection_id: collectionId,
    }),
  };

  fetch(API_URL + "/v1/collections/delete", options)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Something went wrong ...");
      }
    })
    .then((data) => {
      callback(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function updateCollectionName(collectionId, newName, callback) {
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      collection_id: collectionId,
      new_name: newName,
    }),
  };

  fetch(API_URL + "/v1/collections/name/update", options)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Something went wrong ...");
      }
    })
    .then((data) => {
      callback(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function getLetsRunDailySummary(callback) {
  var url = new URL(API_URL + "/v1/letsrun/summary");
  url.search = new URLSearchParams().toString();
  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Something went wrong ...");
      }
    })
    .then((data) => {
      callback(data);
    })
    .catch((error) => {
      console.log(error);
    });
}
