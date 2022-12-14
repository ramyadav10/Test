import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MentorService } from 'src/app/service/mentor.service';
import { UtilityService } from 'src/app/service/utility.service';

@Component({
  selector: 'app-mentor-deleteconfirm',
  templateUrl: './mentor-deleteconfirm.component.html',
  styleUrls: ['./mentor-deleteconfirm.component.scss']
})
export class MentorDeleteconfirmComponent implements OnInit {

  constructor(private datePipe: DatePipe,public dialogRef: MatDialogRef<MentorDeleteconfirmComponent>, private mentorService: MentorService, private utility: UtilityService, @Inject(MAT_DIALOG_DATA) public data: any) { }
  techidvalue:any

  ngOnInit() {
  }
  close() {
    this.dialogRef.close('close');
  }
  myModelProperty:Number[]=[];

  getdate(date: any){
    let startdate;

    if(this.data.mentorId.startDate.dayOfMonth<10 && this.data.mentorId.startDate.monthValue<10){
      startdate=this.data.mentorId.startDate.year+"-0"+this.data.mentorId.startDate.monthValue+"-0"+this.data.mentorId.startDate.dayOfMonth
       
      return startdate; 
     }else if(this.data.mentorId.startDate.dayOfMonth<10 && this.data.mentorId.startDate.monthValue>=10){
      startdate=this.data.mentorId.startDate.year+"-"+this.data.mentorId.startDate.monthValue+"-0"+this.data.mentorId.startDate.dayOfMonth
      return startdate; 
       
     }else if(this.data.mentorId.startDate.dayOfMonth>=10 && this.data.mentorId.startDate.monthValue<10){
      startdate=this.data.mentorId.startDate.year+"-0"+this.data.mentorId.startDate.monthValue+"-"+this.data.mentorId.startDate.dayOfMonth
      return startdate; 
      
     }else{
      startdate=this.data.mentorId.startDate.year+"-"+this.data.mentorId.startDate.monthValue+"-"+this.data.mentorId.startDate.dayOfMonth
      return startdate; 
     }
  }

  deleteMentor() {
    console.log('mentor id',this.data.mentorId);
    
    this.mentorService.delete(this.data.mentorId.id,'mentor/').subscribe((response:any) => {
      if ((response as any).status == 200) {
        this.dialogRef.close();
        this.utility.closeLoader();
        this.utility.showToast('SUCCESS', (response as any).message);
        this.ngOnInit();
      }
    }, (err: { error: { statuscode: number; message: string; }; }) => {
      this.utility.closeLoader();
      if (err.error && err.error.statuscode !== 200) {
        this.utility.showToast('ERROR', err.error.message);
        this.utility.closeLoader();
      } else {
        this.utility.showToast('ERROR', 'Please Try Again Later!!');
      }
    });
    this.utility.closeLoader();
  } 
  // deleteMentor() {
    
  //     // return techidvalue;
    
  //   // })
  //   let startdate
  //   // this.mentorForm.value.StartDate=this.datePipe.transform(this.mentorForm.value.StartDate,"yyyy-MM-dd")
  //   if(this.data.mentorId.startDate){
  //     startdate=this.getdate(this.data.mentorId.startDate)
  //   //  startdate=this.datePipe.transform(startdate,"yyyy-MM-dd")
  //   }
     
  //     let data = {
  //     'firstName': this.data.mentorId.firstName,
  //     'lastName':this.data.mentorId.lastName,
  //     'mentorType': this.data.mentorId.mentorType,
  //     'mentorRole': this.data.mentorId.mentorRole,
  //     'mobileNumber': this.data.mentorId.mobileNumber,
  //     'email': this.data.mentorId.email,
  //     'experienceYears': this.data.mentorId.experienceYears,
  //     'preferredTime': this.data.mentorId.preferredTime,
  //     'mentorDescription': this.data.mentorId.mentorDescription,
  //     // 'file': this.profileImage,
  //     // 'techId': techidvalue[0],
  //     'techStacks':this.data.mentorId.techStack,
  //     'supervisorId':this.data.mentorId.supervisorId,
  //     'startDate':startdate,
  //     'status':"Inactive"
  //   }
  //   if(data.techStacks.length>0){

  //   data.techStacks.forEach((element: { id: Number; }) => {
  //     if(element.id)
  //     this.myModelProperty.push(element.id); 
      
  //   });
  // }
  // data.techStacks=this.myModelProperty
  
    // this.mentorService.delete(this.data.mentorId, 'mentor').subscribe(response => {
    //   console.log(response);
    //   if ((response as any).status == 200) {
    //     this.dialogRef.close();
    //     this.utility.closeLoader();
    //     this.utility.showToast('SUCCESS', (response as any).message);
    //   }else{
    //     this.dialogRef.close();
    //   }
    // }, err => {
    //   if (err.error && err.error.statuscode !== 200) {
    //     this.utility.showToast('ERROR', err.error.message);
    //     this.utility.closeLoader();

