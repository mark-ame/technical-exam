import { Component, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { Job } from "../../../shared/models/jobs";
import * as jobsActions from "../../state/jobs.actions";
import * as fromJobs from "../../state/jobs.reducer";

@Component({
  selector: "app-jobs",
  templateUrl: "./jobs.component.html",
  styleUrls: ["./jobs.component.scss"],
})
export class JobsComponent implements OnInit {
  jobs$!: Observable<Job[]>;
  add = faPlus;

  constructor(private store: Store) {}
  ngOnInit(): void {
    this.store.dispatch(jobsActions.getJobs());

    this.jobs$ = this.store.pipe(select(fromJobs.selectJobs));
  }

  onAdd(): void {
    // TODO: feel free to modify any files.
    // NOTE: Only maintain console.log that are useful in debugging
    console.log("Add button is pressed");
  }
}
