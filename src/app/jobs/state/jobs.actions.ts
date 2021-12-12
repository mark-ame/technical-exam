import { createAction, props } from "@ngrx/store";
import { Job } from "../../shared/models/jobs";

// Fetch all jobs
export const getJobs = createAction("[Jobs API] Get Jobs");
export const getJobsSuccess = createAction(
  "[Jobs API] Get Jobs Success",
  props<{ jobs: Job[] }>()
);
export const getJobsError = createAction(
  "[Jobs API] Get Jobs Error",
  props<{ error: string }>()
);

// Get Job Details
export const getJob = createAction(
  "[Jobs API] Get Job",
  props<{ id: number }>()
);
export const getJobSuccess = createAction(
  "[Jobs API] Get Job Success",
  props<{ job: Job }>()
);
export const getJobError = createAction(
  "[Jobs API] Get Job Error",
  props<{ error: string }>()
);

// Adding Job Actions
export const addJobLoad = createAction(
  "[Jobs API] Add Job Load",
  props<{ job: Job }>()
);
export const addJobSuccess = createAction(
  "[Jobs API] Add Job Success",
  props<{ job: Job }>()
);
export const addJobError = createAction(
  "[Jobs API] Add Job Error",
  props<{
    error: string;
  }>()
);

// Delete Job Actions
export const deleteJobRequest = createAction(
  "[Jobs API] Delete Job Request",
  props<{ id: number }>()
);
export const deleteJobSuccess = createAction(
  "[Jobs API] Delete Job Success",
  props<{ id: number }>()
);
export const deleteJobError = createAction(
  "[Jobs API] Delete Job Error",
  props<{
    error: string;
  }>()
);

// Update Job Actions
export const updateJobRequest = createAction(
  "[Jobs API] Update Job Request",
  props<{ job: Job }>()
);
export const updateJobSuccess = createAction(
  "[Jobs API] Update Job Success",
  props<{ job: Job }>()
);
export const updateJobError = createAction(
  "[Jobs API] Update Job Error",
  props<{
    error: string;
  }>()
);

// Search/Filter Job Actions
export const filterJobRequest = createAction(
  "[Jobs API] Filter Job Request",
  props<{ query: string }>()
);
export const filterJobSuccess = createAction(
  "[Jobs API] Filter Job Success",
  props<{ jobs: Job[] }>()
);
export const filterJobError = createAction(
  "[Jobs API] Filter Job Error",
  props<{
    error: string;
  }>()
);
