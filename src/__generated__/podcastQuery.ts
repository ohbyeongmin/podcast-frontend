/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PodcastSearchInput, Category } from "./globalTypes";

// ====================================================
// GraphQL query operation: podcastQuery
// ====================================================

export interface podcastQuery_getPodcast_podcast_episodes {
  __typename: "Episode";
  id: number;
  title: string;
  audioUrl: string;
}

export interface podcastQuery_getPodcast_podcast_reviews_creator {
  __typename: "User";
  email: string;
}

export interface podcastQuery_getPodcast_podcast_reviews {
  __typename: "Review";
  id: number;
  text: string;
  creator: podcastQuery_getPodcast_podcast_reviews_creator;
}

export interface podcastQuery_getPodcast_podcast_listeners {
  __typename: "User";
  id: number;
}

export interface podcastQuery_getPodcast_podcast {
  __typename: "Podcast";
  title: string;
  category: Category;
  coverImg: string | null;
  description: string;
  rating: number;
  episodes: podcastQuery_getPodcast_podcast_episodes[];
  reviews: podcastQuery_getPodcast_podcast_reviews[] | null;
  listeners: podcastQuery_getPodcast_podcast_listeners[] | null;
}

export interface podcastQuery_getPodcast {
  __typename: "PodcastOutput";
  ok: boolean;
  error: string | null;
  podcast: podcastQuery_getPodcast_podcast | null;
}

export interface podcastQuery {
  getPodcast: podcastQuery_getPodcast;
}

export interface podcastQueryVariables {
  input: PodcastSearchInput;
}
