// import { Component, OnInit } from '@angular/core';
// // import { MatButtonModule } from '@angular/material';
// // import { MatButtonModule } from '@angular/material/button';

// // import { ExcelService } from 'src/app/service/excel.service';
// import { CandidateData } from 'src/app/model/CandidadteData.model';
// // import { ExcelErrorDialogComponent } from '../excel-error-dialog/excel-error-dialog.component';
// import { UtilityService } from 'src/app/service/utility.service';
// import { HiringService } from 'src/app/service/hiring.service';
// import { ToastType } from 'src/app/model/ToastType.enum';
// import { MatDialog, MatDialogRef } from '@angular/material/dialog';

// export interface DialogData {
//   emptyFieldRows: string;
//   mobileFieldRows: string;
//   emailFieldRows: string;
//   aggFieldRows: string;
//   excelFileName: string;
//   // currentPincode: string;
//   emailsFromDB: string;
//   cicId: string;
//   city: string;
//   state: string;
//   passedOutYear: string;
//   preferredJobLocation: string;
//   // permanentPincode: string;

// }

// @Component({
//   selector: 'app-upload-excel-dialog',
//   templateUrl: './upload-excel-dialog.component.html',
//   styleUrls: ['./upload-excel-dialog.component.scss']
// })
// export class UploadExcelDialogComponent implements OnInit {

//   excelUploadedData: any[] = [];
//   excelFileName: string = '';
//   candidatesData: CandidateData[] = [];
//   fileName: string = 'No File Chosen';
//   emptyFieldRows: string = '';// var holds excel error row number
//   mobileFieldRows: string = '';
//   emailFieldRows: string = '';
//   aggFieldRows: string = '';
//   // currentPincode: string = '';
//   emailsFromDB: string = '';
//   // permanentPincode: string = '';

//   extensionCheck: boolean = false;// var to check file validation 
//   fileSizeCheck: boolean = false;
//   disableCheck: boolean = true; // var to enable and disable upload button

//   errorDialog = false;// var for error dialog 

//   constructor(private dialogRef: MatDialogRef<UploadExcelDialogComponent>,
//     private excelService: ExcelService, private dialog: MatDialog, private utility: UtilityService,
//     private hiringService: HiringService) { }

//   ngOnInit() {

//   }

//   selectedfile(file: any) {
//     this.fileName = file.target.files[0].name;
//     this.extensionCheck = false;
//     this.fileSizeCheck = false;
//     this.emptyFieldRows = '';
//     this.mobileFieldRows = '';
//     this.emailFieldRows = '';
//     this.aggFieldRows = '';
//     this.errorDialog = false;

//     let response = this.excelService.incomingfile(file);
//     if (response == 0) {
//       this.extensionCheck = true;
//       this.disableCheck = true;
//     }
//     else if (response == 1) {
//       this.fileSizeCheck = true;
//       this.disableCheck = true;
//     }
//     else if (response == 2) { this.disableCheck = false; }
//   }


//   uploadFile() {
//     this.utility.openLoader();
//     this.disableCheck = true;
//     this.emptyFieldRows = '';
//     this.mobileFieldRows = '';
//     this.emailFieldRows = '';
//     this.aggFieldRows = '';
//     this.errorDialog = false;
//     this.excelService.Upload();
//     setTimeout(() => {
//       this.excelUploadedData = this.excelService.excelFileData;
//       this.excelFileName = this.excelService.fileName;
//       let rowNumber = 0;

//       this.excelUploadedData.forEach(element => {
//         rowNumber++;

//         let candidateData: CandidateData = new CandidateData();
//         candidateData.cicId = element['CIC ID*'];
//         candidateData.fullName = element['Candidate Name*'];
//         candidateData.email = element['Email Id*'];
//         candidateData.mobileNum = element['Mobile*'];
//         candidateData.hiredDate = element['Hired Date*'];
//         candidateData.degree = element['Degree*'];
//         candidateData.aggrPer = element['Agg. Degree%*'];
//         candidateData.passedOutYear = element['Passed Out Year*'];
//         candidateData.city = element['City*'];
//         candidateData.state = element['State*'];
//         candidateData.preferredJobLocation = element['Preferred Region*'];
//         candidateData.rowNumber = rowNumber;

