import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { BatchService } from 'src/app/service/batch.service';
import { UtilityService } from 'src/app/service/utility.service';
import { DatePipe } from '@angular/common';
import { AuthService } from 'src/app/auth/auth.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { bType, CandidateData } from 'src/app/model/CandidadteData.model';
import { TechStack } from 'src/app/model/TechStack';
import { BatchComponent } from '../batch/batch.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-batch-dialoge',
  templateUrl: './add-batch-dialoge.component.html',
  styleUrls: ['./add-batch-dialoge.component.scss',],
  providers: [DatePipe]

})
export class AddBatchDialogeComponent implements OnInit {
  public AddBatchDetails: FormGroup;
  BatchName: any;
  StartDate: any;
  EndDate: any;
  newdate:any;
  SessionTime: any;
  Coordinator: any;
  Buddy: any;
  Support: any;
  PracticeHead: any;
  teckSatck: any;
  Lead: any;
  GoogleClassLink: any;
  SessionLink: any;
  ActualEndDate: any;
  enable = true
  batch = {
    techStack: ''
  }
  batchStandard = {
    batchType!: null,
    batchNumber!: null,
    praticeHead!: null,
    date!: null,
    track: "-TRACK 2.1-",
    techStack!: null
  }
  // teckSatck:any
  picker1: any;
  batchType: any[] = [];
  mainMentorsType: any
  startDate!:Date;
  enddate!: Date;
  b = { BatchName: "", enddate: Date, picker1: '' };
  mainbackup: CandidateData[] = [];

  sessionTimeId: any
  @Output()
  dateChange!: EventEmitter<MatDatepickerInputEvent<any>>;
  mainMentorId: any;
  supportId: any;
  backupMentorId: any;
  practiceHeadId: any;
  coordinatorId: any;
  teckStackId: any;
  SupportMentorType: any;
  MainMentortype: any;
  techStackUpdate: any;
  BatchTypeUpdate: any;
  batchTypeId: any;
  mainMentorUpdate: any;
  timeSlotUpdate: any;
  SupportUpdate: any;
  backupMentorUpdate: any;
  coordinatorUpdate: any;

  techStack: any;
  buddy!: CandidateData[];
  lead: any
  // lead: string[]=[]
  practiceHead!: CandidateData[]
  support!: CandidateData[]
  timeSlots!: TechStack[]
  coordinators!: CandidateData[]
  techStackImageUrl: any
  bNumber:any;
  bTyp:String='';