    //   } else {
    //     this.utility.closeLoader();
    //     this.utility.showToast('ERROR', 'Please Try Again Later!!');
    //   }
    // });//   
  //   let token = localStorage.getItem('token');
  //   this.utility.openLoader();
  //   this.mentorService.updateMentor(data, token, this.data.mentorId.id)
  //     .subscribe(response => {

  //       if ((response as any).status == 200) {
  //         this.dialogRef.close();
  //         this.utility.closeLoader();
  //         this.utility.showToast('SUCCESS', (response as any).message);
  //       }else{
  //         this.utility.showToast('ERROR', (response as any).message);
  //       }
  //     }, err => {
  //       if (err.error && err.error.statuscode == 409) {
  //         this.utility.showToast('ERROR', err.error.message);
  //         this.utility.closeLoader();
  //       } else if (err.error && err.error.statuscode == 400) {
  //         this.utility.showToast('ERROR', err.error.message);
  //         //this.utility.closeLoader();
  //       }
  //      else if (err.error && err.error.status == 119) {
  //       this.utility.showToast('ERROR', err.error.message);

  //     }
  //       else {
  //         this.utility.showToast('ERROR', 'Please try again Later!!!');
  //       }
  //     });

  // //   this.utility.closeLoader();
  //   this.dialogRef.close();

  //   this.utility.closeLoader();
  // }



  // updateMentor() {
  //   this.setImage = true;
  //   const role = this.mentort == 'External' ? this.buttontoggle : this.internalButtontoggle;
  //   let techidvalue=[]
  //   let techId = this.techstackData.forEach(val => {   
      
  //     this.mentorForm.value.tech.forEach(element => {
  //       if (element === val["techName"]) {
  //         // return val;
  //         techidvalue.push(val["id"]);
  //       }
  //     });
  //     return techidvalue;
    
  //   })
  //   techidvalue.join(','); 
  //   this.mentorForm.value.StartDate=this.datePipe.transform(this.mentorForm.value.StartDate,"yyyy-MM-dd")

  //   let data = {
  //     'firstName': this.mentorForm.value.mentorName,
  //     'lastName':this.mentorForm.value.lastName,
  //     'mentorType': this.mentort,
  //     'mentorRole': role,
  //     'mobileNumber': this.mentorForm.value.phnNumber,
  //     'email': this.mentorForm.value.email,
  //     'experienceYears': this.mentorForm.value.exYears,
  //     'preferredTime': this.mentorForm.value.time,
  //     'mentorDescription': this.mentorForm.value.description,
  //     'file': this.profileImage,
  //     'techId': techidvalue[0],
  //     'techStacks':techidvalue,
  //     'supervisorId':this.mentorForm.value.mentorid,
  //     'startDate':this.mentorForm.value.StartDate,
  //     'status':this.mentorForm.value.mentorStatus
  //   }
  //   let token = localStorage.getItem('token');
  //   this.utility.openLoader();
  //   this.mentorService.updateMentor(data, token, this.data.mentor.id)
  //     .subscribe(response => {

  //       if ((response as any).status == 200) {
  //         this.dialogRef.close();
  //         this.utility.closeLoader();
  //         this.utility.showToast('SUCCESS', (response as any).message);
  //       }else{
  //         this.utility.showToast('ERROR', (response as any).message);
  //       }
  //     }, err => {
  //       if (err.error && err.error.statuscode == 409) {
  //         this.utility.showToast('ERROR', err.error.message);
  //         this.utility.closeLoader();
  //       } else if (err.error && err.error.statuscode == 400) {
  //         this.utility.showToast('ERROR', err.error.message);
  //         //this.utility.closeLoader();
  //       }
  //      else if (err.error && err.error.status == 119) {
  //       this.utility.showToast('ERROR', err.error.message);

  //     }
  //       else {
  //         this.utility.showToast('ERROR', 'Please try again Later!!!');
  //       }
  //     });

  //   this.utility.closeLoader();
  // }
  // getMentorData() {
  //   let token = localStorage.getItem('token');

  //   this.mentorService.getAllMentors(token).subscribe(response => {
  //     if ((response as any).status == 200) {
  //       this.mentorDetails = (response as any).data;
  //       this.mentorCount = (response as any).data.length;
  //       if (this.mentorCount > 0) {
  //         this.noinfodiv = true
  //       } else {
  //         this.noinfodiv = false;
  //       }
  //       console.log(this.mentorDetails)
  //       this.utility.closeLoader();
  //     }
  //   }, err => {
  //     this.noinfodiv = false;
  //     console.log(err)
  //     this.utility.closeLoader();
  //     if (err.error && err.error.statuscode !== 200) {
  //       this.utility.showToast('ERROR', err.error.message);
  //     } else if (err.error && err.error.statuscode == 400) {
  //       this.utility.showToast('ERROR', err.error.message);
  //     }
  //     else {
  //       this.utility.showToast('ERROR', 'Please Try Again Later!!');
  //     }
  //   });

  //   // this.utility.closeLoader();

  // }
}
