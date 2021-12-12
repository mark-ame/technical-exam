import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import { JobsRoutingModule } from "./jobs-routing.module";
import { JobsComponent } from "./pages/jobs/jobs.component";
import { JobComponent } from "./pages/jobs/job/job.component";
import { JobDescriptionComponent } from "./pages/job-description/job-description.component";
import { AddJobFormComponent } from "./pages/add-job-form/add-job-form.component";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    JobsComponent,
    JobComponent,
    JobDescriptionComponent,
    AddJobFormComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    JobsRoutingModule,
    ReactiveFormsModule,
  ],
})
export class JobsModule {}
