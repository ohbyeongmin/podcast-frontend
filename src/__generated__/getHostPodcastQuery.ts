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

export interface getHostPodcastQuery_getPodcast_podcast_episodes {
  __typename: "Episode";
  id: number;
  title: string;
  audioUrl: string;
}

export interface getHostPodcastQuery_getPodcast_podcast_reviews_creator {
  __typename: "User";
  avatarUrl: string | null;
  email: string;
}

export interface getHostPodcastQuery_getPodcast_podcast_reviews {
  __typename: "Review";
  id: number;
  createdAt: any;
  updatedAt: any;
  title: string;
  text: string;
  creator: getHostPodcastQuery_getPodcast_podcast_reviews_creator;
}

export interface getHostPodcastQuery_getPodcast_podcast {
  __typename: "Podcast";
  id: number;
  createdAt: any;
  updatedAt: any;
  title: string;
  category: Category;
  rating: number;
  description: string;
  coverImg: string | null;
  creator: getHostPodcastQuery_getPodcast_podcast_creator;
  episodes: getHostPodcastQuery_getPodcast_podcast_episodes[];
  reviews: getHostPodcastQuery_getPodcast_podcast_reviews[];
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
