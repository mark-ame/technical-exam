import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Job, JobType } from "../../../../shared/models/jobs";
import * as jobsActions from "../../../state/jobs.actions";
import * as fromJobs from "../../../state/jobs.reducer";

@Component({
  selector: "app-job",
  templateUrl: "./job.component.html",
  styleUrls: ["./job.component.scss"],
})
export class JobComponent implements OnInit {
  @Input() job: Job | null = null;
  @Output() deleteJobEvent = new EventEmitter<any>();
  jobs$!: Observable<Job[]>;
  JobType = JobType;
  confirmMessage = "Are you sure you want to delete job?";
  UPDATE_DESC = 1;
  UPDATE_ALL = 2;
  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {}

  onDeleteJob(id: number, $event: any): void {
    $event.stopPropagation();
    if (confirm(this.confirmMessage)) {
      this.store.dispatch(jobsActions.deleteJobRequest({ id: id }));
    }
  }

  viewDetails(id: number, mode: number, $event?: any): void {
    $event?.stopPropagation();
    const stateParams = {
      state: {
        mode: mode,
      },
    };
    this.store.dispatch(jobsActions.getJob({ id: id }));
    this.router.navigate(["jobs", id], stateParams);
  }
}
