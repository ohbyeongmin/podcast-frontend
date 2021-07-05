/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PodcastSearchInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: getEpisodesQuery
// ====================================================

export interface getEpisodesQuery_getEpisodes_episodes {
  __typename: "Episode";
  title: string;
  audioUrl: string;
}

export interface getEpisodesQuery_getEpisodes {
  __typename: "EpisodesOutput";
  episodes: getEpisodesQuery_getEpisodes_episodes[] | null;
}

export interface getEpisodesQuery {
  getEpisodes: getEpisodesQuery_getEpisodes;
}

export interface getEpisodesQueryVariables {
  input: PodcastSearchInput;
}
