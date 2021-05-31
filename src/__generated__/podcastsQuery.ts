/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Category } from "./globalTypes";

// ====================================================
// GraphQL query operation: podcastsQuery
// ====================================================

export interface podcastsQuery_getAllPodcasts_podcasts {
  __typename: "Podcast";
  id: number;
  title: string;
  category: Category;
  rating: number;
}

export interface podcastsQuery_getAllPodcasts {
  __typename: "GetAllPodcastsOutput";
  ok: boolean;
  error: string | null;
  podcasts: podcastsQuery_getAllPodcasts_podcasts[] | null;
}

export interface podcastsQuery {
  getAllPodcasts: podcastsQuery_getAllPodcasts;
}
