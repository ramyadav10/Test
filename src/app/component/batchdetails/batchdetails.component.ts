import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { BatchService } from 'src/app/service/batch.service';
import { UtilityService } from 'src/app/service/utility.service';
import { QueryList } from '@angular/core';
import { ViewChildren } from '@angular/core';

import { ListContainer } from 'src/app/model/ListContainer.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatCheckboxChange } from '@angular/material/checkbox';

import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CandidateDeleteDialogComponent } from '../candidate-delete-dialog/candidate-delete-dialog.component';

import { UnassignconfirmComponent } from '../unassignconfirm/unassignconfirm.component';
import { ChangebatchstatusComponent } from '../changebatchstatus/changebatchstatus.component';

import { CandidateStatusModel } from '../../model/CandidateStatusModel'
import { BatchStatusModel } from '../../model/CandidateStatusModel'
import { ShowMentorDetailsComponent } from '../show-mentor-details/show-mentor-details.component';
import { RemapdialogComponent } from '../remapdialog/remapdialog.component';
import { DataService } from 'src/app/service/dataservice.service';



@Component({
  selector: 'app-batchdetails',
  templateUrl: './batchdetails.component.html',
  styleUrls: ['./batchdetails.component.scss']
})

export class BatchdetailsComponent implements OnInit {
    

  CurrentBatchId: any

  @ViewChildren('checkBox')
  checkBox!: QueryList<any>;
  BatchStatusArray!: [];
  lengthOfArray: any
  CandidateStatusArray!: [];
  id: any;
  batchDetails: any
  batchCandidates: any
  public checklist!: any[];
  classRoomLink: any
  candidates = new ListContainer(15);
  assignCandidatesList = []
  selectedIndex = '0';
  batchCount: any
  techStackImage: any
  s3BucketUrl = environment.s3BucketURL;
  candiateId: any;
  searchText: string = '';
  searchBy: string = 'NAME'
  candidatesDetails: any
  filterCandidate: any

  Totaldays: any
  TotalEnrolledCount: any
  FinalSize: any

  delayed: any
  dropped: any

  movetobrp: any
  movetocfp: any
  notSelectedcfp: any
  remapcount: any
  selectedcfp: any
  ExitResons: any
  showing = false
  CandiDateInfo: any
  statusModel: any
  pathCandidateName: any
  searchTab: any
  selectedTab: any
  mentorId: any
  batchStatusModel = new BatchStatusModel()
  batchType : any;

  constructor(private dataService : DataService,private route: ActivatedRoute, @Inject(DOCUMENT) private document: Document,
    private batchService: BatchService, private utility: UtilityService, public dialog: MatDialog, private router: Router,private activatedRoute: ActivatedRoute) {
    let modelStatus = new CandidateStatusModel()

    this.statusModel = modelStatus
    this.utility.openLoader()
    // this.getAssignedCandidates()

  }


  ngOnInit() {
 
    this.getExitResons()

    this.getBatchStatus()
    this.getCandidateStatus()
    this.id = this.route.snapshot.paramMap.get('id');
    let dataId = this.id
    this.getBatchEnrollCount(this.id)
    this.checkCabdiInfo()
    this.route.params.subscribe(routeParams => {

      // console.log("activated param calling ", routeParams.id);
      this.getBatchStatus()
      this.getCandidateStatus()
      this.getBatchDetails(routeParams['id']);
      this.getBatchEnrollCount(routeParams['id'])
      this.ngAfterViewInit()
      this.checkCabdiInfo()
      this.batchType = this.activatedRoute.snapshot.queryParamMap.get('batchType');


    });

  }

  searchBatch(event: KeyboardEvent) {
    
  }
  searchWords:any ='';
  searchWordsAssigned:any ='';

