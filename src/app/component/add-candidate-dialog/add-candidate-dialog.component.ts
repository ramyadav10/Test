import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { HiringService } from 'src/app/service/hiring.service';
import { UtilityService } from 'src/app/service/utility.service';
import { ToastType } from 'src/app/model/ToastType.enum';
// import { ExcelErrorDialogComponent } from '../excel-error-dialog/excel-error-dialog.component';


@Component({
  selector: 'app-add-candidate-dialog',
  templateUrl: './add-candidate-dialog.component.html',
  styleUrls: ['./add-candidate-dialog.component.scss']
})
export class AddCandidateDialogComponent implements OnInit {

  public candidateDetails: any = [];
  candidateData: any = [];
  emptyFieldRows: string = '';// var holds excel error row number
  mobileFieldRows: string = '';
  cicId: string = '';
  emailFieldRows: string = '';
  aggFieldRows: string = '';
  city: string = '';
  state: string = '';
  emailsFromDB: string = '';
  preferredJobLocation: string = '';

  disableCheck: boolean = false;
  passedOutYear!: number;
  constructor(private dialogRef: MatDialogRef<AddCandidateDialogComponent>,
    private snackBar: MatSnackBar, private hiringService: HiringService, private utility: UtilityService,
    private dialog: MatDialog) { }

  ngOnInit() {
    for (let i = 1; i <= 10; i++) {
      this.candidateDetails.push({
        cicId: null,
        fullName: null,
        email: null,
        mobileNum: null,
        hiredDate: null,
        degree: null,
        aggrPer: null,
        passedOutYear: null,
        // joinDate: null,
        // Location: null,
        city: null,
        state: null,
        preferredJobLocation: null,
        // attitudeRemark: null,
        // communicationRemark: null,
        // knowledgeRemark: null
      });
    }
  }

  close() {
    this.dialogRef.close(null);
  }
  submit() {
    this.candidateDetails.map((data: any) => {
      if (data.cicId != null && data.fullName != null && data.email != null
        && data.mobileNum != null && data.hiredDate != null && data.degree != null
        && data.aggrPer != null && data.passedOutYear != null && data.city != null && data.state != null && data.preferredJobLocation != null) {
        this.candidateData.push(data);
      }
    });

    if (this.candidateData.length !== 0)
      this.addCandidates();
  }
  addtable() {
    let coloumCheck = false;
    this.candidateDetails.map((data: any) => {
      if (data.cicId == null || data.fullName == null || data.email == null
        || data.mobileNum == null || data.hiredDate == null || data.degree == null
        || data.aggrPer == null || data.passedOutYear != null || data.city == null || data.state == null || data.preferredJobLocation == null) {
        this.snackBar.open('Rows Are Not Completely Filled', 'Ok', { duration: 2000, panelClass: 'custom-snackbar' });
        coloumCheck = true;
      }
    });
    if (coloumCheck === false) {
      for (let i = 1; i <= 5; i++) {
        this.candidateDetails.push({
          cicId: null,
          fullName: null,
          email: null,
          mobileNum: null,
          hiredDate: null,
          degree: null,
          aggrPer: null,
          passedOutYear: null,
          city: null,
          state: null,
          preferredJobLocation: null
        });
      }
    }
  }


  addCandidates() {
    this.hiringService.addCandidates(this.candidateData)
      .subscribe(response => {
        let responseFromDB = response as any;
        if (!responseFromDB.data.valid) {
          this.cicId = responseFromDB.data.cicId.toString();
          this.mobileFieldRows = responseFromDB.data.mobile.toString();
          this.emailFieldRows = responseFromDB.data.email.toString();
          this.aggFieldRows = responseFromDB.data.percentage.toString();
          this.city = responseFromDB.data.city.toString();
          this.state = responseFromDB.data.state.toString();
          this.passedOutYear = responseFromDB.data.passedOutYear.toString();
          this.emailsFromDB = responseFromDB.data.emailsFromDB.toString();
          this.preferredJobLocation = responseFromDB.data.preferredJobLocation.toString();
          this.disableCheck = false;
          this.openDialog();
        } else {
          this.dialogRef.close('success');
          this.utility.showToast(ToastType['SUCCESS'], (response as any).message);
        }
      }, (err) => {
        setTimeout(() => {
          this.utility.showToast('ERROR', "Something went wrong");
        }, 1000)
      });
  }

   openDialog(): void {

  //   const errorDialogRef = this.dialog.open(ExcelErrorDialogComponent, {
  //     width: "100%",
  //     height: "100%",
  //     maxWidth: "100vw",
  //     maxHeight: "100vh",
  //     data: {
  //       cicId: this.cicId,
  //       mobileFieldRows: this.mobileFieldRows,
  //       emptyFieldRows: this.emptyFieldRows,
  //       emailFieldRows: this.emailFieldRows,
  //       aggFieldRows: this.aggFieldRows,
  //       city: this.city,
  //       state: this.state,
  //       passedOutYear: this.passedOutYear,
  //       emailsFromDB: this.emailsFromDB,
  //       preferredJobLocation: this.preferredJobLocation,
  //       excelFileName: 'excel file',
  //     }
  //   });

  //   errorDialogRef.afterClosed().subscribe(result => {

  //   });
   }
}