  constructor(private router: Router,private route: ActivatedRoute,private utilityService: UtilityService,
    public dialogRef: MatDialogRef<AddBatchDialogeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder,
    private batchSerice: BatchService, private utility: UtilityService, private datePipe: DatePipe, private authService: AuthService) {
    dialogRef.disableClose = true;
    const reg = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

  

    this.AddBatchDetails = this.formBuilder.group({

      BatchName: ['', [Validators.required, Validators.minLength(3)]],
      StartDate: ['', [Validators.required]],
      EndDate: ['', [Validators.required]],
      ActualEndDate: [''],
      MainMentor: ['', [Validators.required]],
      teckSatck: ['', [Validators.required]],
      PracticeHead: ['', [Validators.required]],
      Support: ['', []],
      BackupMentor: ['', []],
      Coordinator: ['', [Validators.required]],
      SessionTime: ['', [Validators.required]],
      BatchType: ['', [Validators.required]],
      batchNumber: ['', [Validators.required]],
      SessionLink: ['', [Validators.required, Validators.pattern(reg)]],
      GoogleClassLink: ['', [Validators.required, Validators.pattern(reg)]],
      BatchSheetUrl: ['', [Validators.required, Validators.pattern(reg)]],
      NpsSurveyUrl: ['', []],
      MakerLink: ['', []],
      TechType: ['']

    })

    if (this.AddBatchDetails.value.BatchType != '' &&
      this.AddBatchDetails.value.batchNumber != '' &&
      this.AddBatchDetails.value.PracticeHead != '' &&
      this.AddBatchDetails.value.teckSatck != '') {

      this.b.BatchName = ""
      this.b.BatchName = this.AddBatchDetails.value.BatchType + "-" +
        this.AddBatchDetails.value.batchNumber + "-" +
        this.AddBatchDetails.value.PracticeHead + "-TRACK 2.1-" +
        this.AddBatchDetails.value.teckSatck

        
    }
    // this.utility.openLoader();
    // console.log(" data is ", data);
    

    if (data !== null) {
      let dte = data.batch.computedFinishDate
      this.enddate = new Date(dte)

    }


    if (data !== null) {
      this.bNumber=data.batch.batchNumber
      this.teckSatck = data.batch.techStack,
        this.batchStandard.batchType = data.batch.batchType
      this.batchStandard.praticeHead = data.batch.praticeHead
      this.batchStandard.batchNumber = data.batch.batchNumber
      this.batchStandard.date = data.batch.startDate
      this.batchStandard.techStack = data.batch.techStack
      this.b.BatchName = this.batchStandard.batchType + "-" +
        this.batchStandard.batchNumber + "-" +
        this.batchStandard.praticeHead + "-" +
        this.batchStandard.date + "-TRACK 2.1-" +
        this.batchStandard.techStack

      this.techStackImageUrl = data.batch.techStackImageUrl,
        //  MainMentor.firstName= data.batch.mainMentor,



        this.b.BatchName = data.batch.batchType + "-" +
        data.batch.batchNumber + "-" +
        data.batch.praticeHead + "-" + this.datePipe.transform(data.batch.startDate, 'MMy') + "-TRACK 2.1-" +
        data.batch.techStack


      if (data.batch.actualEndDate === null) {
        this.AddBatchDetails.patchValue({
          ActualEndDate: '',
          EndDate: ''
        })
      } else {
        this.AddBatchDetails.patchValue({
          ActualEndDate: new Date(data.batch.actualEndDate),
        })
      }
      this.AddBatchDetails.patchValue({

        BatchType: { acronym: data.batch.batchType,id: data.batch.batchTypeId },
        batchNumber: data.batch.batchNumber,

        StartDate: new Date(data.batch.startDate),
        EndDate: new Date(data.batch.computedFinishDate),

        teckSatck: {
          techName: data.batch.techStack,
          id: data.batch.techStackId
        },


        TechType: data.batch.techType,

        PracticeHead: { firstName: data.batch.praticeHead, id: data.batch.praticeHeadId },
        MainMentor: { firstName: data.batch.mainMentor, id: data.batch.mainMentorId, mentorType: data.batch.mainMentorType },

        Support: { firstName: data.batch.support, id: data.batch.supportId, mentorType: data.batch.supportMentorType },

        BackupMentor: { firstName: data.batch.backupMentor, id: data.batch.backupMentorId },

        Coordinator: { firstName: data.batch.coordinator, _id: data.batch.coordinatorId },

        SessionTime: { timeSlot: data.batch.sessionTime, id: data.batch.sessionTimeId },
        MakerLink: data.batch.makerProgramLink,

        SessionLink: data.batch.sessionLiveLink,
        GoogleClassLink: data.batch.googleClassLink,
        NpsSurveyUrl: data.batch.npsSurveyUrl,
        BatchSheetUrl: data.batch.batchSheetUrl,





      })
      // console.log("patched values ", this.AddBatchDetails);


    }


  }





