import { Component, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Job, JobType } from "../../../shared/models/jobs";
import * as jobsActions from "../../state/jobs.actions";
import * as fromJobs from "../../state/jobs.reducer";
import { Location } from "@angular/common";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
@Component({
  selector: "app-job-description",
  templateUrl: "./job-description.component.html",
  styleUrls: ["./job-description.component.scss"],
})
export class JobDescriptionComponent implements OnInit {
  constructor(
    private store: Store,
    private location: Location,
    private router: Router,
    private fb: FormBuilder
  ) {
    const stateParams = this.router.getCurrentNavigation()?.extras.state;
    if (stateParams) {
      if (stateParams.mode != null) {
        this.MODE = stateParams.mode;
      }
    }
  }
  MODE!: number;
  job$!: Observable<Job>;
  JobType = JobType;
  formGroup!: FormGroup;
  buttonText = "Update Job Details";

  ngOnInit(): void {
    this.job$ = this.store.pipe(select(fromJobs.selectJob));
    this.job$.subscribe((job) => {
      this.initForm(job);
    });
  }

  initForm(data: any): void {
    this.formGroup = this.fb.group({
      id: new FormControl(data?.id, [Validators.required]),
      title: new FormControl(data?.title, [Validators.required]),
      company: new FormControl(data?.company, [Validators.required]),
      description: new FormControl(data?.description, [Validators.required]),
      link: new FormControl(data?.link, [Validators.required]),
      date: new FormControl(data?.date, [Validators.required]),
      type: new FormControl(data?.type, [Validators.required]),
      logo: new FormControl(data?.logo, [Validators.required]),
    });
    if (this.MODE === 1) {
      this.title?.disable();
      this.company?.disable();
      this.link?.disable();
      this.type?.disable();
      this.buttonText = "Update Job Description";
    }
    console.log(this.formGroup.value);
    console.log(JobType.PartTime);
  }

  back(): void {
    this.location.back();
  }

  update(): void {
    if (this.formGroup.valid) {
      const job = this.formGroup.getRawValue();
      job.type = parseInt(job.type, 10);
      this.store.dispatch(jobsActions.updateJobRequest({ job: job }));
      alert("Job updated");
    }
  }

  get title(): FormControl {
    return this.formGroup.get("title") as FormControl;
  }

  get company(): FormControl {
    return this.formGroup.get("company") as FormControl;
  }

  get description(): FormControl {
    return this.formGroup.get("description") as FormControl;
  }

  get link(): FormControl {
    return this.formGroup.get("link") as FormControl;
  }

  get type(): FormControl {
    return this.formGroup.get("type") as FormControl;
  }
}
