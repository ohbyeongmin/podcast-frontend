/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetPodcastsPagenationInput, Category } from "./globalTypes";

// ====================================================
// GraphQL query operation: podcastsPagenationQuery
// ====================================================

export interface podcastsPagenationQuery_getPodcastsPagenation_podcasts_listeners {
  __typename: "User";
  id: number;
}

export interface podcastsPagenationQuery_getPodcastsPagenation_podcasts_reviews {
  __typename: "Review";
  id: number;
}

export interface podcastsPagenationQuery_getPodcastsPagenation_podcasts {
  __typename: "Podcast";
  id: number;
  title: string;
  description: string;
  category: Category;
  rating: number;
  coverImg: string | null;
  listeners: podcastsPagenationQuery_getPodcastsPagenation_podcasts_listeners[] | null;
  reviews: podcastsPagenationQuery_getPodcastsPagenation_podcasts_reviews[] | null;
}

export interface podcastsPagenationQuery_getPodcastsPagenation {
  __typename: "GetPodcastsPagenationOutput";
  ok: boolean;
  error: string | null;
  totalPages: number | null;
  totalCount: number | null;
  podcasts: podcastsPagenationQuery_getPodcastsPagenation_podcasts[] | null;
}

export interface podcastsPagenationQuery {
  getPodcastsPagenation: podcastsPagenationQuery_getPodcastsPagenation;
}

export interface podcastsPagenationQueryVariables {
  input: GetPodcastsPagenationInput;
}
