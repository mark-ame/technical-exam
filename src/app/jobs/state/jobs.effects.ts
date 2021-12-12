import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { map, mergeMap, catchError, switchMap } from "rxjs/operators";

import { JobsService } from "../../jobs.service";
import * as fromJobs from "./jobs.actions";

@Injectable()
export class JobsEffects {
  getJobs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromJobs.getJobs),
      switchMap((action) =>
        this.jobsService.getJobs().pipe(
          map((jobs: any) => fromJobs.getJobsSuccess({ jobs })),
          catchError((error) => of(fromJobs.getJobsError({ error })))
        )
      )
    )
  );

  getJob$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromJobs.getJob),
      switchMap((action) =>
        this.jobsService.getJob(action.id).pipe(
          map((job: any) => fromJobs.getJobSuccess({ job })),
          catchError((error) => of(fromJobs.getJobError({ error })))
        )
      )
    )
  );

  addJob$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromJobs.addJobLoad),
      switchMap((action) =>
        this.jobsService.addJob(action.job).pipe(
          map((job: any) => fromJobs.addJobSuccess({ job })),
          catchError((error) => of(fromJobs.addJobError({ error })))
        )
      )
    )
  );

  updateJob$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromJobs.updateJobRequest),
      switchMap((action) =>
        this.jobsService.updateJob(action.job).pipe(
          map((job: any) => fromJobs.updateJobSuccess({ job })),
          catchError((error) => of(fromJobs.updateJobError({ error })))
        )
      )
    )
  );

  deleteJob$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromJobs.deleteJobRequest),
      switchMap((action) =>
        this.jobsService.deleteJob(action.id).pipe(
          map((id: any) => fromJobs.deleteJobSuccess({ id: action.id })),
          catchError((error) => of(fromJobs.deleteJobError({ error })))
        )
      )
    )
  );

  filterJob$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromJobs.filterJobRequest),
      switchMap((action) =>
        this.jobsService.filterJob(action.query).pipe(
          map((jobs: any) => fromJobs.filterJobSuccess({ jobs })),
          catchError((error) => of(fromJobs.filterJobError({ error })))
        )
      )
    )
  );
  constructor(private actions$: Actions, private jobsService: JobsService) {}
}
