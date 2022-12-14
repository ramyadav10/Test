import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HiringService } from 'src/app/service/hiring.service';
import { UtilityService } from 'src/app/service/utility.service';
import { JoincandidateComponent } from '../joincandidate/joincandidate.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-candidate-details-dialog',
  templateUrl: './candidate-details-dialog.component.html',
  styleUrls: ['./candidate-details-dialog.component.scss']
})
export class CandidateDetailsDialogComponent implements OnInit {
  id: any;
  studentDetails:any = null;
  constructor( @Inject(MAT_DIALOG_DATA) private data: { id: any },
  private dialogRef: MatDialogRef<CandidateDetailsDialogComponent>,private hiringService:HiringService,
  private utility:UtilityService,public openDialog: MatDialog) { }

  ngOnInit() {
    this.id = this.data.id;
    console.log(this.id);
    
    this.getStudentDetails(this.id);
    
  }
  getStudentDetails(id: any){
    this.hiringService.getCandidateDetailById(String(id))
    .subscribe(response =>{
      console.log(response);
      this.studentDetails = (response as any).data;
    });
  }

  openConformJoinDialog(studentData: any) {
    console.log(studentData);
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '450px';
    dialogConfig.height = '162px';
    dialogConfig.data = {
      studentData
    };
    const localDialogRef = this.openDialog.open(JoincandidateComponent, dialogConfig);
    localDialogRef.afterClosed().subscribe(response => {
      if (response != null)
        this.dialogRef.close('success');
    });
  }

  close() {
    this.dialogRef.close(null);
  }

}
