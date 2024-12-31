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
  "/save_letsrun_summary": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** Save Letsrun Summary */
    post: operations["save_letsrun_summary_save_letsrun_summary_post"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/get_letsrun_summary": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Get Letsrun Summary */
    get: operations["get_letsrun_summary_get_letsrun_summary_get"];
    put?: never;
    post?: never;
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
    /** AthleteResult */
    AthleteResult: {
      /** Date */
      date: string;
      /** Competition */
      competition: string;
      /** Venue */
      venue: string;
      /** Indoor */
      indoor: boolean | null;
      /** Discipline Code */
      discipline_code: string | null;
      /** Discipline Name Url Slug */
      discipline_name_url_slug: string | null;
      /** Type Name Url Slug */
      type_name_url_slug: string | null;
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
      wind: string | null;
      /** Not Legal */
      not_legal: boolean | null;
      /** Result Score */
      result_score: number | null;
      /** Remark */
      remark: string | null;
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
      hq_images: string[] | null;
    };
    /** HTTPValidationError */
    HTTPValidationError: {
      /** Detail */
      detail?: components["schemas"]["ValidationError"][];
    };
    /** LetsRunSummaryItemPydantic */
    LetsRunSummaryItemPydantic: {
      /** Id */
      id: number;
      /** Section Title */
      section_title: string;
      /** Summary Text */
      summary_text: string;
      /** Source Links */
      source_links: components["schemas"]["LetsrunSourceLinkPydantic"][];
      /**
       * Date Created
       * Format: date
       */
      date_created: string;
    };
    /** LetsrunSourceLinkPydantic */
    LetsrunSourceLinkPydantic: {
      /** Id */
      id: number;
      /** Item Id */
      item_id: number;
      /** Source Name */
      source_name: string;
      /** Source Link */
      source_link: string;
    };
    /** PydanticAthlete */
    PydanticAthlete: {
      /** Id */
      id: number;
      /** Athlete Id */
      athlete_id: number;
      /** First Name */
      first_name: string;
      /** Last Name */
      last_name: string;
      /** Date Of Birth */
      date_of_birth: string | null;
      /** Country */
      country: string;
      /** Url Slug */
      url_slug: string;
      /** Primary Disciplines */
      primary_disciplines: string;
      /** Accomplishments */
      accomplishments: string[] | null;
      /** Personal Bests */
      personal_bests: unknown[] | null;
      /** Gender */
      gender: string;
      /** Wikipedia Url */
      wikipedia_url: string | null;
      /** Social Urls */
      social_urls: Record<string, never> | unknown[] | null;
      /** Nickname */
      nickname: string | null;
      /** Hq Images */
      hq_images: string[] | null;
      /** Markdown Summary */
      markdown_summary: string | null;
      /** Avg Result Score */
      avg_result_score: number | null;
      /** Primary Event */
      primary_event: string | null;
    };
    /** QueriedAthlete */
    QueriedAthlete: {
      athlete: components["schemas"]["PydanticAthlete"];
      /** Results */
      results: components["schemas"]["AthleteResult"][];
      /** Top Competitors */
      top_competitors: components["schemas"]["TopCompetitor"][];
      /** Similar Athletes */
      similar_athletes: components["schemas"]["CloseMatch"][] | null;
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
      markdown_summary: string | null;
      /** Hq Images */
      hq_images: string[] | null;
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
      hq_images: string[] | null;
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
  save_letsrun_summary_save_letsrun_summary_post: {
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
  get_letsrun_summary_get_letsrun_summary_get: {
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
          "application/json": components["schemas"]["LetsRunSummaryItemPydantic"][];
        };
      };
    };
  };
}
