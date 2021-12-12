import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { select, Store } from "@ngrx/store";
import { Job, JobType } from "../../../shared/models/jobs";
import * as jobsActions from "../../state/jobs.actions";
import * as fromJobs from "../../state/jobs.reducer";
import { Observable } from "rxjs";

@Component({
  selector: "app-add-job-form",
  templateUrl: "./add-job-form.component.html",
  styleUrls: ["./add-job-form.component.scss"],
})
export class AddJobFormComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private store: Store,
    private location: Location
  ) {}
  JobType = JobType;
  formGroup!: FormGroup;
  jobs: any;
  job!: Job;
  error!: Observable<any>;
  loading!: Observable<boolean>;
  showAlert = false;
  ngOnInit(): void {
    this.formGroup = this.fb.group({
      title: new FormControl("", [Validators.required]),
      company: new FormControl("", [Validators.required]),
      description: new FormControl("", [Validators.required]),
      link: new FormControl("", [Validators.required]),
      date: new FormControl(""),
      type: new FormControl(JobType.PartTime, [Validators.required]),
      logo: new FormControl(""),
    });
  }

  private generateColor(): string {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return randomColor;
  }

  private generateLogo(): string {
    const color1 = this.generateColor();
    const color2 = this.generateColor();
    let str = "http://dummyimage.com/106x100.png/" + color1 + "/" + color2;
    return str;
  }

  private getCurrentDate(): string {
    let today: any = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();
    today = mm + "/" + dd + "/" + yyyy;
    return today;
  }

  addJob(): void {
    if (this.formGroup.valid) {
      const job = this.formGroup.value;
      job.date = this.getCurrentDate();
      job.logo = this.generateLogo();
      job.type = parseInt(job.type, 10);
      this.job = job;
      this.store.dispatch(jobsActions.addJobLoad({ job: job }));
      alert("Add job success");
      this.resetForm();
    }
  }

  back(): void {
    this.location.back();
  }

  private resetForm(): void {
    this.formGroup.get("title")?.reset();
    this.formGroup.get("company")?.reset();
    this.formGroup.get("description")?.reset();
    this.formGroup.get("link")?.reset();
    this.formGroup.get("type")?.setValue(JobType.PartTime);
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
