import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoadingComponent } from './component/loading/loading.component';
import { LoginComponent } from './component/login/login.component';
import { ChangepasswordComponent } from './component/changepassword/changepassword.component';
import { EditProfileComponent } from './component/editProfile/editProfile.component';
import { ProfilePicComponent } from './component/profile-pic/profile-pic.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { HomeComponent } from './component/home/home.component';
import { NgxLoadingModule } from 'ngx-loading';
// import { NgChartsModule } from 'ng2-charts';
import { BatchComponent } from './component/batch/batch.component';
import { BatchDeleteDialogComponent } from './component/batch-delete-dialog/batch-delete-dialog.component';
import { AddBatchDialogeComponent } from './component/add-batch-dialoge/add-batch-dialoge.component';
import { AddCandidateDialogComponent } from './component/add-candidate-dialog/add-candidate-dialog.component';
import { BatchdetailsComponent } from './component/batchdetails/batchdetails.component';
import { CandidateDeleteDialogComponent } from './component/candidate-delete-dialog/candidate-delete-dialog.component';
import { ChangebatchstatusComponent } from './component/changebatchstatus/changebatchstatus.component';
import { RemapdialogComponent } from './component/remapdialog/remapdialog.component';
import { ShowMentorDetailsComponent } from './component/show-mentor-details/show-mentor-details.component';
import { UnassignconfirmComponent } from './component/unassignconfirm/unassignconfirm.component';
import { DisplayBatchesComponent } from './component/display-batches/display-batches.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MentorComponent } from './component/mentor/mentor.component';
import { MatSelectModule } from '@angular/material/select';
import { MentorDataDailogComponent } from './component/mentor-data-dailog/mentor-data-dailog.component';
import { MentorDeleteconfirmComponent } from './component/mentor-deleteconfirm/mentor-deleteconfirm.component';
import { MentorDialogComponent } from './component/mentor-dialog/mentor-dialog.component';
import { MentorSheetDialogComponent } from './component/mentor-sheet-dialog/mentor-sheet-dialog.component';
import { CoordinatorComponent } from './component/coordinator/coordinator.component';
import { CoordinatorDeleteDialogComponent } from './component/coordinator-delete-dialog/coordinator-delete-dialog.component';
import { CoordinatorDialogComponent } from './component/coordinator-dialog/coordinator-dialog.component';
import { LearnersComponent } from './component/learners/learners.component';
import { LearnersUpdateDialogComponent } from './component/learners-update-dialog/learners-update-dialog.component';
import { SearchBarComponent } from './component/search-bar/search-bar.component';
import { FilterPipe, FilterPipeAllBatch, FilterPipeBatch, FilterPipeCoordinator, FilterPipeMentor } from './Pipes/filter.pipe';
import { SettingComponent } from './component/setting/setting.component';
import { SettingsNewComponent } from './component/settings-new/settings-new.component';
import { NewTimeSlotDialogComponent } from './component/new-time-slot-dialog/new-time-slot-dialog.component';
import { AddProgramTypeComponent } from './component/add-program-type/add-program-type.component';
import { TechstackDeleteconfirmComponent } from './component/techstack-deleteconfirm/techstack-deleteconfirm.component';
import { DeleteconfirmProgramTypeComponent } from './component/deleteconfirm-program-type/deleteconfirm-program-type.component';
import { TechstackDialogComponent } from './component/techstack-dialog/techstack-dialog.component';
import { TimeslotDeleteconfirmComponent } from './component/timeslot-deleteconfirm/timeslot-deleteconfirm.component';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import { TableDemoComponent } from './component/table-demo/table-demo.component';
// import { UploadExcelDialogComponent } from './component/upload-excel-dialog/upload-excel-dialog.component';
// import { DashboardComponent } from './component/dashboard/dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoadingComponent,
    ChangepasswordComponent,
    EditProfileComponent,
    ProfilePicComponent,
    HomeComponent,
    // DashboardComponent,
    BatchComponent,
    BatchDeleteDialogComponent,
    AddBatchDialogeComponent,
    AddCandidateDialogComponent,
    BatchdetailsComponent,
    CandidateDeleteDialogComponent,
    CandidateDeleteDialogComponent,
    RemapdialogComponent,
    UnassignconfirmComponent,
    ChangebatchstatusComponent,
    ShowMentorDetailsComponent,
    DisplayBatchesComponent,
    MentorComponent,
    MentorDataDailogComponent,
    MentorDeleteconfirmComponent,
    MentorSheetDialogComponent,
    MentorDialogComponent,
    CoordinatorComponent,
    CoordinatorDeleteDialogComponent,
    CoordinatorDialogComponent,
    LearnersComponent,
    LearnersUpdateDialogComponent,
    // UploadExcelDialogComponent
    SearchBarComponent,
    FilterPipe,
    SettingComponent,
    SettingsNewComponent,
    NewTimeSlotDialogComponent,
    AddProgramTypeComponent,
    TechstackDeleteconfirmComponent,
    DeleteconfirmProgramTypeComponent,
    TechstackDialogComponent,
    TimeslotDeleteconfirmComponent,
    FilterPipeCoordinator,
    FilterPipeMentor,
    FilterPipeBatch,
    FilterPipeAllBatch,
    TableDemoComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    ReactiveFormsModule, // forms
    HttpClientModule,
    FormsModule, // module form
    BrowserAnimationsModule,
    ImageCropperModule,
    NgxLoadingModule.forRoot({}),
    // NgChartsModule,
    InfiniteScrollModule,
    MatSelectModule,   
    MatIconModule 

    
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
  entryComponents:[
    // UploadExcelDialogComponent
  ]
})
export class AppModule { }