  compareBathType(t1: any, t2: any) {
    // console.log(t1.acronym);
    // console.log(t2);
    // && o1.id == o2.id

    return (t1.acronym == t2.acronym);

  }
  compareSessionTime(t1: any, t2: any) {
    // console.log(t1.timeSlot);
    // console.log(t2);
    // && o1.id == o2.id

    return (t1.timeSlot == t2.timeSlot && t1.id == t2.id);

  }
  compareCoordinator(o1: any, o2: any) {
    // console.log(o1.firstName);
    // console.log(o2.firstName);
    //  console.log(o1.id);
    // console.log(o2.id);
    // && o1.id == o2.id

    return (o1.firstName == o2.firstName && o1._id == o2._id);

  }
  compareMainMentor(o1: any, o2: any) {
    // console.log(o1.firstName);
    // console.log(o2.firstName);
    //  console.log(o1.id);
    // console.log(o2.id);
    // && o1.id == o2.id

    return (o1.firstName == o2.firstName && o1.id == o2.id);

  }
  compareFunction(o1: any, o2: any) {
    // console.log(o1.techName);
    // console.log(o2.techName);
    // && o1.id == o2.id

    return (o1.techName == o2.techName && o1.id == o2.id);
  }
  onNoClick(): void {
    this.dialogRef.close('close');
  }

  public hasError = (formControlName: string, errorName: string) => {
    return this.AddBatchDetails.controls[formControlName].hasError(errorName);
  }



  selectOption(value: { acronym: null; id: any; }) {
    

    this.batchStandard.batchType = null;
    this.batchStandard.batchType = value.acronym;
    this.BatchTypeUpdate = value.acronym
    this.batchTypeId = value.id
    if (this.data !== null) {

      this.b.BatchName = this.batchStandard.batchType + "-" +
        this.batchStandard.batchNumber + "-" +
        this.batchStandard.praticeHead + "-" +
        this.batchStandard.date + "-TRACK 2.1-" +
        this.batchStandard.techStack



    }

    if (this.batchStandard.batchType !== null &&
      this.batchStandard.batchNumber !== null &&
      this.batchStandard.praticeHead !== null &&
      this.batchStandard.date !== null &&
      this.batchStandard.techStack !== null
    ) {

      this.b.BatchName = ""
      this.b.BatchName = this.batchStandard.batchType + "-" +
        this.batchStandard.batchNumber + "-" +
        this.batchStandard.praticeHead + "-" +
        this.batchStandard.date + "-TRACK 2.1-" +
        this.batchStandard.techStack
    }
  }

  selectBatchValue(value: null) {

    

    this.batchStandard.batchNumber = null
    this.batchStandard.batchNumber = value;
    // this.batchStandard.batchType=value.acronym

    if (this.data !== null) {

      this.b.BatchName = this.batchStandard.batchType + "-" +
        this.batchStandard.batchNumber + "-" +
        this.batchStandard.praticeHead + "-" +
        this.batchStandard.date + "-TRACK 2.1-" +
        this.batchStandard.techStack



    }

    if (this.batchStandard.batchType !== null &&
      this.batchStandard.batchNumber !== null &&
      this.batchStandard.praticeHead !== null &&
      this.batchStandard.date !== null &&
      this.batchStandard.techStack !== null

    ) {
      // this.b.BatchName = ""
      this.b.BatchName = this.batchStandard.batchType + "-" +
        this.batchStandard.batchNumber + "-" +
        this.batchStandard.praticeHead + "-" +
        this.batchStandard.date + "-TRACK 2.1-" +
        this.batchStandard.techStack
    }
  }
  selectedMainMentor(value: { mentorType: any; firstName: any; id: any; }) {
    this.mainMentorsType = value.mentorType
    this.mainMentorUpdate = value.firstName,
      this.mainMentorId = value.id
  }

  selectLead(value: { firstName: null; }) {
    this.batchStandard.praticeHead = null
    this.batchStandard.praticeHead = value.firstName;

    if (this.data !== null) {

      this.b.BatchName = this.batchStandard.batchType + "-" +
        this.batchStandard.batchNumber + "-" +
        this.batchStandard.praticeHead + "-" +
        this.batchStandard.date + "-TRACK 2.1-" +
        this.batchStandard.techStack



    }

    if (this.batchStandard.batchType !== null &&
      this.batchStandard.batchNumber !== null &&
      this.batchStandard.praticeHead !== null &&
      this.batchStandard.date !== null &&
      this.batchStandard.techStack !== null

    ) {
      this.b.BatchName = ""
      this.b.BatchName = this.batchStandard.batchType + "-" +
        this.batchStandard.batchNumber + "-" +
        this.batchStandard.praticeHead + "-" +
        this.batchStandard.date + "-TRACK 2.1-" +
        this.batchStandard.techStack
    }
  }

