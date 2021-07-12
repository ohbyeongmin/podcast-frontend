/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdatePodcastInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: editPodcastMutation
// ====================================================

export interface editPodcastMutation_updatePodcast {
  __typename: "CoreOutput";
  ok: boolean;
  error: string | null;
}

export interface editPodcastMutation {
  updatePodcast: editPodcastMutation_updatePodcast;
}

export interface editPodcastMutationVariables {
  input: UpdatePodcastInput;
}
