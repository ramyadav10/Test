import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BatchService } from 'src/app/service/batch.service';
import { BatchDeleteDialogComponent } from '../batch-delete-dialog/batch-delete-dialog.component';
//  import { HiringService } from 'src/app/service/hiring.service';
import { UtilityService } from 'src/app/service/utility.service';
import { ToastType } from 'src/app/model/ToastType.enum';

@Component({
  selector: 'app-candidate-delete-dialog',
  templateUrl: './candidate-delete-dialog.component.html',
  styleUrls: ['./candidate-delete-dialog.component.scss']
})
export class CandidateDeleteDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<BatchDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private utility: UtilityService, private batchService: BatchService) {

  }

  ngOnInit() {
  }
  close() {
    this.dialogRef.close('close');
  }

  confirmDelete() {
    let token = localStorage.getItem('token');
    this.batchService.removeCandidate(token, this.data.candidateId).subscribe(response => {
      this.utility.openLoader();
      if (response.status == 200) {
        this.dialogRef.close('success');
        this.utility.closeLoader();
      }
    }, err => {
      if (err.error && err.error.statuscode == 400) {
        this.utility.showToast('ERROR', err.error.message);
        this.utility.closeLoader();
      } else {
        this.utility.showToast('ERROR', 'Please Try Again Later!!');
      }
    }
    );

  }
}