  selectStack(value: { techname: null; id: any; }) {
    console.log(value);

    this.batchStandard.techStack = null
    this.batchStandard.techStack = value.techname;
    this.techStackUpdate = value.techname
    this.teckStackId = value.id

    
    if (this.data !== null) {

      this.b.BatchName = this.batchStandard.batchType + "-" +
        this.batchStandard.batchNumber + "-" +
        this.batchStandard.praticeHead + "-" +
        this.batchStandard.date + "-TRACK 2.1-" +
        this.batchStandard.techStack



    }

    if (this.batchStandard.batchType !== null &&
      this.batchStandard.batchNumber !== null &&
      this.batchStandard.praticeHead !== null &&
      this.batchStandard.date !== null &&
      this.batchStandard.techStack !== null

    ) {

      this.b.BatchName = ""
      this.b.BatchName = this.batchStandard.batchType + "-" +
        this.batchStandard.batchNumber + "-" +
        this.batchStandard.praticeHead + "-" +
        this.batchStandard.date + "-TRACK 2.1-" +
        this.batchStandard.techStack
    }
  }

  selectTimeSlot(value: { timeslot: any; id: any; }) {
    this.timeSlotUpdate = value.timeslot,
      this.sessionTimeId = value.id

  }
  SelectSupportMentor(value: { id: any; }) {
    console.log(value);

    // this.Support.firstName = value.firstName,
    this.supportId = value.id

  }
  SelectBackupMentor(value: { firstName: any; id: any; }) {
    this.backupMentorUpdate = value.firstName,
      this.backupMentorId = value.id

  }
  SelectCoordinaror(value: { firstName: any; id: any; }) {
    this.coordinatorUpdate = value.firstName,
      this.coordinatorId = value.id


  }
  selectDate(dte: { value:Date; }) {


    let newdate2 = this.addDays(dte.value, 50)



    this.enddate = new Date(newdate2);
    
    this.newdate = this.datePipe.transform(dte.value, 'MMy');
    
    this.batchStandard.batchNumber=this.bNumber;
    // this.batchStandard.date = "";
    // if(newdate!=null)
    this.batchStandard.date = this.newdate;
    if (this.data !== null) {

      this.b.BatchName = this.batchStandard.batchType + "-" +
        this.batchStandard.batchNumber + "-" +
        this.batchStandard.praticeHead + "-" +
        this.batchStandard.date + "-TRACK 2.1-" +
        this.batchStandard.techStack
    }

    if (this.batchStandard.batchType !== null &&
      this.batchStandard.batchNumber !== null &&
      this.batchStandard.praticeHead !== null &&
      this.batchStandard.date !== null &&
      this.batchStandard.techStack !== null

    ) {
      this.b.BatchName = ""
      this.b.BatchName = this.batchStandard.batchType + "-" +
        this.batchStandard.batchNumber + "-" +
        this.batchStandard.praticeHead + "-" +
        this.batchStandard.date + "-TRACK 2.1-" +
        this.batchStandard.techStack
    }
   

  }
  ngOnInit() {
    // this.AddBatchDetails.controls[this.batchStandard].get("BatchType").setValue(1);
  //  this.AddBatchDetails.patchValue({
  //   batchStandard:{
  //     bType:"TFP"
  //   }
  //  })
  if(this.router.url.includes('Trial')){
    this.bTyp='TFP';
  }else if(this.router.url.includes('RFP')){
    this.bTyp='RFP';
  }else if(this.router.url.includes('CFP')){
    this.bTyp='CFP';
  }else if(this.router.url.includes('LFP')){
    this.bTyp='LFP';
  }else if(this.router.url.includes('CQA')){
    this.bTyp='CQA';
  }
  this.AddBatchDetails.value.BatchType=this.bTyp
   
    this.getTechStack();
    this.getDetatails();
    this.getCoordinatorDetails();
    
  }




