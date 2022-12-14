// import { Component, OnInit, Inject } from '@angular/core';
// import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// import { HiringService } from 'src/app/service/hiring.service';
// import { UtilityService } from 'src/app/service/utility.service';
// import { ToastType } from 'src/app/model/ToastType.enum';

// @Component({
//   selector: 'app-joincandidate',
//   templateUrl: './joincandidate.component.html',
//   styleUrls: ['./joincandidate.component.scss']
// })

// export class JoincandidateComponent implements OnInit {
//   studentDetails: any;

//   constructor( @Inject(MAT_DIALOG_DATA) private data: { studentData: any },
//   private dialogRef: MatDialogRef<JoincandidateComponent> ,private hiringService:HiringService,
//   private utility:UtilityService) { }

//   ngOnInit() {
//   }
//   conformJoin() {
//     this.studentDetails = this.data.studentData;
//     console.log(this.studentDetails);

//     this.hiringService.updateCandidateStatus(this.studentDetails.id,"JOINED")
//     .subscribe(response =>{
//       console.log(response);
//       this.utility.showToast(ToastType['SUCCESS'], (response as any).message);
//       this.dialogRef.close('success');
//     },(error)=>{
//       this.utility.showToast(ToastType['ERROR'],'Failed To Update Status');
//     });
//   }
//   close() {
//     this.dialogRef.close(null);

//   }
// }
