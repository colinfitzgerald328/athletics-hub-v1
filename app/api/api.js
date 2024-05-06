var API_URL = "https://savvy-webbing-422303-r1.uc.r.appspot.com";

export async function getSearchResultsForQuery(search, callback) {
  var data = {
    search_query: search,
  };

  var url = new URL(API_URL + "/athlete/search");
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
  var url = new URL(API_URL + "/athlete/random");
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

  var url = new URL(API_URL + `/athletes/${athlete_id}`);
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

  fetch(API_URL + "/account/login", options)
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

  fetch(API_URL + "/account/create", options)
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
      account_id: localStorage.getItem("account_id"),
      athlete_ids: collectionAthletes,
    }),
  };

  fetch(API_URL + "/collections/create", options)
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

  var url = new URL(API_URL + "/collections/user");
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

export async function modifyCollection(
  newName,
  action,
  collectionId,
  athleteId,
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
      new_name: newName,
      action: action,
      collection_id: collectionId,
      athlete_id: athleteId,
      athlete_ids: athleteIds,
    }),
  };
  console.log("OPTIONS, ", options);

  fetch(API_URL + "/collections/modify", options)
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

  fetch(API_URL + "/collections/delete", options)
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
  var url = new URL(API_URL + "/letsrun/daily_summary");
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

export async function compareTwoAthletes(
  athlete_id_1,
  athlete_id_2,
  comparison_distance,
  callback,
) {
  fetch(
    API_URL +
      `/athletes/compare?athlete_id_1=${athlete_id_1}&athlete_id_2=${athlete_id_2}&comparison_distance=${comparison_distance}`,
    {
      method: "POST",
      headers: {
        accept: "application/json",
      },
    },
  )
    .then((response) => response.json())
    .then((data) => {
      callback(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
