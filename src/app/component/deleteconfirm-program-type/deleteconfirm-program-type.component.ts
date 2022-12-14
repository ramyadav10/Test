import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MentorService } from 'src/app/service/mentor.service';
import { UtilityService } from 'src/app/service/utility.service';

@Component({
  selector: 'app-deleteconfirm-program-type',
  templateUrl: './deleteconfirm-program-type.component.html',
  styleUrls: ['./deleteconfirm-program-type.component.scss']
})
export class DeleteconfirmProgramTypeComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<DeleteconfirmProgramTypeComponent>, private mentorService: MentorService, private utility: UtilityService, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }
  closeDialog() {
    this.dialogRef.close('close');
  }
  deleteProgramType() {
    this.mentorService.deleteProgramType(this.data.programId).subscribe((response:any) => {
      if ((response as any).status == 200) {
        this.dialogRef.close();
        this.utility.closeLoader();
        this.utility.showToast('SUCCESS', (response as any).message);
        this.ngOnInit();
      }
    }, (err: { error: { statuscode: number; message: string; }; }) => {
      this.utility.closeLoader();
      if (err.error && err.error.statuscode !== 200) {
        this.utility.showToast('ERROR', err.error.message);
        this.utility.closeLoader();
      } else {
        this.utility.showToast('ERROR', 'Please Try Again Later!!');
      }
    });
  }
}
