import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Job } from "./shared/models/jobs";
import jobs from "./jobs/jobs.json";

@Injectable({
  providedIn: "root",
})
export class JobsService {
  constructor(private http: HttpClient) {}

  getJobs() {
    return this.http.get("http://localhost:3000/jobs");
  }

  getJob(id: number) {
    return this.http.get("http://localhost:3000/jobs/" + id);
  }

  addJob(job: Job) {
    return this.http.post<Job>("http://localhost:3000/jobs", job);
  }

  updateJob(job: Job) {
    return this.http.put<Job>("http://localhost:3000/jobs/" + job.id, job);
  }

  deleteJob(id: number) {
    return this.http.delete<Job>("http://localhost:3000/jobs/" + id);
  }

  filterJob(query: string) {
    return this.http.get("http://localhost:3000/jobs" + query);
  }
}
