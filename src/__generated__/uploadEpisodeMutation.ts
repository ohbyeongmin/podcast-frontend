/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateEpisodeInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: uploadEpisodeMutation
// ====================================================

export interface uploadEpisodeMutation_createEpisode {
  __typename: "CreateEpisodeOutput";
  ok: boolean;
  id: number | null;
  error: string | null;
}

export interface uploadEpisodeMutation {
  createEpisode: uploadEpisodeMutation_createEpisode;
}

export interface uploadEpisodeMutationVariables {
  input: CreateEpisodeInput;
}
