import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ListContainer } from '../../model/ListContainer.model';
import { BatchService } from '../../service/batch.service';
import { UtilityService } from '../../service/utility.service';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { HiringService } from '../../service/hiring.service'
import { ToastType } from 'src/app/model/ToastType.enum';
import { StatusValue } from '../../model/CandidateStatusModel'
@Component({
  selector: 'app-remapdialog',
  templateUrl: './remapdialog.component.html',
  styleUrls: ['./remapdialog.component.scss'],



})
export class RemapdialogComponent implements OnInit {
  public statusValue = new StatusValue()
  
  batches = new ListContainer(35);
  selected:any = [];
  newBatchId: any
  currentBatchId: any
  public BatchName = ''
  batchname = ''
  cadidateid: Number
  name: any;
  CIC_ID: any;
  RempForm: FormGroup
  status = false
  candidateStatus: any
  StatusArray: any
  show = false
  showReson = false
  PreviousStatus: any
  ParameterId: any
  BatchArray: any
  StartDate: any
  batchType: any
  ExitReasonArray: any
  Reason: any
  
  ExReason = ''
  constructor(
    public dialogRef: MatDialogRef<RemapdialogComponent>, private formBuilder: FormBuilder, private utilityService: UtilityService,
    @Inject(MAT_DIALOG_DATA) public data: any, private batchService: BatchService, private hiringService: HiringService, private utility: UtilityService) {

    if (data.status == 'change') {
      this.status = true
    }
    // console.log(data);

    this.PreviousStatus = data.data.candidateStatus
    // console.log(data);
    this.batchType = data.batchDetails.batchType
    this.StatusArray = data.StatusArray
    this.ExitReasonArray = data.Info.exitResonArray

    if (this.batchType === 'CFP') {
      this.StatusArray = data.StatusArray.filter((item: { keyValue: string; }) => {


        return item.keyValue === 'DROPPED' || item.keyValue === 'MOVECFP' || item.keyValue === 'DLYD' || item.keyValue === 'CMPL'
      })
    }
    if (data.data.candidateStatus == 'IN_PROCESS') {

      this.PreviousStatus = data.data.candidateStatus

    }
    this.CIC_ID = data.data.cicId
    this.currentBatchId = data['currentBatchId']
    this.cadidateid = data.data.id
    this.selected.push(data.data.id)
    this.name = data.data.fullName,
      this.candidateStatus = data.data.candidateStatus


    this.getAllBatches('Trial')

    this.RempForm = this.formBuilder.group({
      Batch: ['', [Validators.required]],
      Reason: ['', Validators.required],
      StartDate: [new Date(), Validators.required],
      cStatus: ['', Validators.required],
      ExitReason: ['']
    });


  }
  public hasError = (formControlName: string, errorName: string) => {
    return this.RempForm.controls[formControlName].hasError(errorName);
  }

  onSubmit(): void {
    this.dialogRef.close();
  }


  ngOnInit() {

  }

  selectExitReason(ev: { keyText: any; }) {
    // console.log(ev);
    this.Reason = ev.keyText


  }
  array = []
  getAllBatches(status: boolean | String) {
    this.BatchArray = []

    let token = localStorage.getItem('token');
    if (status) {
      this.batches.pageNumber = 0;
      this.batches.dataList = [];
    }
    console.log('hello data');
    
    this.batches.pageNumber = this.batches.pageNumber + 1;
    let Status = 'INPROGRESS'
    this.batches.dataList = [];
    this.BatchArray.splice(0, this.BatchArray.length)
    this.batchService.getBatchList(token, status).subscribe((response: any) => {
      this.batches.dataList = [];

      console.log('response data ',response);
      
      if (response.status == 200) {
        this.batches.dataList = this.batches.dataList.concat(((response as any).data));
        let arr = []
        arr = response.data
        this.BatchArray = []
        for (let i = 0; i < arr.length; i++) {

          let dta = {
            id: arr[i][0],
            batchName: arr[i][1]
          }
          this.BatchArray.push(dta)
        }
        this.utility.closeLoader();
        this.utility.showToast('SUCCESS',response.message);
      }
    }, err => {
      if (err.error && err.error.statuscode == 401) {
        this.utility.showToast('ERROR', err.error.message);
        this.utility.closeLoader();
      } else {
        this.utility.errorHandler(err);
      }
    }
    );
    this.utility.closeLoader();
  }

