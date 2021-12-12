import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { JobsComponent } from "./pages/jobs/jobs.component";
import { JobDescriptionComponent } from "./pages/job-description/job-description.component";
import { AddJobFormComponent } from "./pages/add-job-form/add-job-form.component";

const routes: Routes = [
  { path: "", component: JobsComponent },
  { path: "add", component: AddJobFormComponent },
  { path: ":id", component: JobDescriptionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobsRoutingModule {}
