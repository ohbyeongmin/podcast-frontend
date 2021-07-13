/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateReviewInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: reviewMutation
// ====================================================

export interface reviewMutation_createReview {
  __typename: "CreateReviewOutput";
  error: string | null;
  ok: boolean;
  id: number | null;
}

export interface reviewMutation {
  createReview: reviewMutation_createReview;
}

export interface reviewMutationVariables {
  input: CreateReviewInput;
}
