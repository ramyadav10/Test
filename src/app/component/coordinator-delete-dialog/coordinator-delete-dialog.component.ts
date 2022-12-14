import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth/auth.service';
import { CoordinatorService } from 'src/app/service/coordinator.service';
import { UtilityService } from 'src/app/service/utility.service';

@Component({
  selector: 'app-coordinator-delete-dialog',
  templateUrl: './coordinator-delete-dialog.component.html',
  styleUrls: ['./coordinator-delete-dialog.component.scss']
})

export class CoordinatorDeleteDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CoordinatorDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private coordinator: CoordinatorService,private utility:UtilityService,private authService:AuthService) {
  }

  ngOnInit() {
  }

  close(){
    this.dialogRef.close('close');
  }

  removeCoordinator() {
    console.log("Inside");
    console.log(this.data);
    console.log(this.data.coordinatorId);
    if(this.authService.isAuthorised()){
    let token =localStorage.getItem('token');
    this.utility.openLoader();
    this.coordinator.removeCoordinator(this.data.coordinatorId,token).subscribe(response => {
      if(response.statuscode === 200){
        this.dialogRef.close();
        // this.utility.openLoader();
        this.utility.showToast('SUCCESS', response.message);
    } 
    },err =>{
      console.log(err)
      if(err.error && err.error.statuscode === 401 ){
        // this.utility.openLoader();
        this.utility.showToast('ERROR',err.error.message);
      } else {
        this.utility.openLoader();
        this.utility.errorHandler(err);
      }
    }
    
    );
    // this.utility.openLoader();
    this.dialogRef.close();
    this.utility.closeLoader();
  }
  this.utility.closeLoader();
  } 
}
