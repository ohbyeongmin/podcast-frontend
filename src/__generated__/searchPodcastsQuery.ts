/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SearchPodcastsInput, Category } from "./globalTypes";

// ====================================================
// GraphQL query operation: searchPodcastsQuery
// ====================================================

export interface searchPodcastsQuery_searchPodcasts_podcasts_listeners {
  __typename: "User";
  id: number;
}

export interface searchPodcastsQuery_searchPodcasts_podcasts_reviews {
  __typename: "Review";
  id: number;
}

export interface searchPodcastsQuery_searchPodcasts_podcasts {
  __typename: "Podcast";
  id: number;
  title: string;
  description: string;
  category: Category;
  rating: number;
  coverImg: string | null;
  listeners: searchPodcastsQuery_searchPodcasts_podcasts_listeners[] | null;
  reviews: searchPodcastsQuery_searchPodcasts_podcasts_reviews[] | null;
}

export interface searchPodcastsQuery_searchPodcasts {
  __typename: "SearchPodcastsOutput";
  ok: boolean;
  error: string | null;
  totalPages: number | null;
  totalCount: number | null;
  podcasts: searchPodcastsQuery_searchPodcasts_podcasts[] | null;
}

export interface searchPodcastsQuery {
  searchPodcasts: searchPodcastsQuery_searchPodcasts;
}

export interface searchPodcastsQueryVariables {
  input: SearchPodcastsInput;
}
