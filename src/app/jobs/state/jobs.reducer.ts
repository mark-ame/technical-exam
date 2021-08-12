import {
  createReducer,
  on,
  Action,
  createFeatureSelector,
  createSelector,
} from "@ngrx/store";
import { Job } from "../../shared/models/jobs";

import * as jobsActions from "./jobs.actions";

export interface State {
  jobs: Job[];
  loading: boolean;
  error: string | null;
}

const initialState: State = {
  jobs: [],
  loading: false,
  error: null,
};

const jobsReducer = createReducer<State>(
  initialState,
  on(jobsActions.getJobs, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(jobsActions.getJobsSuccess, (state, { jobs }) => ({
    ...state,
    loading: false,
    error: null,
    jobs,
  })),
  on(jobsActions.getJobsError, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return jobsReducer(state, action);
}

export const selectJobsState = createFeatureSelector<State>("jobsFeature");
export const selectJobs = createSelector(
  selectJobsState,
  (state) => state.jobs
);
