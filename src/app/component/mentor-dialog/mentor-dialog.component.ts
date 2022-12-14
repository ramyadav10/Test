import { Component, OnInit, Inject } from '@angular/core';
// import { ProfilePicComponent } from '../profile-pic/profile-pic.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { MentorDataDailogComponent, mentorPost } from '../mentor-data-dailog/mentor-data-dailog.component';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ProfilePicComponent } from '../profile-pic/profile-pic.component';
//import { mentorPost } from '../mentor-data-dailog/mentor-data-dailog.component';
import { MentorService } from 'src/app/service/mentor.service';
import { UtilityService } from 'src/app/service/utility.service';
import { environment } from 'src/environments/environment';
import { MentorDTO, MentorStatus } from 'src/app/model/mentor-dto.model';
import { BatchService } from 'src/app/service/batch.service';
import { DatePipe, formatDate } from '@angular/common';
import { FellowshipService } from 'src/app/service/fellowship.service';

export interface mentorPost {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-mentor-dialog',
  templateUrl: './mentor-dialog.component.html',
  styleUrls: ['./mentor-dialog.component.scss']
})
export class MentorDialogComponent implements OnInit {
  s3BucketUrl = environment.s3BucketURL;
  mentort: any = 'Internal';
  buttontoggle = 'Support';
  internalButtontoggle = 'Practice Head';
  selected = '';
  visible: boolean = true;
  setImage: boolean = false;
  mentorImage: any = null;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;
  imageSource: any = null;
  profileImage: any;
  mentorForm!: FormGroup;
  // selectedButton : any = 'Support';
  separatorKeysCodes = [ENTER, COMMA];
  isUpdate: boolean = false;
  keywords = [];
  techStackName: any = "php";
  mentorDetails!: MentorDTO[];
  myModelProperty!: String[];
  mystatus: any='';
  mentorStatus!: any[];
  disable: boolean = false
  datepicker: any
  // mentorName = new FormControl('', [Validators.required,Validators.minLength(3),Validators.pattern('[a-zA-Z ]*')]);
  // phnNumber = new FormControl('', [Validators.required,Validators.maxLength(10),Validators.minLength(10),
  //   Validators.pattern('[6-9][0-9]{9}')]);
  //   mentorType = new FormControl('', [Validators.required]);
  // email = new FormControl('', [Validators.required,Validators.pattern('^([a-zA-Z0-9][.-]?)+@([a-zA-Z0-9]+[.-]?)*[a-zA-Z0-9][.][a-zA-Z]{2,3}$')]);
  // exYears = new FormControl('', [Validators.required,Validators.pattern('[0-9]*'),Validators.maxLength(2)]);
  // time = new FormControl('', [Validators.required]);
  // description = new FormControl('', [Validators.required]);x`
  // tech = new FormControl('', [Validators.required]);

