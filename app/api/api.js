var API_URL = "https://athletics-hub.uc.r.appspot.com";

export async function getResultsForAthlete(athlete_code, callback) {
  var data = {
    athlete_id: athlete_code,
  };

  var url = new URL(API_URL + "/athletes/results");
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