  selectBatch(item: { id: any; }) {
    this.newBatchId = item.id
  }

  selectStatus(item: { id: any; keyValue: String; }) {
    this.Reason = ''

    this.newBatchId = undefined
    this.ParameterId = item.id
    // console.log(item);
    
    if (item.keyValue === this.statusValue.MOVECFP || item.keyValue === this.statusValue.REMAP || item.keyValue === this.statusValue.MOVEBRP) {
      this.show = true
      this.showReson = false
      this.Reason = ''
      if (item.keyValue === this.statusValue.MOVECFP) {
        this.Reason = ''
        this.getAllBatches(this.statusValue.cfp)
        this.BatchArray = []
      } else if (item.keyValue === this.statusValue.REMAP) {
        this.Reason = ''
        this.getAllBatches(this.statusValue.rfp)
        this.BatchArray = []
      }else if (item.keyValue === this.statusValue.MOVEBRP) {
        this.Reason = ''
        this.getAllBatches(this.statusValue.brp)
        this.BatchArray = []
      }
    } else if (item.keyValue === this.statusValue.DROPPED || item.keyValue === this.statusValue.DLYD || item.keyValue === this.statusValue.NOTSLCTFFP) {
      this.ExReason = this.Reason
      // console.log(this.ExReason);

      this.show = false
      this.showReson = true
    } else {
      this.show = false
      this.showReson = false
    }
  }

  changeCandidateStatus() {
    let token = localStorage.getItem('token')
    if (this.newBatchId === undefined && this.show === false) {
      let reqData;
      if (this.RempForm.value.cStatus.keyValue === this.statusValue.DROPPED || this.RempForm.value.cStatus.keyValue === this.statusValue.DLYD || this.RempForm.value.cStatus.keyValue === this.statusValue.NOTSLCTFFP) {
        // console.log();
        reqData = {
          "changeStatusDate": this.RempForm.value.StartDate,
          "changeStatusReason": this.RempForm.value.Reason,
          "candidateStatus": this.RempForm.value.cStatus.keyText,
          'exitReason': this.Reason
        }

      } else {

        reqData = {
          "changeStatusDate": this.RempForm.value.StartDate,
          "changeStatusReason": this.RempForm.value.Reason,
          "candidateStatus": this.RempForm.value.cStatus.keyText,

        }
      }
      console.log("reqData values",reqData);


      // console.log(reqData);

      let info = {
        parameterId: this.ParameterId,
        candidateId: this.cadidateid,
      }
      this.hiringService.changeStatusService(info, reqData).subscribe((res) => {
   
        let returnObj = {
          previousStatus: this.PreviousStatus,
          currentStatus: this.RempForm.value.cStatus.keyText
        }
        this.dialogRef.close(returnObj);


       
      }, err => {
        this.utilityService.showToast(ToastType['ERROR'], err.error.message);
      })
    } else {
      let reqData = {
        "programType": this.status,
        "remapDate": this.RempForm.value.StartDate,
        "remapReason": this.RempForm.value.Reason,
        "candidateStatus": this.RempForm.value.cStatus.keyText
      }
      let ids = {
        currentBatchId: this.currentBatchId,
        shiftingBatchId: this.newBatchId,
        candidateId: this.cadidateid,
        candidateStatus: this.RempForm.value.cStatus.keyText,
      }

      this.batchService.RemapCandidateStatusService(token, ids, reqData).subscribe((res: any) => {
        this.dialogRef.close(this.RempForm.value.cStatus.keyText);
    
      }, (err: any) => {
        console.log(err);
        
      })
    }
  }

  RemapToNewBatch(){

  }
  selectOption(event:any){

  }
  selectDate(event:any){

  }

// function push(id: any) {
//   throw new Error('Function not implemented.');
}

