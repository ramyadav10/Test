import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MentorService } from 'src/app/service/mentor.service';
import { UtilityService } from 'src/app/service/utility.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-new-time-slot-dialog',
  templateUrl: './new-time-slot-dialog.component.html',
  styleUrls: ['./new-time-slot-dialog.component.scss']
})
export class NewTimeSlotDialogComponent implements OnInit {
  timeSlotForm: FormGroup;
  operation: string = "add";
  hours: any;
  minutes: any;
  meridian: any = "-";
  fromMeridian: any;
  toMeridian: any;
  fromTime: any;
  toTime: any;
  fullFromTime: any;
  fullToTime: any;
  constructor(private dialogRef: MatDialogRef<NewTimeSlotDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    private mentorService: MentorService, private formBuilder: FormBuilder, private utility: UtilityService) {

    // this.utility.openLoader();
    this.timeSlotForm = this.formBuilder.group({
      slotName: ["", [Validators.required, Validators.pattern('[a-zA-Z]*'), Validators.minLength(3)]],
      slotFromTime: ["", [Validators.required]],
      slotToTime: ["", [Validators.required]]
    });
    console.log('data value',data);
    
    if (data !== null) {
      let splitTime = data.data.slotTime.split(/[ -]/);
      console.log('time '+splitTime);
      
      this.fromTime = splitTime[0];
      this.fromMeridian = splitTime[1];
      this.toTime = splitTime[2];
      this.toMeridian = splitTime[3];
      this.operation = data.operation;
      this.timeSlotForm.patchValue({
        slotName: data.data.slotName,
        slotFromTime: this.convertTime12to24(this.fromTime, this.fromMeridian),
        slotToTime: this.convertTime12to24(this.toTime, this.toMeridian)
      });
      this.fullFromTime = this.timeSlotForm.value.slotFromTime + ' ' + this.fromMeridian;
      this.fullToTime = this.timeSlotForm.value.slotToTime + ' ' + this.toMeridian;

    }
  }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close('close');
  }
  getErrorForSlotName() {
    return this.timeSlotForm.get('slotName')?.hasError('required') ? 'Slot-Name Cannot be blank' :
      this.timeSlotForm.get('slotName')?.hasError('minlength') ? 'Minimun 3 digit required' :
        this.timeSlotForm.get('slotName')?.hasError('pattern') ? "Enter valid name" :
          '';
  }
  getErrorForSlotFromTime() {
    return this.timeSlotForm.get('slotFromTime')?.hasError('required') ? 'Cannot be blank' : '';
  }
  getErrorForSlotToTime() {
    return this.timeSlotForm.get('slotToTime')?.hasError('required') ? 'Cannot be blank' : '';
  }
  addTimeSlot() {
    
    if (this.timeSlotForm.invalid) {
      this.utility.markFormGroupTouched(this.timeSlotForm);
    } else {
      let body = {
        slotName: this.timeSlotForm.value.slotName,
        slotTime: this.fromTime + ' ' + this.fromMeridian + "-" + this.toTime + ' ' + this.toMeridian
        // slotTime: this.fromTime + ' ' +  "-" + this.toTime + ' ' 
      }
      let token = localStorage.getItem('token');
      this.mentorService.addTimeSlot(body, token)
        .subscribe((response:any) => {
          if ((response as any).status == 200) {
            this.dialogRef.close();
            this.utility.closeLoader();
            this.utility.showToast('SUCCESS', (response as any).message);
          }
        }, (err: { error: { statuscode: number; message: string; }; }) => {
          if (err.error && err.error.statuscode !== 200) {
            this.utility.showToast('ERROR', err.error.message);
            // this.utility.closeLoader();
          } else {
            this.utility.showToast('ERROR', 'Please Try Again Later!!');
          }
        });

      this.utility.closeLoader();
    }
  }
  async updateTimeSlot() {
    if (this.fromMeridian === "PM") {
      this.fromTime = await this.convertTime24to12(this.fromTime, this.fromMeridian)
    }
    if (this.toMeridian === "PM") {
      this.toTime = await this.convertTime24to12(this.toTime, this.toMeridian)
    }
    let body = {
      slotName: this.timeSlotForm.value.slotName,
      slotTime: this.fromTime + ' ' + this.fromMeridian + "-" + this.toTime + ' ' + this.toMeridian
    }
    let token = localStorage.getItem('token');
    this.mentorService.updateTimeSlot(body, this.data.data.id, token)
      .subscribe((response: any) => {
        if ((response as any).status == 200) {
          this.dialogRef.close();
          this.utility.closeLoader();
          this.utility.showToast('SUCCESS', (response as any).message);
        }
      }, (err: { error: { statuscode: number; message: string; }; }) => {
        if (err.error && err.error.statuscode !== 200) {
          this.utility.showToast('ERROR', err.error.message);
          // this.utility.closeLoader();
        } else {
          this.utility.showToast('ERROR', 'Please Try Again Later!!');
        }
      });

    this.utility.closeLoader();
  }

  onTimeChange(e:any, type: string) {
    var timeSplit = e.target.value.split(':');
    // hours,
    // minutes,
    // meridian;
    this.hours = timeSplit[0];
    this.minutes = timeSplit[1];
    if (this.hours > 12) {
      this.meridian = 'PM';
      this.hours -= 12;
      this.hours = [11, 12].includes(this.hours) ? `${this.hours}` : `0${this.hours}`;
    } else if (this.hours < 12) {
      this.meridian = 'AM';
      if (this.hours == 0) {
        this.hours = 12;
      }
    } else {
      this.meridian = 'PM';
    }
    if (type === "from") {
      this.fromMeridian = this.meridian
      this.fromTime = this.hours + ':' + this.minutes
      // this.fullFromTime = this.fromTime + ' ' + this.fromMeridian
    }
    if (type === "to") {
      this.toMeridian = this.meridian
      this.toTime = this.hours + ':' + this.minutes;
      // this.fullToTime = this.toTime + ' ' + this.toMeridian
    }

  }
  convertTime12to24(time: { split: (arg0: string) => [any, any]; }, modifier: string) {
    let [hours, minutes] = time.split(":");
    if (hours === "12") {
      hours = "00";
    }
    if (modifier === "PM") {
      hours = parseInt(hours, 10) + 12;
    }
    return `${hours}:${minutes}`;
  };
  convertTime24to12(time: { split: (arg0: string) => [any, any]; }, modifier: any) {
    let [hours, minutes] = time.split(":");
    if (hours >= 0 && hours <= 24 && minutes >= 0 && minutes <= 60) {
      // let AMorPM='AM';
      // if(hrEle>12)AMorPM='PM';
      hours = (hours % 12);
    }
    let res = [11, 12].includes(hours) ? `${hours}:${minutes}` : `0${hours}:${minutes}`

    return res;
  }
}
