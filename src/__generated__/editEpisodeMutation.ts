/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateEpisodeInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: editEpisodeMutation
// ====================================================

export interface editEpisodeMutation_updateEpisode {
  __typename: "CoreOutput";
  ok: boolean;
  error: string | null;
}

export interface editEpisodeMutation {
  updateEpisode: editEpisodeMutation_updateEpisode;
}

export interface editEpisodeMutationVariables {
  input: UpdateEpisodeInput;
}
