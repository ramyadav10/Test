import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { BatchComponent } from './component/batch/batch.component';
import { BatchdetailsComponent } from './component/batchdetails/batchdetails.component';
import { CoordinatorComponent } from './component/coordinator/coordinator.component';
// import { DashboardComponent } from './component/dashboard/dashboard.component';
import { HomeComponent } from './component/home/home.component';
import { LearnersComponent } from './component/learners/learners.component';
import { LoginComponent } from './component/login/login.component';
import { MentorComponent } from './component/mentor/mentor.component';
import { SettingComponent } from './component/setting/setting.component';
import { SettingsNewComponent } from './component/settings-new/settings-new.component';
import { TableDemoComponent } from './component/table-demo/table-demo.component';

const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'home', component: HomeComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'batch/Trial', component: BatchComponent },
      { path: "batchinfo/:id", component: BatchdetailsComponent },
      { path: 'batch/CFP', component: BatchComponent },
      { path: 'batch/RFP', component: BatchComponent },
      { path: 'batch/LFP', component: BatchComponent },
      { path: 'batch/CQA', component: BatchComponent },
      // { path: 'info', component: CandidateinfoComponent },
      { path: 'coordinator', component: CoordinatorComponent },
      { path: 'learners', component: LearnersComponent },
      { path: 'mentor', component: MentorComponent },
       { path: 'newSetting', component: SettingsNewComponent },
       { path: 'tableDemo', component: TableDemoComponent },
      // { path: 'companylisting', component: CompanyListingComponent }

    ],
    canActivate: [AuthGuard], canActivateChild: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }