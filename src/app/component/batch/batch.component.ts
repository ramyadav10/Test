import { Component, OnChanges, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router,ActivatedRoute} from '@angular/router';
import { UtilityService } from 'src/app/service/utility.service';
import { BatchService } from 'src/app/service/batch.service';
import { ListContainer } from 'src/app/model/ListContainer.model';
import { Count } from 'src/app/model/Count.model';
import { BatchDeleteDialogComponent } from '../batch-delete-dialog/batch-delete-dialog.component';
import { environment } from 'src/environments/environment';
import { DataService } from 'src/app/service/dataservice.service';
import { AddCandidateDialogComponent } from '../add-candidate-dialog/add-candidate-dialog.component';
import { AddBatchDialogeComponent } from '../add-batch-dialoge/add-batch-dialoge.component';
import { TrialDTO } from 'src/app/model/TrialDTO';


@Component({
  selector: 'app-batch',
  templateUrl: './batch.component.html',
  styleUrls: ['./batch.component.scss'],
})
export class BatchComponent implements OnInit, OnChanges {
  isGrid = false;
  listOfbatches: any;
  isSearch: boolean = false;
  s3BucketUrl = environment.s3BucketURL;
  lengthOfArray: boolean = false;
  searchBy: string = 'NAME';
  batches = new ListContainer(35);
  selectedIndex = '0';
  Status: any;
  searchTerm: any;
  searchedWord:any='';
  countObject = new Count();
  searchedWordGrid:any=''
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private dataservice: DataService,
    private utility: UtilityService,
    private batchService: BatchService,
    private activatedRoute: ActivatedRoute,
    private dataService : DataService
  ) {
    // this.utility.openLoader();
  }
  obj: any;

  token: any;
  batchName: any;
  batchTypeID: any;
  trialBatchArray: TrialDTO[] = new Array();

  ngOnInit() {
    
    this.Status = 'INPROGRESS';
    // this.checkGrid()
    this.token = localStorage.getItem('token');
    if(this.router.url.includes('Trial')){
      this.batchTypeID = 1;
    }else if(this.router.url.includes('RFP')){
      this.batchTypeID = 2;
    }else if(this.router.url.includes('CFP')){
      this.batchTypeID = 3;
    }else if(this.router.url.includes('LFP')){
      this.batchTypeID = 4;
    }else if(this.router.url.includes('CQA')){
      this.batchTypeID = 5;
    }
    this.getAllBatches(false, this.Status);

    // setTimeout(() => {
    //   this.getAllBatches(false, this.Status);
    // }, 200);
    console.log(this.batchTypeID);
    
  }
  ngOnChanges() {}

  applyFilterBatch(searchBy: any) {
    this.dataService.changeMessage=searchBy;
  }

  checkGrid() {
    if (this.dataservice != null && this.dataservice.changeMessage != null) {
      if (localStorage.getItem('isGrid') == 'true') {
        this.isGrid = true;
        this.dataservice.changeMessage(this.isGrid);
      } else {
        this.isGrid = false;
        this.dataservice.changeMessage(this.isGrid);
      }
    }
  }

  tabClick(event: { index: number }) {
    if (event.index === 0) {
      this.selectedIndex = '0';
      this.Status = 'INPROGRESS';
      localStorage.setItem('tabIndex', '0');
      this.getAllBatches(true, this.Status);
    } else if (event.index === 1) {
      this.selectedIndex = '1';
      this.Status = 'COMPLETED';
      this.getAllBatches(true, this.Status);
      localStorage.setItem('tabIndex', '1');
    } else if (event.index === 2) {
      this.selectedIndex = '2';
      this.Status = 'TERMINATED';
      this.getAllBatches(true, this.Status);
      localStorage.setItem('tabIndex', '2');
    }
  }

  getUpdateBatches() {
    this.getAllBatches(true, this.Status);
  }
  changeView() {
    if (this.isGrid == false) {
      localStorage.setItem('isGrid', 'true');
      this.isGrid = true;
      this.dataservice.changeMessage(this.isGrid);
    } else {
      localStorage.setItem('isGrid', 'false');
      this.isGrid = false;
      this.dataservice.changeMessage(this.isGrid);
    }
  }

  batchData!: [];

  setCandidateId(candidate: any) {
    this.obj = candidate;
  }

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    // dialogConfig.width = '480px';
    // dialogConfig.height = '450px';
    dialogConfig.panelClass = 'coordinator-dialog';
    // dialogConfig.data = this.cooridinatorData;

    const dialogRef = this.dialog.open(AddBatchDialogeComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== 'close') this.getAllBatches(true, this.Status);
    });
  }

  openSite(url: string | URL | undefined) {
    window.open(url, '_blank');
  }
  updateBatch() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    // dialogConfig.width = '480px';
    // dialogConfig.height = '450px';
    dialogConfig.panelClass = 'coordinator-dialog';
    dialogConfig.data = { batch: this.obj };

    const dialogRef = this.dialog.open(AddBatchDialogeComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      debugger
      if (result !== 'close') this.getAllBatches(true, this.Status);
    });
  }
  openDeleteConfirmDialog() {
    // batchId removed in params
    const dialogRef = this.dialog.open(BatchDeleteDialogComponent, {
      width: '620px',
      height: '235px',
      disableClose: true,
      data: { batchId: this.obj.id },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result !== 'close') this.getAllBatches(true, this.Status);
    });
  }
  goToDetails(id: any) {
    // this.router.navigate(['home/batchinfo/' + id]);

    if(this.router.url.includes('Trial')){
      this.router.navigate(['home/batchinfo/' + id],{queryParams:{batchType:'Trial'}});
    }
    if(this.router.url.includes('RFP')){
      this.router.navigate(['home/batchinfo/' + id],{queryParams:{batchType:'RFP'}});
    }
    if(this.router.url.includes('CFP')){
      this.router.navigate(['home/batchinfo/' + id],{queryParams:{batchType:'CFP'}});
    }
    if(this.router.url.includes('LFP')){
      this.router.navigate(['home/batchinfo/' + id],{queryParams:{batchType:'LFP'}});
    }
    if(this.router.url.includes('CQA')){
      this.router.navigate(['home/batchinfo/' + id],{queryParams:{batchType:'CQA'}});
    }
  }

  addCandidateDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '100%';
    dialogConfig.height = '100%';
    dialogConfig.maxHeight = '100vh';
    dialogConfig.maxWidth = '100vw';
    dialogConfig.panelClass = 'add-candidate-dialog';
    const dialogRef = this.dialog.open(
      AddCandidateDialogComponent,
      dialogConfig
    );
    dialogRef.afterClosed().subscribe((response) => {
      if (response != null) this.ngOnInit();
    });
  }

  onScrollingGetBatch(ev: any) {
    this.getAllBatches(true, this.Status);
  }

  getAllBatches(status: boolean, Status: any) {
    this.batchService
      .getAllLearnerBatchDetailsByBatchNameAndStatus(
        this.token,
        this.batchTypeID,
        Status
      )
      .subscribe(
        (response) => {
          if (status) {
            this.batches.pageNumber = 0;
            this.batches.dataList = [];
          }
          this.batches.pageNumber = this.batches.pageNumber + 1;

          if (response.status == 200 && response.data.length != null) {
            this.trialBatchArray = response.data;
            // this.utility.showToast('Success', response.message);
          }
        },
        (err) => {
          if (err.error && err.error.statuscode == 401) {
            this.utility.showToast('ERROR', err.error.message);
            this.utility.closeLoader();
          } else {
            this.utility.showToast('ERROR', 'Please Try Again Later!!');
            this.utility.closeLoader();
          }
        }
      );
    //  this.utility.closeLoader();
  }

  identify(index: any, item: { batch: { id: any } }) {
    return item.batch.id;
  }
  getBatchesCount() {
    let token = localStorage.getItem('token');
    this.batchService.getBatchesCount(token).subscribe(
      (response) => {
        this.utility.openLoader();
        if (response.status == 200) {
          this.countObject.batchCount = response.data;
          this.utility.closeLoader();
        }
      },
      (err) => {
        if (err.error && err.error.statuscode == 401) {
          this.utility.showToast('ERROR', err.error.message);
          this.utility.closeLoader();
        } else {
          this.utility.showToast('ERROR', 'Please Try Again Later!!');
        }
      }
    );
    this.utility.closeLoader();
  }

  searchByKeyword(keyword: string) {
    this.searchBy = keyword;
  }

  searchBatch(event: KeyboardEvent) {
    if ((event.target as HTMLInputElement)?.value) {
      let token = localStorage.getItem('token');
      this.batchService
        .searchBatch(
          token,
          this.searchBy,
          this.Status,
          (event.target as HTMLInputElement)?.value
        )
        .subscribe(
          (response) => {
            this.listOfbatches = response.data;

            // this.utility.openLoader();
            if (response.status == 200) {
              this.batches.dataList = response.data;
              this.utility.closeLoader();

              if (this.batches.dataList.length === 0) {
                this.lengthOfArray = true;
              }
            }
          },
          (err) => {
            if (err.error && err.error.statuscode == 401) {
              this.utility.showToast('ERROR', err.error.message);
              this.utility.closeLoader();
            } else {
              this.utility.showToast('ERROR', 'Please Try Again Later!!');
            }
          }
        );
    }
    if (((event.target as HTMLInputElement)?.value).length <= 0) {
      this.getAllBatches(true, this.Status);
    }
  }
}