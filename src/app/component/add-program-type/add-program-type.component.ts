import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MentorService } from 'src/app/service/mentor.service';
import { UtilityService } from 'src/app/service/utility.service';

@Component({
  selector: 'app-add-program-type',
  templateUrl: './add-program-type.component.html',
  styleUrls: ['./add-program-type.component.scss']
})
export class AddProgramTypeComponent implements OnInit {
  programTypeForm: FormGroup;
  operation: string = "add";
  constructor(private dialogRef: MatDialogRef<AddProgramTypeComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    private mentorService: MentorService, private formBuilder: FormBuilder, private utility: UtilityService) {

    // this.utility.openLoader();
    this.programTypeForm = this.formBuilder.group({
      name: ["", [Validators.required, Validators.pattern('[a-zA-Z .-/\]*'), Validators.minLength(3)]],
      acronym: ["", [Validators.required]],
      description: ["", [Validators.required]]
    });
    if (data !== null) {
      this.operation = data.operation;
      this.programTypeForm.patchValue({
        name: data.data.name,
        acronym: data.data.acronym,
        description: data.data.description
      });

    }
  }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close('close');
  }
  getErrorForName() {
    return this.programTypeForm.get('name')?.hasError('required') ? 'Program Name Cannot be blank' :
      this.programTypeForm.get('name')?.hasError('minlength') ? 'Minimun 3 digit required' :
        this.programTypeForm.get('name')?.hasError('pattern') ? "Enter valid name" :
          '';
  }
  getErrorForAcronym() {
    return this.programTypeForm.get('acronym')?.hasError('required') ? 'Acronym Cannot be blank' :
      '';
  }
  getErrorForDescription() {
    return this.programTypeForm.get('description')?.hasError('required') ? 'Description Cannot be blank' :
      '';
  }
  addProgramType() {
    
    if (this.programTypeForm.invalid) {
      this.utility.markFormGroupTouched(this.programTypeForm);
    } else {
      let body = {
        name: this.programTypeForm.value.name,
        acronym: this.programTypeForm.value.acronym,
        description: this.programTypeForm.value.description
      }
      // let token = localStorage.getItem('token');
      this.mentorService.addProgramType(body)
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
  }
  updateProgramType() {
    let body = {
      name: this.programTypeForm.value.name,
      acronym: this.programTypeForm.value.acronym,
      description: this.programTypeForm.value.description
    }
    let token = localStorage.getItem('token');
    this.mentorService.updateProgramType(body, this.data.data.id, token)
      .subscribe((response: any) => {
        if ((response as any).status == 200) {
          this.dialogRef.close();
          this.utility.closeLoader();
          this.utility.showToast('SUCCESS', (response as any).message);
        }
      }, (err: { error: { statuscode: number; message: string; }; }) => {
        this.utility.closeLoader();
        if (err.error && err.error.statuscode !== 200) {
          this.utility.showToast('ERROR', err.error.message);
        } else {
          this.utility.showToast('ERROR', 'Please Try Again Later!!');
        }
      });
  }
}
