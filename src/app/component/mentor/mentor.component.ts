import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DataService } from 'src/app/service/dataservice.service';
import { MentorService } from 'src/app/service/mentor.service';
import { UtilityService } from 'src/app/service/utility.service';
import { environment } from 'src/environments/environment';
import { MentorDeleteconfirmComponent } from '../mentor-deleteconfirm/mentor-deleteconfirm.component';
import { MentorDialogComponent } from '../mentor-dialog/mentor-dialog.component';

@Component({
  selector: 'app-mentor',
  templateUrl: './mentor.component.html',
  styleUrls: ['./mentor.component.scss'],
})
export class MentorComponent implements OnInit {
  // @ViewChild('searchbar') searchbar: ElementRef;
  searchText: string = '';
  s3BucketUrl = environment.s3BucketURL;
  mentorData: any;
  searchBy: string = 'firstName';
  searchBytech!: string;
  selectedIndex = '0';
  internalmentorcount: any;
  externalmentorcount: any;
  noinfodiv!: boolean;
  searchedWordMentor:any='';
  mentorDetails:any= [];
  constructor(
    public dialog: MatDialog,
    private mentorService: MentorService,
    private utility: UtilityService,
    private dataService : DataService
  ) {
    //  this.utility.openLoader();
  }
 
  mentorCount: any;

  ngOnInit() {
    this.noinfodiv = true;
    
      // this.getMentorData();
       this.getMentorDatabyType(0);
      this.dataService.changeMessage="firstName";
  }
  mentorDialog(): void {
    this.searchBy = 'firstName';
    this.searchText = '';
    const dialogConfig = new MatDialogConfig();
    const dialogRef = this.dialog.open(MentorDialogComponent, {
      panelClass: 'mentor-dialog',
       width: '432px',
       
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== 'close') this.getMentorDatabyType(0);
    });
  }


   getMentorData() {
    let token = localStorage.getItem('token');

    this.mentorService.getAllMentors(token).subscribe(response => {
      if ((response as any).status == 200) {
        this.mentorDetails = (response as any).data;
        this.mentorCount = (response as any).data.length;
        // if (this.mentorCount > 0) {
        //   this.noinfodiv = true
        // } else {
        //   this.noinfodiv = false;
        // }
        console.log(this.mentorDetails)
        this.utility.closeLoader();
      }
    }, err => {
      this.noinfodiv = false;
      console.log(err)
      this.utility.closeLoader();
      if (err.error && err.error.statuscode !== 200) {
        this.utility.showToast('ERROR', err.error.message);
      } else if (err.error && err.error.statuscode == 400) {
        this.utility.showToast('ERROR', err.error.message);
      }
      else {
        this.utility.showToast('ERROR', 'Please Try Again Later!!');
      }
    });

    // this.utility.closeLoader();

  }


  getMentorDatabyType(status: string | number) {
    let token = localStorage.getItem('token');

    this.mentorService.getAllMentors(token).subscribe(
      (response: any) => {
        if ((response as any).status == 200) {
          this.mentorDetails = (response as any).data;
          this.mentorCount = (response as any).data.length;
          let internalcount = [];
          let externalcount = [];
          let mentordata = [];
          mentordata = this.mentorDetails;
          internalcount = mentordata.filter(
            (a: { mentorType: string }) => a.mentorType == 'Internal'
          );
          externalcount = mentordata.filter(
            (a: { mentorType: string }) => a.mentorType == 'External'
          );
          this.internalmentorcount = internalcount.length;
          this.externalmentorcount = externalcount.length;
          if (status == 0) {
            this.selectedIndex = '0';

            this.mentorDetails = this.mentorDetails.filter(
              (a: { mentorType: string }) => a.mentorType == 'Internal'
            );
          } else {
            this.selectedIndex = '1';

            this.mentorDetails = this.mentorDetails.filter(
              (a: { mentorType: string }) => a.mentorType == 'External'
            );
          }
          this.mentorDetails = this.mentorDetails.sort(function (
            a: { firstName: number },
            b: { firstName: number }
          ) {
            if (a.firstName < b.firstName) {
              return -1;
            }
            if (a.firstName > b.firstName) {
              return 1;
            }
            return 0;
          });

          if (this.mentorCount > 0) {
            this.noinfodiv = true;
          } else {
            this.noinfodiv = false;
          }
          // this.utility.closeLoader();
        }
      },
      (err: { error: { statuscode: number; message: string } }) => {
        this.noinfodiv = false;
        console.log(err);
        this.utility.closeLoader();
        if (err.error && err.error.statuscode !== 200) {
          this.utility.showToast('ERROR', err.error.message);
        } else if (err.error && err.error.statuscode == 400) {
          this.utility.showToast('ERROR', err.error.message);
        } else {
          this.utility.showToast('ERROR', 'Please Try Again Later!!');
        }
      }
    );

    // this.utility.closeLoader();
  }

  capitalizeFirstLetter(string: {
    monthValue: string | number;
    year: number;
    dayOfMonth: number | undefined;
  }) {
    // debugger
    let month: string | any;
    if (string.monthValue < 10) month = '0' + string.monthValue;
    else {
      month = string.monthValue;
    }
    //month=month-1
    let date = new Date(string.year, month, string.dayOfMonth);
    let shortMonth = date.toLocaleString('en-us', { month: 'short' });
    // console.log(shortMonth);

    return shortMonth;
  }

  setMentorId(mentorData: any) {
    this.mentorData = mentorData;
  }

  updateMentor() {
    const dialogRef = this.dialog.open(MentorDialogComponent, {
      disableClose: true,
      panelClass: 'batch-details-dialog',
      data: { mentor: this.mentorData },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== 'close') {
        this.getMentorDatabyType(this.selectedIndex);
      }
    });
  }

  openDeleteConfirmDialog() {
    const dialogRef = this.dialog.open(MentorDeleteconfirmComponent, {
      width: '450px',
      height: '162px',
      disableClose: true,
      data: {
        mentorId: this.mentorData,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      // if (result !== 'close') {
      setTimeout(() => {
        this.getMentorDatabyType(this.selectedIndex);
      }, 2000);
      // }
    });
  }

  applyFilterMentor(searchBy: any) {
    this.dataService.changeMessage=searchBy;
  }

  searchByKeyword(keyword: string) {
    this.searchBy = keyword;
    if (this.searchBy == 'techName') {
      this.searchBytech = keyword;
    }
  }
  tabClick(event: { index: string | number }) {
    this.getMentorDatabyType(event.index);
    if(event.index==0)
    this.mentorDetails=this.mentorDetails.filter((a: { mentorType: string; }) =>a.mentorType=="Internal");
    else if(event.index==1)
    this.mentorDetails=this.mentorDetails.filter((a: { mentorType: string; })=>a.mentorType=="External");
  }
}
