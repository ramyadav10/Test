import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MentorService } from 'src/app/service/mentor.service';
import { UtilityService } from 'src/app/service/utility.service';
import { environment } from 'src/environments/environment';
// import { UploadExcelDialogComponent } from '../upload-excel-dialog/upload-excel-dialog.component';
import { ListContainer } from 'src/app/model/ListContainer.model';
import { BatchService } from 'src/app/service/batch.service';
import { AddCandidateDialogComponent } from '../add-candidate-dialog/add-candidate-dialog.component';
import { CandidateDeleteDialogComponent } from '../candidate-delete-dialog/candidate-delete-dialog.component';
import { LearnersUpdateDialogComponent } from '../learners-update-dialog/learners-update-dialog.component';
import { FormGroup, FormControl } from '@angular/forms';
import { StudentDataFromSearch } from 'src/app/model/studentDataFromSearch';
import { DataService } from 'src/app/service/dataservice.service';
import { CandidateData } from 'src/app/model/CandidadteData.model';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-learners',
  templateUrl: './learners.component.html',
  styleUrls: ['./learners.component.scss'],
})
export class LearnersComponent implements OnInit {
  filteredString: string = '';
  public learnDetails: CandidateData[] = [];
  recordperPage: any;
  pageSizeOptions: any;
  resultsLength: any;
  candidates = new ListContainer(15);
  s3BucketUrl = environment.s3BucketURL;
  candidateData: any;
  searchText: any;
  searchBy: string = 'Name';
  isSearch: boolean = false;
  selectedIndex: string = '0';
  assignCount!: number;
  holdCount!: number;
  unassignedCount!: number;
  selectedTab: string = 'NEW';
  searchTab: string = 'UNASSIGN';
  selectedForCFPCount!: number;
  movedToCFPCount!: number;
  completedCount!: number;
  delayedCount!: number;
  movedToBRP!: number;
  notSelectedForCFPCount!: number;

  foundPerson!: any;
  findingName!: any;
  searchData!: any;
  searchedWordLeraners: any = '';