//         //empty field validation
//         if (this.excelService.emptyField(candidateData)) {
//           this.emptyFieldRows = this.emptyFieldRows == '' ?
//             this.emptyFieldRows + rowNumber.toString() : this.emptyFieldRows + ',' + rowNumber.toString();
//           this.errorDialog = true;
//           this.disableCheck = false;
//         }

//         //mobile field validation
//         if (this.excelService.mobileField(candidateData)) {
//           this.mobileFieldRows = this.mobileFieldRows == '' ?
//             this.mobileFieldRows + rowNumber.toString() : this.mobileFieldRows + ',' + rowNumber.toString();
//           this.errorDialog = true;
//           this.disableCheck = false;

//         }

//         //email field validation
//         if (this.excelService.emailField(candidateData)) {
//           this.emailFieldRows = this.emailFieldRows == '' ?
//             this.emailFieldRows + rowNumber.toString() : this.emailFieldRows + ',' + rowNumber.toString();
//           this.errorDialog = true;
//           this.disableCheck = false;

//         }

//         //agg field validation
//         if (this.excelService.aggField(candidateData)) {
//           this.aggFieldRows = this.aggFieldRows == '' ?
//             this.aggFieldRows + rowNumber.toString() : this.aggFieldRows + ',' + rowNumber.toString();
//           this.errorDialog = true;
//           this.disableCheck = false;
//         }

//         if (this.errorDialog == false) {
//           this.candidatesData.push(candidateData);
//         }
//       });

//       if (!this.errorDialog) {
//         let dataList = JSON.stringify(this.candidatesData);
//         let parsedDataList = JSON.parse(dataList);

//         this.hiringService.addCandidates(parsedDataList)
//           .subscribe(response => {
//             let responseFromDB = response as any;
//             if (!responseFromDB.data.valid) {
//               this.mobileFieldRows = responseFromDB.data.mobile.toString();
//               this.emailFieldRows = responseFromDB.data.email.toString();
//               this.aggFieldRows = responseFromDB.data.percentage.toString();
//               this.emailsFromDB = responseFromDB.data.emailsFromDB.toString();
//               this.errorDialog = true;
//               this.disableCheck = false;
//             } else {
//               setTimeout(() => {
//                 this.dialogRef.close('success');
//                 this.utility.closeLoader();
//                 this.utility.showToast(ToastType['SUCCESS'], (response as any).message);
//               }, 1000)
//             }
//           }, (err) => {
//             if (err.error && err.error.statuscode == 409) {
//               setTimeout(() => {
//                 this.utility.closeLoader();
//                 this.utility.showToast('ERROR', err.error.message);
//               }, 1000)
//             } else if (err.error && err.error.statuscode == 400) {
//               setTimeout(() => {
//                 this.utility.closeLoader();
//                 this.utility.showToast('ERROR', err.error.message);
//               }, 1000)
//             }
//             else {
//               setTimeout(() => {
//                 this.utility.closeLoader();
//                 this.utility.errorHandler(err);
//               }, 1000)
//             }
//           });
//       }
//     }, 2000);
//   }

//   openDialog(): void {
//     const dialogRef = this.dialog.open(ExcelErrorDialogComponent, {
//       disableClose: true,
//       width: "50%",
//       height: "50%",
//       data: {
//         emptyFieldRows: this.emptyFieldRows,
//         mobileFieldRows: this.mobileFieldRows,
//         emailFieldRows: this.emailFieldRows,
//         aggFieldRows: this.aggFieldRows,
//         excelFileName: this.excelFileName,
//         // currentPincode: this.currentPincode,
//         emailsFromDB: this.emailsFromDB,
//         // permanentPincode: this.permanentPincode
//       }
//     });

//     dialogRef.afterClosed().subscribe((result: any) => {

//     });
//   }

//   // method to set numbers of error rows 
//   errorRows(fieldName: string, condition: boolean, rowNumber: number) {
//     if (condition) {
//       fieldName = rowNumber == 1 ?
//         fieldName + rowNumber.toString() : fieldName + ',' + rowNumber.toString();
//     }
//   }
//   close() {
//     this.dialogRef.close(null);
//   }
// }