  /**
   * It takes a string as an argument and sets the value of the searchBy property to the value of the
   * keyword argument
   * @param {string} keyword - string - the keyword to search by
   */
  searchByKeyword(keyword: string) {
    this.searchBy = keyword
  }
/**
 * It takes the value of the searchBy variable and assigns it to the changeMessage variable in the
 * dataService.
 * @param {any} searchBy - any - this is the value that is being passed from the search box.
 */
  applyFilterCoordinator(searchBy: any) {
    this.dataService.changeMessage=searchBy;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      // if (localStorage.getItem('tabIndex') === null) {
      localStorage.setItem('tabIndex', '1');
      // }
    //   this.selectedIndex = localStorage.getItem('tabIndex');

      this.id = this.route.snapshot.paramMap.get('id');
      // this.getBatchDetails(this.id)
      if (this.selectedIndex === '0') {
        this.selectedTab = 'UNASSIGNED';
        this.searchTab = 'UNASSIGN';
        this.searchText = "";
        this.getUnassignedCandidates();

      } else if (this.selectedIndex === '1') {
        this.selectedTab = 'ASSIGNED';
        this.searchTab = 'ASSIGN';
        this.searchText = "";
        this.getAssignedCandidates();

      }
    }, 500);

  }

  selected3: any[] = Array();

  toggle(item: { id: never; }, event: MatCheckboxChange) {

    if (event.checked) {
      this.selected3.push(item.id);
    } else {
      const index = this.selected3.indexOf(item.id);
      if (index >= 0) {
        this.selected3.splice(index, 1);
      }
    }
  }
  routerLink(url: string | URL | undefined) {

    window.open(url, "_blank");
  }
  exists(item: { id: never; }) {

    return this.selected3.indexOf(item.id) > -1;
  };

  isIndeterminate() {
    return (this.selected3.length > 0 && !this.isChecked());
  };

  isChecked() {



    return this.selected3.length === this.candidates.dataList.length;
  };



  toggleAll(event: MatCheckboxChange) {


    if (event.checked) {
      this.selected3 = [];
      this.candidates.dataList.forEach((row:any) => {
        return this.selected3.push(row.id);
      });
    } else {
      this.selected3.length = 0;
    }

  }


  toBatch() {
    // this.router.navigateByUrl('home/batch/Trial');

    if(this.batchType == 'Trial'){
      // this.router.navigate(['home/batchinfo/' + id],{queryParams:{batchType:'Trial'}});
      this.router.navigateByUrl('home/batch/Trial');
    }
    if(this.batchType == 'RFP'){
      this.router.navigateByUrl('home/batch/RFP');
    }
    if(this.batchType == 'CFP'){
      this.router.navigateByUrl('home/batch/CFP');
    }
  }

  checkCabdiInfo() {
    if (localStorage.getItem('showing') == 'true') {
      this.showing = true
    } else {
      this.showing = false
    }
  }

  gotoInfo(candiateObject: { fullName: any; }) {
    this.pathCandidateName = candiateObject.fullName


    this.CandiDateInfo = { candidateInfo: candiateObject, batchInfo: this.batchDetails }
    if (this.showing == false) {

      localStorage.setItem('showing', 'true')
      this.showing = true

    } else {
      localStorage.setItem('showing', 'false')

      this.showing = false
    }

    this.showing = true

    this.router.navigateByUrl('home/batch/info');

  }
  goToDetails() {
    this.showing = false

    this.router.navigate(['home/batchinfo/' + this.id])

  }

  remapcandidate(candy: any) {
    this.candidatesDetails = candy
  }
  getBatchEnrollCount(id: any) {
    let token = localStorage.getItem('token');
    this.batchService.getBatchCandidates(token, id).subscribe((res:any) => {
      // console.log(res);

      this.TotalEnrolledCount = res.data['batchCount'].totalEnrolledCount,
        this.FinalSize = res.data['batchCount'].finalCount
      this.delayed = res.data['batchCount'].delayedCount
      this.dropped = res.data['batchCount'].droppedCount

      this.movetobrp = res.data['batchCount'].movedToBRPCount
      this.movetocfp = res.data['batchCount'].movedToCFPCount
      this.notSelectedcfp = res.data['batchCount'].notSelectedForCFP
      this.remapcount = res.data['batchCount'].remapCount
      this.selectedcfp = res.data['batchCount'].selectedForCFP

    }, error => {
    })
  }


  getCandidateStatus() {
    let token = localStorage.getItem('token');

    let data = {
      keyType: 'CANDIDATE_STATUS'
    }
    this.batchService.getBatchStatusParams(token, data.keyType).subscribe((res) => {
      this.CandidateStatusArray = res.data
    }, (err) => {
    })
  }
  getExitResons() {
    let token = localStorage.getItem('token');

    let data = {
      keyType: 'EXIT_REASON'
    }
    this.batchService.getBatchStatusParams(token, data.keyType).subscribe((res) => {
      this.ExitResons = res.data
    }, (err) => {
    })

  }
  getBatchStatus() {
    let token = localStorage.getItem('token');

    let data = {
      keyType: 'BATCH_STATUS'
    }
    this.batchService.getBatchStatusParams(token, data.keyType).subscribe((res) => {
      this.BatchStatusArray = res.data
    }, (err) => {
    })
  }


  remapHistoryDailog(candy: { candidateStatus: string; }) {
    if (candy.candidateStatus == 'In Progress') {

      return null
    } {

      const dialogConfig = new MatDialogConfig();

      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = '480px';
      dialogConfig.panelClass = 'coordinator-dialog';
      dialogConfig.data = { data: this.batchDetails, CandidateInfo: candy, Read: 'readOnly' };
      const dialogRef = this.dialog.open(ChangebatchstatusComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
      })

    }

    return null

  }
  ChangeBatchStatusDailog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.panelClass = 'coordinator-dialog';
    dialogConfig.data = { data: this.batchDetails, StatusParms: this.BatchStatusArray };
    const dialogRef = this.dialog.open(ChangebatchstatusComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {

        this.batchDetails.status = result

      }

    })


  }


  days_between(date1: string | number | Date, date2: string | number | Date) {
    var ndays;

    date1 = new Date(date1);
    date2 = new Date(date2);

    var tv1 = date1.valueOf();  // msec since 1970
    var tv2 = date2.valueOf();

    ndays = (tv2 - tv1) / 1000 / 86400;
    ndays = Math.round(ndays - 0.5);

    return ndays;

  }

  showCoordinator(id: any) {

    console.log("click ", this.batchDetails);

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '480px';

    dialogConfig.panelClass = 'coordinator-dialog';
    dialogConfig.data = { data: id, co: 'co' };
    const dialogRef = this.dialog.open(ShowMentorDetailsComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      // console.log(result);

      if (result != undefined) {

        this.batchDetails.status = result

      }

    })
  }

  showDetails(id: any) {
    // debugger
    console.log(id);


    console.log("click ", this.batchDetails);

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '480px';

    dialogConfig.panelClass = 'coordinator-dialog';
    dialogConfig.data = { data: id, co: 'no' };
    const dialogRef = this.dialog.open(ShowMentorDetailsComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      // console.log(result);

      if (result != undefined) {

        // this.batchDetails.status = result

      }

    })

  }

  changeCandidateStatus() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    // dialogConfig.width = '480px';
    // dialogConfig.height = '450px';
    dialogConfig.panelClass = 'coordinator-dialog';
    let Info = {
      exitResonArray: this.ExitResons

    }
    dialogConfig.data = { Info, data: this.candidatesDetails, currentBatchId: this.CurrentBatchId, batchDetails: this.batchDetails, status: 'change', StatusArray: this.CandidateStatusArray };
    const dialogRef = this.dialog.open(RemapdialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result:any) => {

      this.getBatchEnrollCount(this.id)
      // console.log("responsein current  ", result['currentStatus']);
      // console.log("respons previos ", result['previousStatus']);
      if (result === undefined) {
        return 0
      }

      // if (result['currentStatus'] != undefined) {
      //   console.log("inside if  ", result['currentStatus']);

      //   switch (result['currentStatus']) {


      //     case this.statusModel.NOTSELECTEDTICFP:
      //       console.log("in case ", result['currentStatus']);

      //       this.notSelectedcfp = this.notSelectedcfp + 1

      //       break;
      //     case this.statusModel.SELECTEDFORCFP:
      //       // console.log("in selected for ", result);

      //       this.selectedcfp = this.selectedcfp + 1

      //       break;
      //     case this.statusModel.DROPPED:
      //       // console.log("in droop for ", result);

      //       this.FinalSize = this.FinalSize - 1
      //       this.dropped = this.dropped + 1

      //       break;
      //     case this.statusModel.MOVETOCFP:
      //       // console.log("in movedrio cfp for ", result);

      //       this.FinalSize = this.FinalSize - 1

      //       this.movetocfp = this.movetocfp + 1

      //       break;
      //     case this.statusModel.REMAP:
      //       // console.log("in remap to rfp for ", result);

      //       this.FinalSize = this.FinalSize - 1

      //       this.remapcount = this.remapcount + 1

      //       break;
      //     case this.statusModel.DELAY:
      //       // console.log("in delayed  ", result);
      //       this.FinalSize = this.FinalSize - 1

      //       this.delayed = this.delayed + 1

      //       break;
      //     case this.statusModel.MOVETOBRP:
      //       // console.log("in brp for ", result);
      //       this.FinalSize = this.FinalSize - 1

      //       this.movetobrp = this.movetobrp + 1

      //       break;

      //     default:
      //       break;
      //   }


      //   // this.TotalEnrolledCount = res.data['batchCount'].totalEnrolledCount,
      //   // this.FinalSize = res.data['batchCount'].finalCount
      //   // this.delayed = res.data['batchCount'].delayedCount
      //   // this.dropped = res.data['batchCount'].droppedCount

      //   // this.movetobrp = res.data['batchCount'].movedToBRPCount
      //   // this.movetocfp = res.data['batchCount'].movedToCFPCount
      //   // this.notSelectedcfp = res.data['batchCount'].notSelectedForCFP
      //   // this.remapcount = res.data['batchCount'].remapCount
      //   // this.selectedcfp = res.data['batchCount'].selectedForCFP

      //   if (result === this.statusModel.DROPPED || result === this.statusModel.MOVETOCFP || result === this.statusModel.REMAP)

      //     this.FinalSize = this.FinalSize - 1



      // }

      this.getAssignedCandidates()
      return null
    })
  }

  assignedCandidatesDailog() {
  // debugger
    if (this.selected3.length == 0) {
      return 0
    }
    if (this.batchDetails.status === this.batchStatusModel.TERMINATED || this.batchDetails.status === this.batchStatusModel.COMPELTED) {
      let data = {
        message2: '' + this.batchDetails.batchName + ' Batch .',
        message: 'This Batch  is ' + this.batchDetails.status + ' So, unable to assign Candidate  to  the ',
        status: true
      }
      const dialogConfig = new MatDialogConfig();

      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = '480px';
      dialogConfig.height = '450px';
      dialogConfig.panelClass = 'coordinator-dialog';
      dialogConfig.data = data
      const dialogRef = this.dialog.open(UnassignconfirmComponent, dialogConfig);
      dialogRef.afterClosed().subscribe((res) => {
      })


    } else {
      let data = {
        message: 'Candidates Getting Assigned  To ' + this.batchDetails.batchName + ' Batch',
        message2: 'Are you sure do you want to assign?',
        status: false
      }
      const dialogConfig = new MatDialogConfig();

      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      // dialogConfig.width = '480px';
      // dialogConfig.height = '450px';
      dialogConfig.panelClass = 'coordinator-dialog';
      dialogConfig.data = data
      const dialogRef = this.dialog.open(UnassignconfirmComponent, dialogConfig);
      dialogRef.afterClosed().subscribe((res) => {
        if (res.status == 'yes') {
          this.assignedCandidates()
        }
      })
    }
    return null
  }

  unasineConfrim(id: any) {

    let data = {
      message: 'Candidates Getting Unassigned  from ' + this.batchDetails.batchName + ' Batch',
      message2: 'Are you sure do you want to unassigned??',
      id: this.candiateId
    }
    const dialogRef = this.dialog.open(UnassignconfirmComponent, {
      width: '620px',
      height: '235px',
      data: data

    })
    dialogRef.afterClosed().subscribe(result => {
      if (result.status == 'yes') {
        this.unassignCandidate(result.id)
      }
    });

  }
  openDeleteConfirmDialog() {
    const dialogRef = this.dialog.open(CandidateDeleteDialogComponent, {
      width: '450px',
      height: '162px',
      disableClose: true,
      data: { candidateId: this.candiateId }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== 'close') {
        if (this.selectedIndex === '0') {
          let event = {
            index: 0
          }
          this.tabClick(event)
        }
        if (this.selectedIndex === '1') {

          this.getAssignedCandidates();
        }
      }

    });
  }
  setCandidateId(candidateId: any) {
    this.candiateId = candidateId;
  }
  getBatchDetails(id: any) {
    let token = localStorage.getItem('token');
    this.batchService.getBatchDetails(token, id).subscribe(response => {
      // console.log(" batch details ", response);

      if (response.status == 200) {
        this.batchDetails = response.data;
        this.CurrentBatchId = response.data.id
        this.batchCount = response.data.hiredCandidates.length
        this.classRoomLink = this.batchDetails.googleClassLink
        this.utility.closeLoader();
        // this.utility.showToast('SUCCESS', response.message);
        this.Totaldays = this.days_between(this.batchDetails.startDate, this.batchDetails.computedFinishDate)

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

  unassignCandidate(candidateId: any) {
    this.utility.openLoader()
    let token = localStorage.getItem('token');

    this.batchService.unAssignCandidate(token, this.batchDetails.id, candidateId).subscribe(response => {

      if (response.status == 200) {
        this.FinalSize = this.FinalSize - 1
        this.TotalEnrolledCount = this.TotalEnrolledCount - 1
        setTimeout(() => {
          this.ngAfterViewInit()
          this.utility.closeLoader()
        }, 500);
        // this.utility.showToast('SUCCESS',response.message);
      }
    }, err => {
      if (err.error && err.error.status == 400) {
        setTimeout(() => {
          this.utility.closeLoader()
        }, 500);
        this.utility.showToast('ERROR', err.error.message);
      } else {
        setTimeout(() => {
          this.utility.closeLoader()
        }, 500);
        this.utility.errorHandler(err);
      }
    }
    );
    // this.utility.closeLoader();
  }

  searchByCount(st: string, txt: string) {
    this.searchText = txt
    this.searchBy = st
    console.log(st, txt);
    let arr = []
    this.batchCandidates = []
    console.log(this.batchCandidates);

    const ab = this.filterIt(txt)
    console.log("bohject ", ab);

    arr.push(ab)
    console.log(arr);

    this.batchCandidates.push(ab)
    console.log(this.batchCandidates);






  }

  filterIt(txt: string) {
    var dat = this.batchCandidates.filter((item: { [x: string]: any; candidateStatus: string; }) => {
      console.log(txt, item);

      console.log(item['candidateStatus']);
      // if (item['candidateStatus'] === txt)
      return item.candidateStatus.toLowerCase().includes(txt.toLowerCase())
      return item['candidateStatus'] === txt

    })
    console.log(dat);
    return dat


  }

  searchAssignedCandidate(event:any) {
    
    let searchWord=event.target.value;
    // this.utility.openLoader()
    if (searchWord.length > 0) {

      let token = localStorage.getItem('token');
      this.batchService.searchAssignedCandidate(token, this.searchBy, this.searchTab, searchWord).subscribe(response => {
        this.utility.openLoader();
        if (response.status == 200) {
          this.batchCandidates = response.data
          this.utility.closeLoader();
        }
      }, err => {
        if (err.error && err.error.statuscode == 401) {
          this.utility.showToast('ERROR', err.error.message);
          this.utility.closeLoader();
        } else {
          this.utility.showToast('ERROR', 'Please Try Again Later!!');
        }
      });
    }
    if (searchWord.length <= 0) {
      this.candidates.pageNumber = 0;
      this.candidates.dataList = [];
      this.getAssignedCandidates();

    }

  }

  searchCandidate(event:any) {
    
    let searchWord=event.target.value;
    console.log("searchWord",searchWord);
    console.log("this.searchTab",this.searchTab);
    console.log("this.searchBy",this.searchBy);
    console.log("searchWord",searchWord);
    // // this.searchText = searchWord
    // this.utility.openLoader()
    if (searchWord.length > 0) {

      let token = localStorage.getItem('token');
      // search/NAME/ASSIGN?word=Aniket%20Chahare
      this.batchService.searchCandidate(token, this.searchBy, this.searchTab, searchWord).subscribe(response => {
        this.utility.openLoader();
        if (response.status == 200) {
          this.candidates.dataList = response.data
          this.utility.closeLoader();
        }
      }, err => {
        if (err.error && err.error.statuscode == 401) {
          this.utility.showToast('ERROR', err.error.message);
          this.utility.closeLoader();
        } else {
          this.utility.showToast('ERROR', 'Please Try Again Later!!');
        }
      });
    }
    if (searchWord.length <= 0) {
      this.candidates.pageNumber = 0;
      this.candidates.dataList = [];
      this.getUnassignedCandidates();

    }

  }

  identify(index: any, item: { id: any; }) {
    return item.id;
  }

  getUnassignedCandidates() {
    let token = localStorage.getItem('token');
    if (this.searchText.length <= 0) {
      this.candidates.pageNumber = this.candidates.pageNumber + 1;
      this.batchService.getUnassignedCandidates(token, this.candidates.pageNumber, this.candidates.offset).subscribe(response => {
        if (response.status == 200) {
          this.candidates.dataList = this.candidates.dataList.concat(((response as any).data));
          if (this.candidates.dataList.length == 0) {
            if (this.selectedIndex === '0') {
              let event = {
                index: 0
              }
              this.tabClick(event)
            }
            if (this.selectedIndex === '1') {

              this.getAssignedCandidates();
            }
          }
          this.utility.closeLoader()
        }
      }, err => {
        if (err.error && err.error.status == 401) {
          this.utility.showToast('ERROR', err.error.message);
          this.utility.closeLoader()
        } else {
          this.utility.closeLoader()

          this.utility.errorHandler(err);
        }
      }
      );
    }
    this.utility.closeLoader()

  }


  assignedCandidates() {


    if (this.selected3.length > 0) {

      // this.utility.openLoader()
      let token = localStorage.getItem('token');



      this.batchService.assignedCandidates(token, this.batchDetails.id, this.selected3).subscribe(response => {


        if (response.status == 200) {
          this.TotalEnrolledCount = this.TotalEnrolledCount + this.selected3.length
          this.FinalSize = this.FinalSize + this.selected3.length
          this.selected3 = []
          let token = localStorage.getItem('token');
          if (this.candidates.pageNumber >= 1) {
            this.candidates.pageNumber = 0;
          }
          this.candidates.pageNumber = this.candidates.pageNumber + 1;
          this.batchService.getUnassignedCandidates(token, this.candidates.pageNumber, this.candidates.offset).subscribe(response => {

            if (response.status == 200) {
              this.candidates.dataList = []
              this.candidates.dataList = this.candidates.dataList.concat(((response as any).data));
              setTimeout(() => {
                // this.ngAfterViewInit()
                this.getUnassignedCandidates();

                this.utility.closeLoader()
              }, 500);

              //this.utility.showToast('SUCCESS',response.message);
            }
          }, err => {
            if (err.error && err.error.status == 401) {
              setTimeout(() => {
                this.utility.closeLoader()
              }, 500);
              this.utility.showToast('ERROR', err.error.message);
            } else {
              setTimeout(() => {
                this.utility.closeLoader()
              }, 500);
              this.utility.errorHandler(err);
            }
          }
          );
          this.candidates.pageNumber = this.candidates.pageNumber + 1;
        }
      }, err => {
        if (err.error && err.error.status == 400) {
          setTimeout(() => {
            this.utility.closeLoader()
          }, 500);
          this.utility.showToast('ERROR', err.error.message);
        } else {
          setTimeout(() => {
            this.utility.closeLoader()
          }, 500);
          this.utility.errorHandler(err);
        }
      }
      );
      this.utility.closeLoader();
    }
  }

  tabClick(event: { index: any; }) {
    if (event.index === 0) {
      // this.utility.openLoader()
      this.selectedIndex = '0';
      localStorage.setItem('tabIndex', '0');
      let token = localStorage.getItem('token');
      if (this.candidates.pageNumber >= 1) {
        this.candidates.pageNumber = 0;
      }
      this.candidates.pageNumber = this.candidates.pageNumber + 1;
      this.searchTab='UNASSIGN'
      this.batchService.getUnassignedCandidates(token, this.candidates.pageNumber, this.candidates.offset).subscribe(response => {
        if (response.status == 200) {
          this.candidates.dataList = []
          this.candidates.dataList = this.candidates.dataList.concat(((response as any).data));
          if (this.candidates.dataList.length == 0) {
            this.utility.closeLoader()
            this.lengthOfArray = true
          }
          setTimeout(() => {
            this.utility.closeLoader()
          }, 500);
        }
      }, err => {
        if (err.error && err.error.status == 401) {
          this.utility.showToast('ERROR', err.error.message);
          setTimeout(() => {
            this.utility.closeLoader()
          }, 500);
        } else {
          setTimeout(() => {
            this.utility.closeLoader()
          }, 500);

          this.utility.errorHandler(err);
        }
      }
      );

    } else if (event.index === 1) {
      this.selectedIndex = '1';
      this.searchTab='ASSIGN'
      localStorage.setItem('tabIndex', '1');
      this.getAssignedCandidates();
    }

  }
  getAssignedCandidates() {
    let token = localStorage.getItem('token');
    this.batchService.getAssignedCandidates(token, this.id).subscribe(response => {

      if (response.status == 200) {

        this.filterCandidate = response.data.candidates
        this.batchCandidates = response.data.candidates

        this.batchCount = this.batchCandidates.length


        if (this.batchCount == 0) {
          this.lengthOfArray = true
          if (this.selectedIndex === '1') {

            let event = {
              index: 0
            }
            this.tabClick(event)
          }
          if (this.selectedIndex === '0') {

            this.getUnassignedCandidates();
          }
        }

        setTimeout(() => {
          this.utility.closeLoader()
        }, 500);
        //this.utility.showToast('SUCCESS',response.message);
      }
    }, err => {
      if (err.error && err.error.status == 401) {
        setTimeout(() => {
          this.utility.closeLoader()
        }, 500);
        this.utility.showToast('ERROR', err.error.message);
      } else {
        setTimeout(() => {
          this.utility.closeLoader()
        }, 500);
        this.utility.errorHandler(err);
      }
    }
    );
    this.utility.closeLoader();
  }

  selected4 = [];

  toggle2(item: { id: any; }, event: MatCheckboxChange) {
    if (event.checked) {
    //   this.selected4.push(item.id);
    } else {
    //   const index = this.selected4.indexOf(item.id);
    //   if (index >= 0) {
    //     this.selected4.splice(index, 1);
    //   }
    }
  }
  exists2(item: { id: any; }) {
    // return this.selected4.indexOf(item.id) > -1;
  };
  isIndeterminate2() {
    return (this.selected4.length > 0 && !this.isChecked2());

  }

  isChecked2() {

    return this.selected4.length === this.batchCandidates.length;

  }

  toggleAll2(event: MatCheckboxChange) {


    if (event.checked) {
      this.selected4 = [];
    //   this.batchCandidates.forEach((row: any) => this.selected4.push(row));
    } else {
      this.selected4.length = 0;
    }

  }

}
