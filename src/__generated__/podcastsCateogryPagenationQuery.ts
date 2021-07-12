/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetPodcastsCategoryPagenationInput, Category } from "./globalTypes";

// ====================================================
// GraphQL query operation: podcastsCateogryPagenationQuery
// ====================================================

export interface podcastsCateogryPagenationQuery_getPodcastsCategoryPagenation_podcasts_listeners {
  __typename: "User";
  id: number;
}

export interface podcastsCateogryPagenationQuery_getPodcastsCategoryPagenation_podcasts_reviews {
  __typename: "Review";
  id: number;
}

export interface podcastsCateogryPagenationQuery_getPodcastsCategoryPagenation_podcasts {
  __typename: "Podcast";
  id: number;
  title: string;
  description: string;
  category: Category;
  rating: number;
  coverImg: string | null;
  listeners: podcastsCateogryPagenationQuery_getPodcastsCategoryPagenation_podcasts_listeners[] | null;
  reviews: podcastsCateogryPagenationQuery_getPodcastsCategoryPagenation_podcasts_reviews[] | null;
}

export interface podcastsCateogryPagenationQuery_getPodcastsCategoryPagenation {
  __typename: "GetPodcastsPagenationOutput";
  ok: boolean;
  error: string | null;
  totalPages: number | null;
  totalCount: number | null;
  podcasts: podcastsCateogryPagenationQuery_getPodcastsCategoryPagenation_podcasts[] | null;
}

export interface podcastsCateogryPagenationQuery {
  getPodcastsCategoryPagenation: podcastsCateogryPagenationQuery_getPodcastsCategoryPagenation;
}

export interface podcastsCateogryPagenationQueryVariables {
  input: GetPodcastsCategoryPagenationInput;
}
