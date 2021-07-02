/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getHostpodcastsQuery
// ====================================================

export interface getHostpodcastsQuery_getHostPodcasts_podcasts {
  __typename: "Podcast";
  id: number;
  title: string;
  coverImg: string | null;
  description: string;
}

export interface getHostpodcastsQuery_getHostPodcasts {
  __typename: "GetAllPodcastsOutput";
  ok: boolean;
  error: string | null;
  podcasts: getHostpodcastsQuery_getHostPodcasts_podcasts[] | null;
}

export interface getHostpodcastsQuery {
  getHostPodcasts: getHostpodcastsQuery_getHostPodcasts;
}