  addDays(date: { getTime: () => string | number | Date; }, days: number) {


    var newDate = new Date(date.getTime());
    var i = 0;
    while (i <= days) {
      newDate.setDate(newDate.getDate() + 1);

      var day = newDate.getDay();

      if (day > 0 && day <= 6) {

        i++;
      }
    }
    return newDate;


  }

  selectMentorType() {

  }



  getTechStackImage(tech: any) {
    this.techStackImageUrl = tech.imagePath
  }
  addBatch() {
    debugger
    if (this.AddBatchDetails.invalid) {
      return 0
    }

    let batchStandard = this.AddBatchDetails.value.BatchType + '-' + this.AddBatchDetails.value.PracticeHead + '-' +
      this.datePipe.transform(this.AddBatchDetails.value.StartDate, 'MMy') + '-TRACK 2.1' +
      '-' + this.AddBatchDetails.value.teckSatck


    if (this.AddBatchDetails.invalid) {
      this.utility.markFormGroupTouched(this.AddBatchDetails);
    } else {
      // this.utility.openLoader();
      // console.log(this.AddBatchDetails.value);

      let batch = {
        batchName: this.b.BatchName,
        startDate: this.datePipe.transform(this.AddBatchDetails.value.StartDate, 'd MMM y'),
        computedFinishDate: this.datePipe.transform(this.AddBatchDetails.value.EndDate, 'd MMM y'),

        sessionTime: this.AddBatchDetails.value.SessionTime.timeSlot,
        sessionTimeId: this.AddBatchDetails.value.SessionTime.id,

        coordinator: this.AddBatchDetails.value.Coordinator.firstName,
        coordinatorId: this.AddBatchDetails.value.Coordinator._id,

        backupMentor: this.AddBatchDetails.value.BackupMentor.firstName,
        backupMentorId: this.AddBatchDetails.value.BackupMentor.id,

        support: this.AddBatchDetails.value.Support.firstName,
        supportMentorType: this.AddBatchDetails.value.Support.mentorType,
        supportId: this.AddBatchDetails.value.Support.id,
        praticeHeadId: this.AddBatchDetails.value.PracticeHead.id,

        praticeHead: this.AddBatchDetails.value.PracticeHead.firstName,

        techStack: this.AddBatchDetails.value.teckSatck.techName,
        techStackId: this.AddBatchDetails.value.teckSatck.id,

        mainMentor: this.AddBatchDetails.value.MainMentor.firstName,
        mainMentorId: this.AddBatchDetails.value.MainMentor.id,
        mainMentorType: this.AddBatchDetails.value.MainMentor.mentorType,

        googleClassLink: this.AddBatchDetails.value.GoogleClassLink,
        sessionLiveLink: this.AddBatchDetails.value.SessionLink,
        actualEndDate: this.datePipe.transform(this.AddBatchDetails.value.ActualEndDate, 'd MMM y'),
        batchImageUrl: '',
        techStackImageUrl: this.techStackImageUrl,

        batchType: this.AddBatchDetails.value.BatchType.acronym,
        batchTypeId: this.AddBatchDetails.value.BatchType.id,

        batchNumber: this.AddBatchDetails.value.batchNumber,
        batchSheetUrl: this.AddBatchDetails.value.BatchSheetUrl,
        npsSurveyUrl: this.AddBatchDetails.value.NpsSurveyUrl,
        techType: this.AddBatchDetails.value.TechType,
        makerProgramLink: this.AddBatchDetails.value.MakerLink,
      }
      
      
      let createbatch={
        batchType:this.batchType
      }

      let token = localStorage.getItem('token');
      
    // console.log(batch.batchType);
    // console.log(batch);
    // console.log(this.bTyp);
    // batch.batchType=this.bTyp;
      if (this.data !== null) {
        this.updateBatch(batch, token)
      }
      if (this.data === null) {
        this.batchSerice.createBatch(batch, token).subscribe((response:any) => {

          if (response.status == 201) {
            
            this.utility.showToast('SUCCESS', response.message);
            this.dialogRef.close();
            // this.utility.closeLoader();

          }
        }, (err: { error: { status: number; message: any; }; }) => {
          if (err.error && err.error.status == 400) {
            this.utility.showToast('ERROR', err.error.message);
            // this.utility.closeLoader();
          } else {
            this.utility.showToast('ERROR', 'Please Try Again Later!!');
          }
        });
      }
      // this.utility.closeLoader();

    }
    return
  }

