import { Component, OnInit } from '@angular/core';
import { ConfigserviceService } from 'src/app/service/configservice.service';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  data4:any[] = [
    "Recruitment",
    "Assignment",
    "Doc Verify",
    "Requirement",
    "Join Date",
    "Remark",
    "Maker Program Approver"
];
  constructor(private configService:ConfigserviceService,public dialogRef: MatDialogRef<SettingComponent>) { }

  FirstName= new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]*'), Validators.minLength(3)]);
  LastName= new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]*'), Validators.minLength(3)]);
  PhoneNumber= new FormControl('',[Validators.required,Validators.pattern('(0/91)?[7-9][0-9]{9}'),Validators.minLength(10)]);
  // tslint:disable-next-line: max-line-length
  Email=new FormControl('',[Validators.required,Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'),Validators.minLength(10)]);
  
  ngOnInit() {
  }

  selectable: boolean = true;


  selectedOffers: any[] = [];

  isSelected(data4: any): boolean {
    const index = this.selectedOffers.indexOf(data4);
    return index >= 0;
  }
  toggleOffer(data4: any): void {
    let index = this.selectedOffers.indexOf(data4);

    if (index >= 0) {
      this.selectedOffers.splice(index, 1);
    } else {
      this.selectedOffers.push(data4);
    }
  }

  closeSettings():void{
    console.log("Settings dialog closed");
    
    this.dialogRef.close();

  }
}
