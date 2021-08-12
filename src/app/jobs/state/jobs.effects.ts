import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { map, mergeMap, catchError, tap } from "rxjs/operators";

import { JobsService } from "../../jobs.service";
import * as fromJobs from "./jobs.actions";

@Injectable()
export class JobsEffects {
  getJobs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromJobs.getJobs),
      mergeMap(() =>
        this.jobsService.getJobs().pipe(
          map((jobs) => fromJobs.getJobsSuccess({ jobs })),
          catchError((error) => of(fromJobs.getJobsError({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private jobsService: JobsService) {}
}
