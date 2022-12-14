import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-profile-pic',
  templateUrl: './profile-pic.component.html',
  styleUrls: ['./profile-pic.component.scss']
})
export class ProfilePicComponent implements OnInit {

  imageChangedEvent: any = '';
  croppedImageEvent!: ImageCroppedEvent;
  path: any = '';
  img!: File;
  constructor( private dialogRef: MatDialogRef<ProfilePicComponent>) { }

  ngOnInit() {
  }
  
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.path = event.target.files[0].name;
    this.img = event.target.files[0]
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImageEvent = event;
  }

  loadImageFailed(){
    console.log("loadImage Failed");
    
  }
}
