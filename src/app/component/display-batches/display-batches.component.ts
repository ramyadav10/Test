import { Component, Input, OnChanges, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddBatchDialogeComponent } from '../add-batch-dialoge/add-batch-dialoge.component';
import { Router } from '@angular/router';
import { AddCandidateDialogComponent } from '../add-candidate-dialog/add-candidate-dialog.component';
import { UtilityService } from 'src/app/service/utility.service';
import { BatchService } from 'src/app/service/batch.service';
import { ListContainer } from 'src/app/model/ListContainer.model';
import { Count } from 'src/app/model/Count.model';
import { BatchDeleteDialogComponent } from '../batch-delete-dialog/batch-delete-dialog.component';
import { environment } from 'src/environments/environment';
import { DataService } from 'src/app/service/dataservice.service';

@Component({
  selector: 'app-display-batches',
  templateUrl: './display-batches.component.html',
  styleUrls: ['./display-batches.component.scss']
})
export class DisplayBatchesComponent implements OnInit, OnChanges {
  public BatchList = []
  // @Input() GridList
  isGrid = false
  listOfbatches: any
  isSearch: boolean = false;
  s3BucketUrl = environment.s3BucketURL;
  lengthOfArray: boolean = false
  searchBy: string = 'NAME'
  batches = new ListContainer(35);
  selectedIndex = '0';
  Status: any
  countObject = new Count();
  obj: any

  @Input() BatchArray: any;

  @Output() refreshEvent = new EventEmitter<any>();
  @Output() scroollingEvent = new EventEmitter<any>()

  constructor(public dialog: MatDialog, private router: Router, private dataService: DataService,
    private utility: UtilityService, private batchService: BatchService) {
    // this.utility.openLoader();

  }


  ngOnChanges(changes: any) {
    //  this.isGrid= localStorage.getItem('isGrid')

    if (localStorage.getItem('isGrid') == 'true') {
      this.isGrid = true
    } else {
      this.isGrid = false
    }
    if (changes['BatchArray']) {
      this.BatchList = changes['BatchArray'].currentValue;
    }
  }
  ngOnInit() {
    this.dataService.currentMessage.subscribe((res: any) => {
      this.isGrid = res

    })
  }


  onScrollingGetBatch(fa: any) {
    this.scroollingEvent.emit(fa)

  }

  goToDetails(id: string) {
    this.router.navigate(['home/batchinfo/' + id])

  }

  openSite(url: string | URL | undefined) {
    window.open(url, "_blank");

  }
  setCandidateId(candidate: any) {
    this.obj = candidate
  }
  updateBatch(batch: any) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    // dialogConfig.width = '480px';
    // dialogConfig.height = '450px';
    dialogConfig.panelClass = 'coordinator-dialog';
    dialogConfig.data = { batch: this.obj };


    const dialogRef = this.dialog.open(AddBatchDialogeComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result !== 'close')
        this.refreshEvent.emit()
    });
  }
  openDeleteConfirmDialog(batchId: any) {
    const dialogRef = this.dialog.open(BatchDeleteDialogComponent, {
      width: '620px',
      height: '235px',
      disableClose: true,
      data: { batchId: this.obj.id }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== 'close')
        this.refreshEvent.emit()
    });
  }
}