  updateBatch(batch: { batchName: string; startDate: string | null; computedFinishDate: string | null; sessionTime: any; sessionTimeId: any; coordinator: any; coordinatorId: any; backupMentor: any; backupMentorId: any; support: any; supportMentorType: any; supportId: any; praticeHead: any; praticeHeadId: any; techStack: any; techStackId: any; mainMentor: any; mainMentorId: any; mainMentorType: any; googleClassLink: any; sessionLiveLink: any; actualEndDate: string | null; batchImageUrl: string; techStackImageUrl: any; batchType: any; batchTypeId: any; batchNumber: any; batchSheetUrl: any; npsSurveyUrl: any; techType: any; makerProgramLink: any; }, token: string | any) {

    this.batchSerice.updateBatch(batch, token, this.data.batch.id).subscribe((response:any) => {
      if (response.status == 200) {
        this.utility.closeLoader();
        this.utility.showToast('SUCCESS', response.message);
        this.dialogRef.close();
      }
    }, (err: { error: { status: number; message: any; }; }) => {
      if (err.error && err.error.status == 400) {
        this.utility.showToast('ERROR', err.error.message);
        
      } else {
        this.utility.showToast('ERROR', 'Please Try Again Later!!');
      }
    });
    this.dialogRef.close();

  }

   getDetatails() {
    let token = localStorage.getItem('token');
    this.batchSerice.getDetails(token).subscribe((response:any) => {
      console.log(response.data);

      if (response.data.status = 200) {
        this.buddy = response.data.backup;
        this.lead = response.data.lead;
        this.practiceHead = response.data.practiceHead;
        this.support = response.data.support;
        this.timeSlots = response.data.timeSlots;
        this.batchType = response.data.acronyms;
        // this.batchType=this.bTyp;
        this.mainbackup = this.lead.concat(this.buddy);


      }

    // console.log("the vlaue: "+this.batchType.indexOf(2));
    console.log(response.data);
    
    
    })
  // console.log(this.batchType.values);

    // this.utility.closeLoader();

  }

  getCoordinatorDetails() {
    let token = localStorage.getItem('token');
    this.batchSerice.getCoordinatorDetails(token).subscribe((response:any) => {
      
      // console.log("cooradinators ", response);
      if (response.statusCode == 201)
        this.coordinators = response.data;
        console.log('coordinator',response.data);
    }, (error: { error: { statuscode: number; message: any; }; }) => {
      if (error.error && error.error.statuscode == 401) {
        this.utility.showToast('ERROR', error.error.message);
        // this.utility.closeLoader();
      } else {
        //this.utility.errorHandler(error);
      }
    })
    
    // this.utility.closeLoader();
  }

  getTechStack() {

    let token = localStorage.getItem('token');
    this.batchSerice.getTechStack(token).subscribe((response:any) => {
      if (response.status == 200)
        this.techStack = response.data;
    }, (error: { error: { statuscode: number; message: any; }; }) => {
      if (error.error && error.error.statuscode == 401) {
        this.utility.showToast('ERROR', error.error.message);
        // this.utility.closeLoader();
      } else {
        //this.utility.errorHandler(error);
      }
    })
    // this.utility.closeLoader();
  }

  createBatch() {
  }
  engs = [{ viewValue: "hii" }, { viewValue: 'something' }]
}


