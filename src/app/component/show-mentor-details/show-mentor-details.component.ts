import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoordinatorService } from '../../service/coordinator.service';
import { MentorService } from '../../service/mentor.service';

import { UtilityService } from '../../service/utility.service';
import { FormBuilder } from '@angular/forms';
import { HiringService } from '../../service/hiring.service';
import { MentorDTO } from 'src/app/model/mentor-dto.model';
import { BatchService } from 'src/app/service/batch.service';

@Component({
  selector: 'app-show-mentor-details',
  templateUrl: './show-mentor-details.component.html',
  styleUrls: ['./show-mentor-details.component.scss'],
})
export class ShowMentorDetailsComponent implements OnInit {
  mentorId: any;
  email: any;
  mobile: any;
  fname: any;
  lname: any;
  categiry: any;
  mentorType: any;
  copiedData: any;
  cordinator: any;
  rol: any;

  mentorDescription!: any;
  mentorRole!: any;
  mobileNumber!: any;
  name!: any;

  public mentorDetails: MentorDTO[] = [];

  constructor(
    public dialogRef: MatDialogRef<ShowMentorDetailsComponent>,
    private formBuilder: FormBuilder,
    private coordinatorService: CoordinatorService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private mentorService: MentorService,
    private hiringService: HiringService,
    private utility: UtilityService,
    private batchService: BatchService
  ) {
    console.log('constructor', data);
    if (data) {
      this.mentorId = data.data;
      this.cordinator = data.co;
      console.log(this.mentorId);
      console.log(this.cordinator);
      
      this.getDetails();
    }
  }

  ngOnInit() {}

 
  getDetails() {
    // this.utility.openLoader();
    if (this.cordinator === 'co') {
      this.coordinatorService.getCoordinatorDetails(this.mentorId).subscribe(
        (res: any) => {
          console.log(res);
          this.name = res.data.firstName +" "+res.data.lastName;
          this.mobileNumber = res.data.mobileNo;
          this.email = res.data.emailId;
          this.categiry = res.data.secondaryMobileNo
          this.mentorType = "mentorType is hardcode";
          this.utility.closeLoader();
          this.copiedData = `${this.email}, ${this.fname} ${this.lname}, ${this.mobile}`;
        },
        (err: { error: { error: { msg: string }[] } }) => {
          this.utility.showToast('Error', err.error.error[0].msg);

          this.utility.closeLoader();
          console.log(err);
        }
      );
    } else {
      this.mentorService.getMentorDetails(this.mentorId).subscribe(
        (res: any) => {
          // console.log(res.data);
          this.name = res.data.name;
        this.mobileNumber = res.data.mobileNumber;
        this.email = res.data.email;
        this.mentorRole = res.data.mentorRole;
        this.mentorType = res.data.mentorType;
        this.mentorDescription = res.data.mentorDescription;
        this.utility.closeLoader();
          this.mobile = res.data.mobileNumber;
          this.categiry = res.data.mentorDescription;
          this.mentorType = res.data.mentorType;
          this.rol = res.data.mentorRole;
          if (this.rol === 'Lead') {
            this.rol = 'Main Mentor';
          }
          this.utility.closeLoader();
          this.copiedData = `${this.email}, ${this.fname} ${this.lname},  ${this.mobile}`;
        },
        (err: { error: { error: { msg: string }[] } }) => {
          this.utility.showToast('Error', err.error.error[0].msg);
          this.utility.closeLoader();

          console.log(err);
        }
      );
    }
  }

  onSubmit() {
    this.dialogRef.close();
  }
}
