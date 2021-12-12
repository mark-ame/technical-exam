import { Component, OnDestroy, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { filter } from "rxjs/operators";
import { Job, JobType } from "../../../shared/models/jobs";
import * as jobsActions from "../../state/jobs.actions";
import * as fromJobs from "../../state/jobs.reducer";
import { Router } from "@angular/router";
import { FormArray, FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: "app-jobs",
  templateUrl: "./jobs.component.html",
  styleUrls: ["./jobs.component.scss"],
})
export class JobsComponent implements OnInit {
  jobs$!: Observable<Job[]>;
  searchResults$!: Observable<Job[]>;
  add = faPlus;
  JobType = JobType;
  formGroup!: FormGroup;
  subscription1!: Subscription;
  subscription2!: Subscription;
  jobCompanyArray!: Observable<string[]>;
  jobTitleArray!: Observable<string[]>;
  companyArray: string[] = [];
  titleArray: string[] = [];
  checkState!: any;
  constructor(private store: Store, private router: Router) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      keyword: new FormControl(""),
      companiesCheck: new FormArray([]),
      titleCheck: new FormArray([]),
      typeCheck: new FormArray([]),
    });
    this.getData();
  }

  onAdd(): void {
    this.router.navigate(["jobs/add"]);
  }

  private getData(): void {
    this.store.dispatch(jobsActions.getJobs());
    this.jobs$ = this.store.pipe(select(fromJobs.selectJobs));
    this.jobs$.subscribe((jobs) => {
      if (this.companyArray.length === 0) {
        this.initCheckState(jobs);
      } else {
        this.updateCheckStates(jobs);
      }
    });
    this.searchResults$ = this.store.pipe(select(fromJobs.getSearchResults));

    this.typeCheck.clear();
    for (let index = 0; index < 2; index++) {
      this.typeCheck.push(new FormControl());
    }
  }

  private initCheckState(jobs: any): void {
    let checkState: any = {};
    const companies = jobs.map((a: any) => a.company);
    const titles = jobs.map((a: any) => a.title);
    this.companyArray = companies;
    this.titleArray = titles;
    this.companiesCheck.clear();
    this.titleCheck.clear();
    companies.forEach((element: any) => {
      this.companiesCheck.push(new FormControl(false));
      checkState[element] = false;
    });
    titles.forEach((element: any) => {
      this.titleCheck.push(new FormControl(false));
      checkState[element] = false;
    });
    this.checkState = JSON.parse(JSON.stringify(checkState));
  }

  private updateCheckStates(jobs: any) {
    let checkState: any = {};
    const companies = jobs.map((a: any) => a.company);
    const titles = jobs.map((a: any) => a.title);
    this.companyArray = companies;
    this.titleArray = titles;
    this.companiesCheck.clear();
    this.titleCheck.clear();
    companies.forEach((element: any) => {
      const val = this.checkState[element] || false;
      if (this.checkState[element] === undefined) {
        checkState[element] = false;
      } else {
        checkState[element] = this.checkState[element];
      }
      this.companiesCheck.push(new FormControl(val));
    });
    titles.forEach((element: any) => {
      const val = this.checkState[element] || false;
      if (this.checkState[element] === undefined) {
        checkState[element] = false;
      } else {
        checkState[element] = this.checkState[element];
      }
      this.titleCheck.push(new FormControl(val));
    });
    this.checkState = checkState;
  }

  resetFilter() {
    this.store.dispatch(jobsActions.getJobs());
    this.jobs$ = this.store.pipe(select(fromJobs.selectJobs));
    this.companyArray = [];
  }

  updateCheckState(key: string, value: boolean) {
    this.checkState[key] = value;
  }

  // Searching blank string will retrieve all data
  search(): void {
    let query = this.buildFilter();
    this.store.dispatch(jobsActions.filterJobRequest({ query: query }));
  }

  buildFilter(): string {
    let query = "?q=" + this.keyword.value;
    console.log(this.companiesCheck);
    console.log(this.titleCheck);
    this.companiesCheck.controls.forEach((fc, index) => {
      if (fc.value) {
        query += "&company=" + this.companyArray[index];
      }
    });
    this.titleCheck.controls.forEach((fc, index) => {
      if (fc.value) {
        query += "&title=" + this.titleArray[index];
      }
    });
    this.typeCheck.controls.forEach((fc, index) => {
      if (fc.value) {
        query += "&type=" + index;
      }
    });
    return query;
  }

  get keyword(): FormControl {
    return this.formGroup.get("keyword") as FormControl;
  }

  get companiesCheck(): FormArray {
    return this.formGroup.get("companiesCheck") as FormArray;
  }

  get titleCheck(): FormArray {
    return this.formGroup.get("titleCheck") as FormArray;
  }

  get typeCheck(): FormArray {
    return this.formGroup.get("typeCheck") as FormArray;
  }
}
