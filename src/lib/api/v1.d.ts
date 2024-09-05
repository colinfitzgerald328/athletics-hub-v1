/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Read Root */
    get: operations["read_root__get"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/_ah/warmup": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Warmup
     * @description Served stub function returning no content.
     *
     *
     *     Returns:
     *         An empty string, an HTTP code 200, and an empty object.
     */
    get: operations["warmup__ah_warmup_get"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/athletes/{athlete_id}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Get Athlete By Id */
    get: operations["get_athlete_by_id_athletes__athlete_id__get"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/athlete/random": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Get Random Athlete */
    get: operations["get_random_athlete_athlete_random_get"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/athlete/search": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Search For Athlete */
    get: operations["search_for_athlete_athlete_search_get"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/athletes/compare": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** Compare Two Athletes Controller */
    post: operations["compare_two_athletes_controller_athletes_compare_post"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/account/create": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** Create Account Controller */
    post: operations["create_account_controller_account_create_post"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/account/login": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** Login User */
    post: operations["login_user_account_login_post"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/collections/create": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** Create And Return Collection */
    post: operations["create_and_return_collection_collections_create_post"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/collections/user": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Get User Collections */
    get: operations["get_user_collections_collections_user_get"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/collections/{collection_id}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Get User Collection By Collection Id */
    get: operations["get_user_collection_by_collection_id_collections__collection_id__get"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/collections/modify": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** Modify Collection */
    post: operations["modify_collection_collections_modify_post"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/collections/delete": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** Delete Collection */
    post: operations["delete_collection_collections_delete_post"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/letsrun/daily_summary": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Get Letsrun Daily Summary */
    get: operations["get_letsrun_daily_summary_letsrun_daily_summary_get"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/letsrun/daily_summary/create": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** Post Letsrun Daily Summary */
    post: operations["post_letsrun_daily_summary_letsrun_daily_summary_create_post"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
}
export type webhooks = Record<string, never>;
export interface components {
  schemas: {
    /** AccountDetails */
    AccountDetails: {
      /** Id */
      id: string;
      /** Username */
      username: string;
      /** Password */
      password: string;
    };
    /** Athlete */
    Athlete: {
      /** Id */
      id: string;
      /** Athlete Id */
      athlete_id: number;
      /** First Name */
      first_name: string;
      /** Last Name */
      last_name: string;
      /** Date Of Birth */
      date_of_birth?: string;
      /** Country */
      country: string;
      /** Url Slug */
      url_slug: string;
      /** Primary Disciplines */
      primary_disciplines: string;
      /** Accomplishments */
      accomplishments?: string[];
      /** Personal Bests */
      personal_bests?: unknown[];
      /** Gender */
      gender: string;
      /** Wikipedia Url */
      wikipedia_url?: string;
      /** Social Urls */
      social_urls?: Record<string, never> | unknown[];
      /** Nickname */
      nickname?: string;
      /** Hq Images */
      hq_images?: string[];
      /** Markdown Summary */
      markdown_summary?: string;
    };
    /** AthleteResult */
    AthleteResult: {
      /** Date */
      date: string;
      /** Competition */
      competition: string;
      /** Venue */
      venue: string;
      /** Indoor */
      indoor?: boolean;
      /** Discipline Code */
      discipline_code?: string;
      /** Discipline Name Url Slug */
      discipline_name_url_slug?: string;
      /** Type Name Url Slug */
      type_name_url_slug?: string;
      /** Discipline */
      discipline: string;
      /** Country */
      country: string;
      /** Category */
      category: string;
      /** Race */
      race: string;
      /** Place */
      place: string;
      /** Mark */
      mark: string;
      /** Wind */
      wind?: string;
      /** Not Legal */
      not_legal?: boolean;
      /** Result Score */
      result_score?: number;
      /** Remark */
      remark?: string;
      /** Timestamp */
      timestamp: number;
    };
    /** CloseMatch */
    CloseMatch: {
      /** Athlete Id */
      athlete_id: number;
      /** First Name */
      first_name: string;
      /** Last Name */
      last_name: string;
      /** Primary Disciplines */
      primary_disciplines: string;
      /** Hq Images */
      hq_images?: string[];
    };
    /**
     * CollectionAction
     * @description An enumeration.
     * @enum {unknown}
     */
    CollectionAction: "ADD" | "DELETE" | "UPDATE_NAME";
    /** CollectionReturnPayload */
    CollectionReturnPayload: {
      /** Collection Id */
      collection_id: string;
      /** Collection Name */
      collection_name: string;
      /**
       * Created At
       * Format: date-time
       */
      created_at: string;
      /**
       * Updated At
       * Format: date-time
       */
      updated_at: string;
      /** Athletes */
      athletes: components["schemas"]["StoredQueriedAthlete"][];
    };
    /** CreateAccountPayload */
    CreateAccountPayload: {
      /** Username */
      username: string;
      /** Password */
      password: string;
    };
    /** CreateCollectionPayload */
    CreateCollectionPayload: {
      /** Collection Name */
      collection_name: string;
      /** Account Id */
      account_id: string;
      /** Athlete Ids */
      athlete_ids: number[];
    };
    /** DeleteCollectionPayload */
    DeleteCollectionPayload: {
      /** Collection Id */
      collection_id: number;
    };
    /** HTTPValidationError */
    HTTPValidationError: {
      /** Detail */
      detail?: components["schemas"]["ValidationError"][];
    };
    /** LetsrunSummaryForDay */
    LetsrunSummaryForDay: {
      /** Id */
      id: number;
      /** Summary Text */
      summary_text: string;
      /**
       * Created At
       * Format: date-time
       */
      created_at: string;
    };
    /** LoginPayload */
    LoginPayload: {
      /** Username */
      username: string;
      /** Password */
      password: string;
    };
    /** ModifyCollectionPayload */
    ModifyCollectionPayload: {
      action: components["schemas"]["CollectionAction"];
      /** Collection Id */
      collection_id: number;
      /** Athlete Id */
      athlete_id?: number;
      /** New Name */
      new_name?: string;
      /** Athlete Ids */
      athlete_ids?: number[];
    };
    /** ModifyCollectionReturnPayload */
    ModifyCollectionReturnPayload: {
      /** Name Was Updated */
      name_was_updated: boolean;
    };
    /** QueriedAthlete */
    QueriedAthlete: {
      athlete: components["schemas"]["Athlete"];
      /** Results */
      results: components["schemas"]["AthleteResult"][];
      /** Top Competitors */
      top_competitors: components["schemas"]["TopCompetitor"][];
      /** Similar Athletes */
      similar_athletes?: components["schemas"]["CloseMatch"][];
    };
    /** StoredQueriedAthlete */
    StoredQueriedAthlete: {
      /** Athlete Id */
      athlete_id: number;
      /** Json Data */
      json_data: Record<string, never>;
      /** Similar Athletes */
      similar_athletes?: components["schemas"]["CloseMatch"][];
    };
    /** TopCompetitor */
    TopCompetitor: {
      /** Athlete Id */
      athlete_id: number;
      /** Primary Disciplines */
      primary_disciplines: string;
      /** First Name */
      first_name: string;
      /** Last Name */
      last_name: string;
      /** Markdown Summary */
      markdown_summary?: string;
      /** Hq Images */
      hq_images?: string[];
    };
    /** UserCollections */
    UserCollections: {
      /** Id */
      id: string;
      /** Account Id */
      account_id: string;
      /** Collection Name */
      collection_name: string;
      /**
       * Created At
       * Format: date-time
       */
      created_at: string;
      /**
       * Updated At
       * Format: date-time
       */
      updated_at: string;
      /** Detailed Athletes */
      detailed_athletes: components["schemas"]["StoredQueriedAthlete"][];
    };
    /** ValidationError */
    ValidationError: {
      /** Location */
      loc: (string | number)[];
      /** Message */
      msg: string;
      /** Error Type */
      type: string;
    };
    /** VectorSearchResult */
    VectorSearchResult: {
      /** Athlete Id */
      athlete_id: number;
      /** Hq Images */
      hq_images?: string[];
      /** Full Name */
      full_name: string;
      /** Primary Disciplines */
      primary_disciplines: string;
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
  read_root__get: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": unknown;
        };
      };
    };
  };
  warmup__ah_warmup_get: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": unknown;
        };
      };
    };
  };
  get_athlete_by_id_athletes__athlete_id__get: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        athlete_id: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["QueriedAthlete"];
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  get_random_athlete_athlete_random_get: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["QueriedAthlete"];
        };
      };
    };
  };
  search_for_athlete_athlete_search_get: {
    parameters: {
      query: {
        search_query: string;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["VectorSearchResult"][];
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  compare_two_athletes_controller_athletes_compare_post: {
    parameters: {
      query: {
        athlete_id_1: number;
        athlete_id_2: number;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": unknown;
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  create_account_controller_account_create_post: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["CreateAccountPayload"];
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["AccountDetails"];
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  login_user_account_login_post: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["LoginPayload"];
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["AccountDetails"];
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  create_and_return_collection_collections_create_post: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["CreateCollectionPayload"];
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["CollectionReturnPayload"];
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  get_user_collections_collections_user_get: {
    parameters: {
      query: {
        account_id: number;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["UserCollections"][];
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  get_user_collection_by_collection_id_collections__collection_id__get: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        collection_id: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["CollectionReturnPayload"];
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  modify_collection_collections_modify_post: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["ModifyCollectionPayload"];
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ModifyCollectionReturnPayload"];
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  delete_collection_collections_delete_post: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["DeleteCollectionPayload"];
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": unknown;
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  get_letsrun_daily_summary_letsrun_daily_summary_get: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["LetsrunSummaryForDay"];
        };
      };
    };
  };
  post_letsrun_daily_summary_letsrun_daily_summary_create_post: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": unknown;
        };
      };
    };
  };
}
