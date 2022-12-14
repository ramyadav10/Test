import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MentorService } from 'src/app/service/mentor.service';
import { UtilityService } from 'src/app/service/utility.service';

@Component({
  selector: 'app-timeslot-deleteconfirm',
  templateUrl: './timeslot-deleteconfirm.component.html',
  styleUrls: ['./timeslot-deleteconfirm.component.scss']
})
export class TimeslotDeleteconfirmComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<TimeslotDeleteconfirmComponent>,private mentorService:MentorService,private utility:UtilityService,@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }
  closeDialog(){
    this.dialogRef.close('close');
  }
  deleteTimeSlot(){
    console.log('Delete data',this.data);
    
      this.mentorService.delete(this.data.slotId.id,'timeslot/').subscribe((response: any)=>{
        if((response as any).status == 200){
          this.dialogRef.close();
          this.utility.closeLoader();
          this.utility.showToast('SUCCESS',(response as any).message);
          this.ngOnInit();
           }
        },(err: { error: { statuscode: number; message: string; }; }) =>{
          if(err.error && err.error.statuscode !== 200 ){
            this.utility.showToast('ERROR',err.error.message);
           this.utility.closeLoader();
          } else {
            this.utility.showToast('ERROR','Please Try Again Later!!');
          }
        }); 
      
         this.utility.closeLoader();
      }
}
