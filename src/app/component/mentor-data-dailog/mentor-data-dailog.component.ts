import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatChipInputEvent } from '@angular/material/chips';

import {ENTER, COMMA} from '@angular/cdk/keycodes';
import { Validators, FormControl } from '@angular/forms';
import { ProfilePicComponent } from '../profile-pic/profile-pic.component';
import { BatchService } from 'src/app/service/batch.service';
import { NEVER, never } from 'rxjs';
export interface mentorPost {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-mentor-data-dailog',
  templateUrl: './mentor-data-dailog.component.html',
  styleUrls: ['./mentor-data-dailog.component.scss']
})
export class MentorDataDailogComponent implements OnInit {
  buttontoggle = '';
  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;
  imageSource: any = null;

  // Enter, comma
  separatorKeysCodes = [ENTER, COMMA];

  keywords = [];

  add(event: MatChipInputEvent): void {
    let input = event.chipInput;
    let value = event.value || NEVER;

    // Add our keyword
    if ((value || '')) {
      // add this in to array value
      this.keywords.push();
    }

    // Reset the input value
    if (input) {
      input.id = '';
    }
  }

  remove(keyword: never): void {
    let index = this.keywords.indexOf(keyword);

    if (index >= 0) {
      this.keywords.splice(index, 1);
    }
  }




  constructor(public dialogRef: MatDialogRef<MentorDataDailogComponent>,
    public dialog: MatDialog,public batchService:BatchService) { }
mentorName = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]*'), Validators.minLength(3)]);
mentorPost = new FormControl('', [Validators.required]);
  ngOnInit() {
    this.getMentorStatus();
  }

  mentors: mentorPost[]= [
    {value: 'steak-0', viewValue: 'Buddy'},
    {value: 'pizza-1', viewValue: 'Lead'},
    {value: 'tacos-2', viewValue: 'Enginner'}
  ];


  mentor(status: string) {
    this.buttontoggle = status;
    console.log(this.buttontoggle);
    
  }
  closeMentordata():void{
this.dialogRef.close();
  }
  createMentor(){
    console.log("mentro data entered");
  }


  getMentorStatus(){
    let token = localStorage.getItem('token');

    let data = {
      keyType: 'MENTOR_STATUS'
    }
    this.batchService.getBatchStatusParams(token, data.keyType).subscribe((res) => {
      console.log(res);
      // this.BatchStatusArray = res.data
      // console.log(this.BatchStatusArray);


    }, (err) => {
      console.log(err);

    })
  }
  editProfilePic(){

    const dialogRef = this.dialog.open(ProfilePicComponent, {
      disableClose : true,
      autoFocus : true,
      width : '700px',
      panelClass: 'image-cropper-dialog',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('data after dialog is closed in mentor data comp: ', result);
      console.log("image source: ", result.image.base64);
      
      this.imageSource = result.image.base64
    });
  }
}
