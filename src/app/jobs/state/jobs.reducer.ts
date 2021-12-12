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
  searchResults: Job[];
  selectedJob: any;
  loading: boolean;
  error: string | null;
}

const initialState: State = {
  jobs: [],
  searchResults: [],
  selectedJob: null,
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
    searchResults: jobs,
  })),
  on(jobsActions.getJobsError, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(jobsActions.getJob, (state, { id }) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(jobsActions.getJobSuccess, (state, { job }) => ({
    ...state,
    loading: false,
    error: null,
    selectedJob: job,
  })),
  on(jobsActions.getJobError, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(jobsActions.addJobLoad, (state, { job }) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(jobsActions.addJobSuccess, (state, { job }) => ({
    ...state,
    loading: false,
    error: null,
  })),

  on(jobsActions.addJobError, (state, { error }) => ({
    ...state,
    loading: true,
    error: error,
  })),

  on(jobsActions.deleteJobRequest, (state, { id }) => ({
    ...state,
    loading: true,
  })),

  on(jobsActions.deleteJobSuccess, (state, { id }) => ({
    ...state,
    loading: false,
    jobs: state.jobs.filter((x) => x.id != id),
    searchResults: state.searchResults.filter((x) => x.id != id),
  })),

  on(jobsActions.deleteJobError, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  })),

  on(jobsActions.updateJobRequest, (state, { job }) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(jobsActions.updateJobSuccess, (state, { job }) => ({
    ...state,
    loading: false,
    error: null,
    selectedJob: job,
  })),

  on(jobsActions.updateJobError, (state, { error }) => ({
    ...state,
    loading: true,
    error: error,
  })),

  on(jobsActions.filterJobRequest, (state, { query }) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(jobsActions.filterJobSuccess, (state, { jobs }) => ({
    ...state,
    loading: false,
    error: null,
    searchResults: jobs,
  })),

  on(jobsActions.filterJobError, (state, { error }) => ({
    ...state,
    loading: true,
    error: error,
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
export const selectJobError = createSelector(
  selectJobsState,
  (state: State) => state.error
);
export const getAddJobError = createSelector(
  selectJobsState,
  (state: State) => state.error
);
export const selectJob = createSelector(
  selectJobsState,
  (state: State) => state.selectedJob
);

export const getSearchResults = createSelector(
  selectJobsState,
  (state) => state.searchResults
);

export const getCompanies = createSelector(selectJobsState, (state: State) =>
  state.jobs.map((a) => a.company)
);

export const getTitles = createSelector(selectJobsState, (state: State) =>
  state.jobs.map((a) => a.title)
);
