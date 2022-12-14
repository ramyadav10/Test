import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-mentor-sheet-dialog',
  templateUrl: './mentor-sheet-dialog.component.html',
  styleUrls: ['./mentor-sheet-dialog.component.scss']
})
export class MentorSheetDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<MentorSheetDialogComponent>) { }

  ngOnInit() {
  }
  clear(){
this.dialogRef.close();
  }
}
