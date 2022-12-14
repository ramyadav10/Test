import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BatchService } from '../../service/batch.service';
import { UtilityService } from '../../service/utility.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-changebatchstatus',
  templateUrl: './changebatchstatus.component.html',
  styleUrls: ['./changebatchstatus.component.scss']
})
export class ChangebatchstatusComponent implements OnInit {
  StatusForm: FormGroup
  batchName: any
  BatchStatusParams: any
  BatchSatus: any
  BatchId: any
  CandidateId: any
  ReadOnly = false
  CandidateName = ''
  CICID: any
  CandiDateStatus: any
  CurrentBatchName: any
  RemapDate: any
  parameterId: any
  RemapReason: any
  PreviousBatchStatus: any
  candyStatus: any
  CurrentBatchId: any
  constructor(
    public dialogRef: MatDialogRef<ChangebatchstatusComponent>, private formBuilder: FormBuilder, private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any, private batchService: BatchService, private utility: UtilityService) {


    this.PreviousBatchStatus = data.data.status

    if (data.Read == 'readOnly') {
      this.BatchId = data.data.id

      this.ReadOnly = true
      this.CandidateName = data.CandidateInfo.fullName,
        this.candyStatus = data.CandidateInfo.candidateStatus
      this.CICID = data.CandidateInfo.cicId
      this.CandidateId = data.CandidateInfo.id
      this.getRemapHistory()

    }

    if (data) {
      // this.status = true
      this.BatchStatusParams = data['StatusParms']
      this.batchName = data.data.batchName
      this.BatchId = data.data.id
      this.BatchSatus = data.data.status
      this.PreviousBatchStatus = data.data.status



    }


    this.StatusForm = this.formBuilder.group({

      BatchStatus: ['', [Validators.required]],
      ChangeStatusReason: ['', Validators.required],
      ChangeStatusDate: [new Date(), Validators.required]




    });
  }

  selectOption(e: { id: any; }) {
    this.parameterId = e.id

  }
  selectDate(event: any) {

  }
  ngOnInit() {
  }


  public hasError = (formControlName: string, errorName: string) => {
    return this.StatusForm.controls[formControlName].hasError(errorName);
  }

  onSubmit(): void {
    this.dialogRef.close();
  }

  gotoBatch() {
    // console.log(" its working");
    // this.dialogRef.close(this.StatusForm.value.BatchStatus.keyText);
    // console.log(this.CurrentBatchId);
    if (this.CurrentBatchId != undefined) {
      this.router.navigate(['home/batchinfo/' + this.CurrentBatchId])
      this.dialogRef.close(this.StatusForm.value.BatchStatus.keyText);
    }
    this.dialogRef.close(this.StatusForm.value.BatchStatus.keyText);




  }
  getRemapHistory() {
    let token = localStorage.getItem('token')

    if (this.candyStatus === 'Remap to other RFP Batch' || this.candyStatus === 'Moved to CFP') {

      this.batchService.getRemapHistory(token, this.CandidateId, this.BatchId).subscribe((res: any) => {
        console.log(res);
        this.CurrentBatchId = res.data.currentBatchId
        this.CurrentBatchName = res.data.currentBatch
        this.RemapDate = res.data.remapDate
        this.RemapReason = res.data.remapReason
        this.CandiDateStatus = res.data.candidateStatus

      }, (err: any) => {
        console.log(err);

      })
    } else {

      this.batchService.getCnadidateStatusHistory(token, this.CandidateId, this.BatchId).subscribe((res: any) => {
        this.CurrentBatchName = this.batchName

        this.RemapDate = res.data.changeStatusDate
        this.RemapReason = res.data.changeStatusReason
        this.CandiDateStatus = res.data.candidateStatus

      }, (err: any) => {
        console.log(err);

      })

    }

  }

  changeBatchStatus() {
    let token = localStorage.getItem('token')
    if (this.StatusForm.valid) {

      let data = {

        batchStatus: this.StatusForm.value.BatchStatus.keyValue,
        changeStatusDate: this.StatusForm.value.ChangeStatusDate,
        changeStatusReason: this.StatusForm.value.ChangeStatusReason,



      }

      let ids = {
        batchId: this.BatchId,
        parameterId: this.parameterId


      }
      console.log("data",data);
      

      this.batchService.ChangeBatchStatus(token, ids, data).subscribe((res: any) => {
        this.dialogRef.close(this.StatusForm.value.BatchStatus.keyText);


      }, (err: any) => {
        console.log(err);


      })
    }

  }


}