  addBook!: FormGroup;
  inputModel: any;
  constructor(
    public dataService: DataService,
    public dialog: MatDialog,
    private mentorService: MentorService,
    private batchService: BatchService,
    public openDialog: MatDialog,
    private utility: UtilityService
  ) {
    // this.utility.openLoader();

    this.batchService.getLearnerDetails().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      console.log('this.dataSource :::::: ', this.dataSource);
    });
    this.addBook = new FormGroup({
      name: new FormControl(''),
    });
  }
  displayedColumns: string[] = [
    'EJET-ID',
    'Name',
    'Phone Number',
    'Email',
    'Status',
    'Stage',
  ];
  dataSource!: MatTableDataSource<CandidateData>;
  candidatesCount: any;
  showListData: boolean = false;

  ngOnInit() {
     
    this.dataService.searchMessage.subscribe((text: any) => {
      this.searchData = text;
      this.dataSource.filter = this.searchData.trim().toLowerCase();
      console.log('test this.dataSource.filter ', this.dataSource.filter);
    });
  }

  studentArray: StudentDataFromSearch[] = [];

  studentDataFromSearch: StudentDataFromSearch = new StudentDataFromSearch();

  OnSearch() {
    let studentName = this.learnDetails.values.name;
    console.log('the values are addbook', studentName);

    this.findingName = studentName;
    if (
      this.learnDetails.values.name !== null &&
      this.learnDetails.values.name !== ''
    ) {
      //console.log('this.addBook.value.name is not ');
      for (let student = 0; student < this.learnDetails.length; student++) {
        const eachStudent = this.learnDetails[student];
        if (studentName === eachStudent.fullName) {
          (this.studentDataFromSearch.EJETID = eachStudent.cicId),
            (this.studentDataFromSearch.Name = eachStudent.fullName),
            (this.studentDataFromSearch.PhoneNumber = eachStudent.mobileNum),
            (this.studentDataFromSearch.Email = eachStudent.email),
            (this.studentDataFromSearch.Status = eachStudent.status),
            (this.studentDataFromSearch.Stage = eachStudent.candidateStatus);

          this.studentArray.push(this.studentDataFromSearch);
          console.log('data of student', this.studentDataFromSearch);

          console.log(
            'Name :::::: ' +
              this.studentDataFromSearch.Name +
              ' -> ID ::::: ' +
              this.studentDataFromSearch.EJETID
          );
        }
      }

      this.foundPerson = this.studentArray.length;
    } else {
      this.utility.showToast('ERROR', 'Please enter valid person name !!!');
      //console.log('this.addBook.value.name is null ');
      this.foundPerson = 0;
      this.studentArray = [];
    }
    console.log(this.studentArray);
  }

  public searchedName!: string;

  searchCandidateByAny() {
    this.dataService.currentMessage.subscribe((data) => {
      console.log('Data from dataService -> ' + data);
      this.findingName = data;
      console.log('UPDATED from dataService -> ' + this.findingName);
      this.searchCandidate(this.findingName);
    });
  }

  onPageChanged(event: any) {}

  OnClear(event: any) {
    //  this.inputModel = event.target.value
    //  console.log('values are printing in event'+this.inputModel);

    location.reload();
  }

  OnLogOut() {}
  getAllCandidates(status: boolean) {
    let token = localStorage.getItem('token');
    if (status) {
      // this.utility.openLoader();
      this.candidates.pageNumber = 0;
      this.candidates.dataList = [];
    }
    this.candidates.pageNumber = this.candidates.pageNumber + 1;
    this.batchService
      .getAllCandidates(
        token,
        this.selectedTab,
        this.candidates.pageNumber,
        this.candidates.offset
      )
      .subscribe(
        (response) => {
          if ((response as any).status == 200) {
            this.candidates.dataList = this.candidates.dataList.concat(
              (response as any).data
            );
            this.candidatesCount = this.candidates.dataList.length;
          }
          this.utility.closeLoader();
        },
        (err) => {
          if (err.error && err.error.statuscode !== 200) {
            this.utility.showToast('ERROR', err.error.message);
          } else if (err.error && err.error.statuscode == 400) {
            this.utility.showToast('ERROR', err.error.message);
          } else {
            this.utility.showToast('ERROR', 'Please Try Again Later!!');
          }
          this.utility.closeLoader();
        }
      );
  }

  getCandidateCount() {
    let token = localStorage.getItem('token');
    this.batchService.getCandidatesStatusCount(token).subscribe(
      (response) => {
        if ((response as any).status == 200) {
          this.assignCount = response.data.assignCount;
          this.unassignedCount = response.data.unassignedCount;
          this.movedToBRP = response.data.movedToBRP;
          this.selectedForCFPCount = response.data.selectedForCFP;
          this.notSelectedForCFPCount = response.data.notSelectedCount;
          this.movedToCFPCount = response.data.movedToCFP;
          this.delayedCount = response.data.delayedCount;
          this.holdCount = response.data.holdCount;
          this.completedCount = response.data.completedCount;
        }
      },
      (error) => {
        this.utility.errorHandler(error);
      }
    );
  }

  searchByKeyword(keyword: string) {
    this.searchBy = keyword;
  }

  capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  searchCandidate(searchName: string | any[]) {
    this.isSearch = true;
    this.searchText = searchName;
    if (searchName.length > 0) {
      this.batchService.getLearnerDetails().subscribe(
        (response) => {
          if (response.status == 200) {
            this.learnDetails = response.data;
            // this.utility.closeLoader();
          }
        },
        (err) => {
          if (err.error && err.error.statuscode == 401) {
            this.utility.showToast('ERROR', err.error.message);
          } else {
            this.utility.showToast('ERROR', 'Please Try Again Later!!');
          }
        }
      );
    }
    if (searchName.length <= 0) {
      // this.candidates.pageNumber = 0;
      // this.learnDetails.dataList = [];
      // this.getLearnerDetails(false);
    }
  }

  // getLaernerDeatilsdata()
  // {
  //   this.batchService.getBooksByToken().subscribe((data: { data: any; }) => {
  //     this.bookDetails = data.data;
  //     console.log(this.bookDetails);
  //     });
  // }

  applyFilterLearner(searchBy: any) {
    this.dataService.changeMessage = searchBy;
  }

  openUploadDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '500px';
    dialogConfig.height = '256px';
    dialogConfig.panelClass = 'upload-excel-dialog';
    // const dialogRef = this.openDialog.open(UploadExcelDialogComponent, dialogConfig);
    // dialogRef.afterClosed().subscribe(response => {
    //   if (response != null) {
    //     this.getAllCandidates(true)
    //     this.getCandidateCount();
    //   }
    // });
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
    const dialogRef = this.openDialog.open(
      AddCandidateDialogComponent,
      dialogConfig
    );
    dialogRef.afterClosed().subscribe((response) => {
      if (response !== 'close')
        setTimeout(() => {
          this.getAllCandidates(true);
          this.getCandidateCount();
        }, 1000);
    });
  }

  openUpdateCandidateDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '480px';
    // dialogConfig.height = '450px';
    dialogConfig.panelClass = 'candidate-update-dialog';
    dialogConfig.data = this.candidateData;
    dialogConfig.data['tabType'] = this.selectedTab;
    const dialogRef = this.openDialog.open(
      LearnersUpdateDialogComponent,
      dialogConfig
    );
    dialogRef.afterClosed().subscribe((result) => {
      if (result !== 'close')
        setTimeout(() => {
          this.getAllCandidates(true);
          this.getCandidateCount();
        }, 1000);
    });
  }

  setCandidateId(candidateData: any) {
    this.candidateData = candidateData;
  }

  openDeleteConfirmDialog() {
    const dialogRef = this.dialog.open(CandidateDeleteDialogComponent, {
      width: '450px',
      height: '162px',
      disableClose: true,
      data: { candidateId: this.candidateData.id },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result !== 'close')
        setTimeout(() => {
          this.getAllCandidates(true);
          this.getCandidateCount();
        }, 1000);
    });
  }

  tabClick(event: { index: number }) {
    if (event.index == 0) {
      this.selectedIndex = '0';
      this.selectedTab = 'NEW';
      this.searchTab = 'UNASSIGN';
      this.searchText = '';
      localStorage.setItem('tabIndex', '0');
      this.getAllCandidates(true);
    } else if (event.index == 1) {
      this.selectedIndex = '1';
      this.selectedTab = 'INPROGRESS';
      this.searchTab = 'ASSIGN';
      this.searchText = '';
      this.getAllCandidates(true);
      localStorage.setItem('tabIndex', '1');
    } else if (event.index == 2) {
      this.selectedIndex = '2';
      this.selectedTab = 'MOVTOBRP';
      this.searchTab = 'MOVTOBRP';
      this.searchText = '';
      this.getAllCandidates(true);
      localStorage.setItem('tabIndex', '2');
    } else if (event.index == 3) {
      this.selectedIndex = '3';
      this.selectedTab = 'SELECTCFP';
      this.searchTab = 'SELECTCFP';
      this.searchText = '';
      this.getAllCandidates(true);
      localStorage.setItem('tabIndex', '3');
    } else if (event.index == 4) {
      this.selectedIndex = '4';
      this.selectedTab = 'NOTSLCTCFP';
      this.searchTab = 'NOTSLCTCFP';
      this.searchText = '';
      this.getAllCandidates(true);
      localStorage.setItem('tabIndex', '4');
    } else if (event.index == 5) {
      this.selectedIndex = '5';
      this.selectedTab = 'MOVECFP';
      this.searchTab = 'MOVECFP';
      this.searchText = '';
      this.getAllCandidates(true);
      localStorage.setItem('tabIndex', '5');
    } else if (event.index == 6) {
      this.selectedIndex = '6';
      this.selectedTab = 'CMPL';
      this.searchTab = 'CMPL';
      this.searchText = '';
      this.getAllCandidates(true);
      localStorage.setItem('tabIndex', '6');
    } else if (event.index == 7) {
      this.selectedIndex = '7';
      this.selectedTab = 'DLYD';
      this.searchTab = 'DLYD';
      this.searchText = '';
      this.getAllCandidates(true);
      localStorage.setItem('tabIndex', '7');
    } else if (event.index == 8) {
      this.selectedIndex = '8';
      this.selectedTab = 'DROPPED';
      this.searchTab = 'DROPPED';
      this.searchText = '';
      this.getAllCandidates(true);
      localStorage.setItem('tabIndex', '8');
    }
  }
}
