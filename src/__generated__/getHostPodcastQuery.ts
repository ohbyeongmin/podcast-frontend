/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PodcastSearchInput, Category } from "./globalTypes";

// ====================================================
// GraphQL query operation: getHostPodcastQuery
// ====================================================

export interface getHostPodcastQuery_getPodcast_podcast_creator {
  __typename: "User";
  id: number;
}

export interface getHostPodcastQuery_getPodcast_podcast_reviews_creator {
  __typename: "User";
  email: string;
}

export interface getHostPodcastQuery_getPodcast_podcast_reviews {
  __typename: "Review";
  text: string;
  creator: getHostPodcastQuery_getPodcast_podcast_reviews_creator;
}

export interface getHostPodcastQuery_getPodcast_podcast_listeners {
  __typename: "User";
  email: string;
}

export interface getHostPodcastQuery_getPodcast_podcast {
  __typename: "Podcast";
  title: string;
  description: string;
  coverImg: string | null;
  category: Category;
  creator: getHostPodcastQuery_getPodcast_podcast_creator;
  reviews: getHostPodcastQuery_getPodcast_podcast_reviews[] | null;
  listeners: getHostPodcastQuery_getPodcast_podcast_listeners[] | null;
}

export interface getHostPodcastQuery_getPodcast {
  __typename: "PodcastOutput";
  error: string | null;
  ok: boolean;
  podcast: getHostPodcastQuery_getPodcast_podcast | null;
}

export interface getHostPodcastQuery {
  getPodcast: getHostPodcastQuery_getPodcast;
}

export interface getHostPodcastQueryVariables {
  input: PodcastSearchInput;
}
