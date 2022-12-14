import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BatchService } from 'src/app/service/batch.service';
import { UtilityService } from 'src/app/service/utility.service';

@Component({
  selector: 'app-batch-delete-dialog',
  templateUrl: './batch-delete-dialog.component.html',
  styleUrls: ['./batch-delete-dialog.component.scss']
})
export class BatchDeleteDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<BatchDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private utility:UtilityService,private batchService:BatchService) { 
    }

  ngOnInit() {
  }
  close(){
    this.dialogRef.close('close');
  }
  deleteBatch(){
    let token =localStorage.getItem('token');
    this.batchService.deleteBatch(token,this.data.batchId).subscribe((response:any) => {
      this.utility.openLoader();
        if(response.status == 200){
          this.dialogRef.close();
        this.utility.closeLoader();
      } 
      },(err: { error: { statuscode: number; message: any; }; }) =>{
        console.log(err)
        if(err.error && err.error.statuscode == 400 ){
          this.utility.showToast('ERROR',err.error.message);
          this.utility.closeLoader();
        } else {
          this.utility.showToast('ERROR','Please Try Again Later!!');
        }
      }
      );
  }
}
