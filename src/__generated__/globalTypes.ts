/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum Category {
  Business = "Business",
  Culture = "Culture",
  Education = "Education",
  News = "News",
}

export enum UserRole {
  Host = "Host",
  Listener = "Listener",
}

export interface CreateAccountInput {
  email?: string | null;
  password?: string | null;
  role?: UserRole | null;
}

export interface CreateEpisodeInput {
  title: string;
  audioUrl: string;
  podcastId: number;
}

export interface CreatePodcastInput {
  title: string;
  category: Category;
  description: string;
  coverImg?: string | null;
}

export interface CreateReviewInput {
  text: string;
  podcastId: number;
}

export interface EditProfileInput {
  email?: string | null;
  password?: string | null;
  avatarUrl?: string | null;
}

export interface EpisodesSearchInput {
  podcastId: number;
  episodeId: number;
}

export interface GetPodcastsCategoryPagenationInput {
  page: number;
  selectCategory: Category;
}

export interface GetPodcastsPagenationInput {
  page: number;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface PodcastSearchInput {
  id: number;
}

export interface SearchPodcastsInput {
  page?: number | null;
  titleQuery: string;
}

export interface ToggleSubscribeInput {
  podcastId: number;
}

export interface UpdateEpisodeInput {
  podcastId: number;
  episodeId: number;
  title?: string | null;
}

export interface UpdatePodcastInput {
  id: number;
  payload: UpdatePodcastPayload;
}

export interface UpdatePodcastPayload {
  title?: string | null;
  category?: Category | null;
  rating?: number | null;
  description?: string | null;
  coverImg?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
