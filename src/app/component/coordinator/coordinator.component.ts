import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth/auth.service';
import { CoordinatorService } from 'src/app/service/coordinator.service';
import { DataService } from 'src/app/service/dataservice.service';
import { UtilityService } from 'src/app/service/utility.service';
import { CoordinatorDeleteDialogComponent } from '../coordinator-delete-dialog/coordinator-delete-dialog.component';
import { CoordinatorDialogComponent } from '../coordinator-dialog/coordinator-dialog.component';

@Component({
  selector: 'app-coordinator',
  templateUrl: './coordinator.component.html',
  styleUrls: ['./coordinator.component.scss']
})
export class CoordinatorComponent implements OnInit {

  cooridinatorDetails:any= [];
  coordinatorCount: any;
  searchText: string = '';
  coordinatorData: any
  searchBy: string = 'firstName';
  public caseSensitive: boolean = false;
  public exactMatch: boolean = false;
  noOfData: any = 0;
  searchedWord: any;
  searchedWordCoordinator:any='';

  constructor(public openDialog: MatDialog, 
    private http: HttpClient,
    private coordinator: CoordinatorService, 
    private utility: UtilityService, 
    private authService: AuthService,
    private dataService : DataService) {
    
      this.utility.openLoader();
  }

  ngOnInit() {
    setTimeout(() => {
      this.getCoordinatorData();
      this.dataService.changeMessage="firstName";
    }, 100)
  }

  openCoordinatorDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    // dialogConfig.height = '450px';
     dialogConfig.width = '500px';
    dialogConfig.panelClass = 'coordinator-dialog';
    const dialogRef = this.openDialog.open(CoordinatorDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      if (result !== 'close') this.getCoordinatorData();
    });
    
  }

  getCoordinatorData() {
    if (this.authService.isAuthorised()) {
      let token = localStorage.getItem('token');
      this.coordinator.getCoordinator(token).subscribe(response => {
        this.cooridinatorDetails = response.data;
        this.coordinatorCount = this.cooridinatorDetails.length;
      }
      );
      this.utility.closeLoader();
    }
    this.utility.closeLoader();

  }

  setCoordinator(cooridinator: any) {
    this.coordinatorData = cooridinator
  }
  openUpdateCoordinatorDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '480px';
    // dialogConfig.height = '450px';
    dialogConfig.panelClass = 'coordinator-dialog';
    dialogConfig.data = { data: this.coordinatorData, operation: 'update' };
    const dialogRef = this.openDialog.open(CoordinatorDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result !== 'close')
        setTimeout(() => {

          this.getCoordinatorData();
        }, 1000)

    });
  }

  openDeleteConfirmDialog() {
    const dialogRef = this.openDialog.open(CoordinatorDeleteDialogComponent, {
      width: '450px',
      height: '162px',
      disableClose: true,
      data: { coordinatorId: this.coordinatorData.id }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== 'close') {
        setTimeout(() => {

          this.getCoordinatorData();
        }, 1000)
      }
    });
  }

  searchByKeyword(keyword: string) {
    this.searchBy = keyword
  }

  applyFilter(event: any) {
    this.searchedWord = event.target.value;
    if (this.searchedWord == null || this.searchedWord == '') {
      this.ngOnInit()
    } else {
      this.coordinator.searchCoordinator(localStorage.getItem("token"),this.searchBy,this.searchedWord)
      .subscribe(response => {
        this.cooridinatorDetails = response.data;
        this.coordinatorCount = this.cooridinatorDetails.length;
      })
    }
  }

  applyFilterCoordinator(searchBy: any) {
    this.dataService.changeMessage=searchBy;
  }
  
  index(i: string | any[]) {
    this.noOfData = i.length
  }
  capitalizeFirstLetter(string: string) {
    let str = string.toLowerCase();
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

}
