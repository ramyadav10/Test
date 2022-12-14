import { Component, Inject, OnInit } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-unassignconfirm',
  templateUrl: './unassignconfirm.component.html',
  styleUrls: ['./unassignconfirm.component.scss']
})
export class UnassignconfirmComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<UnassignconfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 


    }

  ngOnInit() {
  }

  Yes(){
    let data={
      status:'yes',
      id:this.data.id
    }
    this.dialogRef.close(data);
    
  }

  No(){
    let data={
      status:'no',
      id:this.data
    }
    this.dialogRef.close(data);

  }
}