  constructor(public dialogRef: MatDialogRef<MentorDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any,private formBuilder: FormBuilder,
    public dialog: MatDialog, private datePipe: DatePipe,
    private mentorService: MentorService, private utility: UtilityService, private fellowshipService: FellowshipService, public batchService: BatchService) {
    this.utility.openLoader();



    dialogRef.disableClose = true;
    this.mentorForm = this.formBuilder.group({
      mentorName: ["", [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*')]],
      lastName: ["", [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*')]],
      phnNumber: ["", [Validators.required, Validators.maxLength(10), Validators.minLength(10),
      Validators.pattern('[6-9][0-9]{9}')]],
      mentorType: [""],
      email: ["", [Validators.required, Validators.pattern('^([a-zA-Z0-9][.-]?)+@([a-zA-Z0-9]+[.-]?)*[a-zA-Z0-9][.][a-zA-Z]{2,3}$')]],
      exYears: ["", [Validators.required, Validators.pattern('[0-9]*'), Validators.maxLength(2)]],
      time: ["", [Validators.required]],
      description: [""],
      tech: ["", [Validators.required]],
      mentorid: [""],
      profilePhoto: [""],
      StartDate: ['', [Validators.required]],
      mentorStatus: ['', [Validators.required]],
      employeeID: ['',]


    });
    this.getMentorData();
    if (data !== null) {
      // this.isUpdate = true;
      if (data.mentor.startDate) {
        var month = data.mentor.startDate.month.charAt(0).toLowerCase() + data.mentor.startDate.month.slice(1);

        let str = data.mentor.startDate.dayOfMonth + ' ' + month + ' ' + data.mentor.startDate.year
        // var date =formatDate(new Date(), str, 'en');
        this.mentorForm.value.StartDate = new Date(str);
        this.datepicker = new Date(str)


      }
      this.mentorForm.patchValue({
        mentorName: data.mentor.firstName,
        lastName: data.mentor.lastName,
        email: data.mentor.email,
        exYears: data.mentor.experienceYears,
        description: data.mentor.mentorDescription,
        mentorRole: data.mentor.mentorRole,
        mentorType: data.mentor.mentorType,
        phnNumber: data.mentor.mobileNumber,
        time: data.mentor.preferredTime,
        tech: data.mentor.techStack,
        mentorid: data.mentor.supervisorId,
        mentorStatus: data.mentor.status,
        employeeID: data.mentor.employeeId
        // StartDate: new Date(str)

      });
      this.mentorForm.value.mentorStatus = data.mentor.status
      this.mystatus = data.mentor.status

      // this.mentorForm.value.tech="Java,php,nodejs";
      // this.mentorForm.value.tech="Java,Php";


      this.myModelProperty = []
      if (this.mentorForm.value.tech.length > 0) {
        this.mentorForm.value.tech.forEach((element: { techName: String; }) => {
          this.myModelProperty.push(element.techName);

        });

      }

      // this.mentorForm.value.tech=this.myModelProperty
      this.mentorImage = `${this.s3BucketUrl}${data.mentor.profileImageURL}`,
        this.mentort = data.mentor.mentorType
      this.buttontoggle = data.mentor.mentorType == "External" ? this.data.mentor.mentorRole : this.buttontoggle;
      this.internalButtontoggle = data.mentor.mentorType == "Internal" ? this.data.mentor.mentorRole : this.internalButtontoggle;
      this.imageSource = data.mentor.profileImageURL
      // console.log("techstack",this.mentorForm.get('tech').setValue(data.mentor.techStack));
    }
  }
  fileEvent($event: { target: { files: File[]; }; }) {
    const fileSelected: File = $event.target.files[0];
    this.profileImage = fileSelected;
    this.mentorForm.value.profilePhoto = this.profileImage

  }
  public hasError = (formControlName: string, errorName: string) => {
    return this.mentorForm.controls[formControlName].hasError(errorName);
  }
  getErrorForFname() {

    return this.mentorForm.get('mentorName')?.hasError('required') ? 'First Name Cannot be blank' :
      this.mentorForm.get('mentorName')?.hasError('minlength') ? 'Minimun 3 digit required' :
        this.mentorForm.get('mentorName')?.hasError('pattern') ? "Enter valid name" :
          '';
  }
  getErrorForLname() {
    return this.mentorForm.get('lastName')?.hasError('required') ? 'First Name Cannot be blank' :
      this.mentorForm.get('lastName')?.hasError('minlength') ? 'Minimun 3 digit required' :
        this.mentorForm.get('lastName')?.hasError('pattern') ? "Enter valid name" :
          '';
  }
  getErrorForPhnNum() {

    return this.mentorForm.get('phnNumber')?.hasError('required') ? 'Phone Number Cannot be blank' :
      this.mentorForm.get('phnNumber')?.hasError('maxLength') ? '10 digit required' :
        this.mentorForm.get('phnNumber')?.hasError('pattern') ? "Enter valid Phone Number" :
          '';
  }
  getErrorForEmail() {
    return this.mentorForm.get('email')?.hasError('required') ? 'Email Cannot be blank' :
      this.mentorForm.get('email')?.hasError('pattern') ? "Enter valid Email" :
        '';
  }
  getErrorForTechStack() {
    return this.mentorForm.get('tech')?.hasError('required') ? 'Tech Stack Cannot be blank' : '';
  }
  getErrorForPracticeHead() {
    return this.mentorForm.get('tech')?.hasError('required') ? 'Practice head Cannot be blank' : '';
  }
  getErrorForemployeeID() {
    return this.mentorForm.get('employeeID')?.hasError('employeeID') ? 'Employee Id Cannot be blank' :
      this.mentorForm.get('employeeID')?.hasError('pattern') ? "Enter valid Ex" :
        '';
  }

  getErrorForExYears() {
    return this.mentorForm.get('exYears')?.hasError('required') ? 'Ex year Cannot be blank' :
      this.mentorForm.get('exYears')?.hasError('pattern') ? "Enter valid Ex" :
        '';
  }
  getErrorForTimeSlot() {
    return this.mentorForm.get('time')?.hasError('required') ? 'Time Slot Cannot be blank' : '';

  }
  PreTimeList:any= [];
  techstackData:any= [];
  ngOnInit() {
    this.getPreTime();
    this.getTechType();
    this.getMentorStatus();
  }

  mentors: mentorPost[] = [
    { value: 'steak-0', viewValue: 'Support' },
    { value: 'pizza-1', viewValue: 'Lead' }
  ];

  getPreTime() {
    this.mentorService.getTimeSlots().subscribe(response => {
      this.PreTimeList = (response as any).data;
      if ((response as any).status == 200) {

        this.utility.closeLoader();
        // this.utility.showToast('SUCCESS',(response as any).message);
      }
    });

    this.utility.closeLoader();

  }
  getMonthYear(d: string | number | Date) {
    var dt = new Date(d);
    var dtm = dt.getMonth() + 1;
    var dty = dt.getFullYear();
    var day = dt.getDate();
    return dty + "-" + dtm + "-" + day
  }
  selectDate(dte: { value: any; }) {
    let date = this.getMonthYear(dte.value)
    let copy = new Date(Number(dte.value))

    this.mentorForm.value.StartDate = date;

    // this.mentorForm.value.StartDate=this.datePipe.transform(copy,"yyyy-MM-dd")

    // copy.setDate(date.getDate() + days)
  }

  getMentorStatus() {
    let token = localStorage.getItem('token');

    let data = {
      keyType: 'MENTOR_STATUS'
    }
    this.batchService.getBatchStatusParams(token, data.keyType).subscribe((res) => {

      this.mentorStatus = res.data

console.log("mentorStatus ::::",this.mentorStatus);

    }, (err) => {
      console.log(err);

    })
  }

  getTechType() {
    this.mentorService.getTechStack().subscribe(response => {
      this.techstackData = (response as any).data;
      if ((response as any).status == 200) {
        this.utility.closeLoader();
        // this.utility.showToast('SUCCESS',(response as any).message);
      }
    });

    this.utility.closeLoader();
  }

  getMentorData() {
    let token = localStorage.getItem('token');

    this.mentorService.getAllMentors(token).subscribe((response: any) => {
      if ((response as any).status == 200) {
        this.mentorDetails = (response as any).data;
        this.mentorDetails = this.mentorDetails.filter(a => (a.mentorRole == "Supervisor" || a.mentorRole == "Practice Head"));
        // this.mentorCount = (response as any).data.length;
        this.utility.closeLoader();
      }
    }, (err: { error: { statuscode: number; message: string; }; }) => {
      console.log(err)
      if (err.error && err.error.statuscode !== 200) {
        this.utility.showToast('ERROR', err.error.message);
        this.utility.closeLoader();
      } else if (err.error && err.error.statuscode == 400) {
        this.utility.showToast('ERROR', err.error.message);
        this.utility.closeLoader();
      }
      else {
        this.utility.showToast('ERROR', 'Please Try Again Later!!');
      }
    });

    this.utility.closeLoader();
  }

  capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  mentor(status: string) {
    this.buttontoggle = status;

  }
  closeMentordata(): void {
    this.dialogRef.close();
  }

  editProfilePic() {
    const dialogRef = this.dialog.open(ProfilePicComponent, {
      disableClose: true,
      autoFocus: true,
      width: '700px',
      panelClass: 'image-cropper-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result !== '') {
        this.imageSource = result.cropedImg.base64
        this.profileImage = result.image;
        this.mentorForm.value.profilePhoto = this.profileImage
        this.mentorImage = result.cropedImg.base64
        this.disable = true
      }
    });

  }

  // editProfilePic() {
  //   const dialogRef = this.dialog.open(ProfilePicComponent, {
  //     disableClose: true,
  //     autoFocus: true,
  //     width: '700px',
  //     panelClass: 'image-cropper-dialog',
  //   });
  //   dialogRef.afterClosed().subscribe((result) => {
  //     if (result !== '') {
  //       this.imageSource = result.cropedImg.base64;
  //       this.profileImage = result.image;
  //     }
  //   });
  // }

  closetechstack(): void {
    this.dialogRef.close();
  }
  changeGender(event: { value: any; }) {
    this.mentort = event.value;
    // this.mentorForm.get('mentorType').setValue(this.mentort);
  }

  createMentor() {
debugger
    let role = this.mentort == 'External' ? this.buttontoggle : this.internalButtontoggle;


    // let dta = {
    //   'name': this.mentorForm.value.mentorName,
    //   'mentorType': this.mentort,
    //   'mentorRole': role,
    //   'mobileNumber': this.mentorForm.value.phnNumber,
    //   'email': this.mentorForm.value.email,
    //   'experienceYears': this.mentorForm.value.exYears,
    //   'preferredTime': this.mentorForm.value.time,
    //   'mentorDescription': this.mentorForm.value.description,
    //   'file': this.profileImage,
    //   'techId': this.mentorForm.value.tech
    // }

    if (this.mentorForm.value.mentorid == '') {
      this.mentorForm.value.mentorid = 0
    }
    this.mentorForm.value.StartDate = this.datePipe.transform(this.mentorForm.value.StartDate, "yyyy-MM-dd")
    if (role == 'Practice Head') {
      this.mentorForm.value.mentorid = 0
    }
    // this.profileImage="admin/mentor/1_1619426598_shopping_image.png;type=image/png"
    const formData = new FormData();
    formData.append('email', this.mentorForm.value.email);
    formData.append('experienceYears', this.mentorForm.value.exYears);
    formData.append('file', this.profileImage);
    formData.append('mentorDescription', this.mentorForm.value.description);
    formData.append('mentorRole', role);
    formData.append('mentorType', this.mentort);
    formData.append('mobileNumber', this.mentorForm.value.phnNumber);
    formData.append('firstName', this.mentorForm.value.mentorName);
    formData.append('lastName', this.mentorForm.value.lastName);
    formData.append('preferredTime', this.mentorForm.value.time);
    formData.append('supervisorId', this.mentorForm.value.mentorid);
    formData.append('techStacks', this.mentorForm.value.tech);
    // formData.append('startDate', this.mentorForm.value.StartDate);
    formData.append('status', this.mentorForm.value.mentorStatus);
    formData.append('employeeId', this.mentorForm.value.employeeID);


    let token = localStorage.getItem('token');
    // this.utility.openLoader();

    this.mentorService.createMentor(formData, token)
      .subscribe(response => {
        if ((response as any).status == 200) {
          this.dialogRef.close();
          this.utility.closeLoader();
          this.utility.showToast('SUCCESS', (response as any).message);
        }
      }, err => {
        if (err.error && err.error.statuscode == 409) {
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

    this.utility.closeLoader();
  }
  updateMentor() {
    this.setImage = true;
    const role = this.mentort == 'External' ? this.buttontoggle : this.internalButtontoggle;
    let techidvalue: any[] = []
    let techId = this.techstackData.forEach((val:any) => {

      this.mentorForm.value.tech.forEach((element: any) => {
        if (element === val["techname"]) {
          // return val;
          techidvalue.push(val["id"]);
        }
      });
      return techidvalue;

    })
    techidvalue.join(',');
    this.mentorForm.value.StartDate = this.datePipe.transform(this.mentorForm.value.StartDate, "yyyy-MM-dd")

    let data = {
      'firstName': this.mentorForm.value.mentorName,
      'lastName': this.mentorForm.value.lastName,
      'mentorType': this.mentort,
      'mentorRole': role,
      'mobileNumber': this.mentorForm.value.phnNumber,
      'email': this.mentorForm.value.email,
      'experienceYears': this.mentorForm.value.exYears,
      'preferredTime': this.mentorForm.value.time,
      'mentorDescription': this.mentorForm.value.description,
      'file': this.profileImage,
      'techId': techidvalue[0],
      'techStacks': techidvalue,
      'supervisorId': this.mentorForm.value.mentorid,
      'startDate': this.mentorForm.value.StartDate,
      'status': this.mentorForm.value.mentorStatus,
      'employeeId': this.mentorForm.value.employeeID
    }
    let token = localStorage.getItem('token');
    // this.utility.openLoader();
    this.mentorService.updateMentor(data, token, this.data.mentor.id)
      .subscribe(response => {

        if ((response as any).status == 200) {
          this.dialogRef.close();
          this.utility.closeLoader();
          this.utility.showToast('SUCCESS', (response as any).message);
        } else {
          this.utility.showToast('ERROR', (response as any).message);
        }
      }, err => {
        if (err.error && err.error.statuscode == 409) {
          this.utility.showToast('ERROR', err.error.message);
          this.utility.closeLoader();
        } else if (err.error && err.error.statuscode == 400) {
          this.utility.showToast('ERROR', err.error.message);
          //this.utility.closeLoader();
        }
        else if (err.error && err.error.status == 119) {
          this.utility.showToast('ERROR', err.error.message);

        }
        else {
          this.utility.showToast('ERROR', 'Please try again Later!!!');
        }
      });

    this.utility.closeLoader();
  }

  internalMentor(status: string) {
    this.internalButtontoggle = status;

  }

  remove(keyword: never): void {
    let index = this.keywords.indexOf(keyword);

    if (index >= 0) {
      this.keywords.splice(index, 1);
    }
  }
}
