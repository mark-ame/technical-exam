import { Component, Input, OnInit } from "@angular/core";
import { Job, JobType } from "../../../../shared/models/jobs";

@Component({
  selector: "app-job",
  templateUrl: "./job.component.html",
  styleUrls: ["./job.component.scss"],
})
export class JobComponent implements OnInit {
  @Input() job: Job | null = null;

  JobType = JobType;

  constructor() {}

  ngOnInit(): void {}
}
