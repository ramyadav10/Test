import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewTimeSlotDialogComponent } from '../new-time-slot-dialog/new-time-slot-dialog.component';
import { FellowshipService } from 'src/app/service/fellowship.service';
import { AdminService } from 'src/app/service/admin.service';
import { TechstackDialogComponent } from '../techstack-dialog/techstack-dialog.component';
import { UtilityService } from 'src/app/service/utility.service';
import { MentorService } from 'src/app/service/mentor.service';
import { environment } from 'src/environments/environment';
import { TechstackDeleteconfirmComponent } from '../techstack-deleteconfirm/techstack-deleteconfirm.component';
import { TimeslotDeleteconfirmComponent } from '../timeslot-deleteconfirm/timeslot-deleteconfirm.component';
import { AddProgramTypeComponent } from '../add-program-type/add-program-type.component';
import { DeleteconfirmProgramTypeComponent } from '../deleteconfirm-program-type/deleteconfirm-program-type.component';

@Component({
  selector: 'app-settings-new',
  templateUrl: './settings-new.component.html',
  styleUrls: ['./settings-new.component.scss']
})
export class SettingsNewComponent implements OnInit {


  constructor(public dialog: MatDialog, private fellowshipService: FellowshipService, private utility: UtilityService,
    private mentorService: MentorService) {
    // this.utility.openLoader();
  }
  techstackData: any[] = [];
  timeSlots: any[] = [];
  techStackCount: any;
  timeSlotCount: any;
  programTypes: any;
  programTypeCount: any;
  s3BucketUrl = environment.s3BucketURL;

  ngOnInit() {
     this.techstack();
     this.getTimeSlots();
     this.getProgramType();
  }

  techstack() {

    this.mentorService.getTechStack().subscribe(response => {
      
      // if ((response as any).status == 200) {
        this.techstackData = response.data;
        console.log('img data',this.techstackData[0].imagePath);
        
        this.techStackCount = (response as any).data.length;
        // this.utility.closeLoader();
      // }
    }, err => {
      // this.utility.closeLoader();
      if (err.error && err.error.statuscode !== 200) {
        this.utility.showToast('ERROR', err.error.message);
        this.utility.closeLoader();
      } else if (err.error && err.error.statuscode == 400) {
        this.utility.showToast('ERROR', err.error.message);
        //this.utility.closeLoader();
      }
      else {
        this.utility.showToast('ERROR', 'Please Try Again Later!!');
      }
    });
  }


  dialogtechstack(): void {
    const dialogRef = this.dialog.open(TechstackDialogComponent,
      {
        disableClose: true,
        width: '450px',
        height: '330px',
        panelClass: 'threshold1-dialog'
      });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
  openDialog() {
    const dialogRef = this.dialog.open(NewTimeSlotDialogComponent, {
      disableClose: true,
      width: '460px',
      height: '320px',
      panelClass: 'timeSlot-dialog',
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.ngOnInit();
    });
  }
  addProgramType(): void {
    const dialogRef = this.dialog.open(AddProgramTypeComponent,
      {
        disableClose: true,
        width: '450px',
        height: '380px',
        // height: 'auto',
        panelClass: 'program-dialog'
      });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
  getTimeSlots() {
    this.mentorService.getTimeSlots().subscribe(response => {
      if ((response as any).status == 200) {
        this.timeSlots = response.data;
        this.timeSlotCount = (response as any).data.length;
        this.utility.closeLoader();
        // this.utility.showToast('SUCCESS',(response as any).message);
      }
    }, err => {
      this.utility.closeLoader();
      if (err.error && err.error.statuscode !== 200) {
        this.utility.showToast('ERROR', err.error.message);
        this.utility.closeLoader();
      } else if (err.error && err.error.statuscode == 400) {
        this.utility.showToast('ERROR', err.error.message);
        //this.utility.closeLoader();
      }
      else {
        this.utility.showToast('ERROR', 'Please Try Again Later!!');
      }
    });
  }
  openTechStackDeleteConfirmDialog(techId: any) {
    const dialogRef = this.dialog.open(TechstackDeleteconfirmComponent, {
      disableClose: true,
      width: '450px',
      height: '162px',
      data: { techId: techId }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== 'close') {
        this.techstack();
      }


    })
  }
  openTimeSlotDeleteConfirmDialog(slotId: any) {
    const dialogRef = this.dialog.open(TimeslotDeleteconfirmComponent, {
      disableClose: true,
      width: '450px',
      height: '162px',
      data: { slotId: slotId }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== 'close') {
        this.getTimeSlots();
      }
    })
  }

  openProgramTypeDeleteConfirmDialog(programId: any) {
    const dialogRef = this.dialog.open(DeleteconfirmProgramTypeComponent, {
      disableClose: true,
      width: '450px',
      height: '162px',
      data: { programId: programId }
    });
    // window.location.reload();
    dialogRef.afterClosed().subscribe(result => {
      if (result !== 'close') {
        this.getProgramType();
      }
    })
  }

  updateTechStack(items: any) {
    const dialogRef = this.dialog.open(TechstackDialogComponent, {
      disableClose: true,
      width: '450px',
      height: '330px',
      panelClass: 'threshold1-dialog',
      data: { 'data': items, operation: 'update' }

    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== 'close')
        this.techstack()

    });
  }
  capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  capitalizeWords(string: string) {
    return `${string.toUpperCase()}`;
  };
  capitalizeSentenceWord(input: string) {
    
    
    var words = input.split(' ');
    var CapitalizedWords: any[] = [];
    words.forEach((element: string | any[]) => {
     
      
      CapitalizedWords.push(element[0].toUpperCase() + element.slice(1, element.length));
    });
    return CapitalizedWords.join(' ');
  }
  updateTimeSlot(slot: any) {
    const dialogRef = this.dialog.open(NewTimeSlotDialogComponent, {
      disableClose: true,
      width: '460px',
      height: '320px',
      panelClass: 'timeSlot-dialog',
      data: { 'data': slot, 'operation': 'update' }

    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== 'close')
        this.getTimeSlots()

    });
  }

  updateProgramType(program: any) {
    const dialogRef = this.dialog.open(AddProgramTypeComponent, {
      disableClose: true,
      width: '450px',
      height: '380px',
      // height: 'auto',
      panelClass: 'program-dialog',
      data: { 'data': program, operation: 'update' }

    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== 'close') {
        this.getProgramType();
      }
    });
  }

  getProgramType() {
    this.mentorService.getProgramType().subscribe(response => {
      if ((response as any).status == 200) {
        this.programTypes = response.data;
        this.programTypeCount = (response as any).data.length;
        // this.utility.closeLoader();
        // this.utility.showToast('SUCCESS',(response as any).message);
      }
    }, err => {
      this.utility.closeLoader();
      if (err.error && err.error.statuscode !== 200) {
        this.utility.showToast('ERROR', err.error.message);
        this.utility.closeLoader();
      } else if (err.error && err.error.statuscode == 400) {
        this.utility.showToast('ERROR', err.error.message);
        //this.utility.closeLoader();
      }
      else {
        this.utility.showToast('ERROR', 'Please Try Again Later!!');
      }
    });
  }
}
