// import { Injectable } from '@angular/core';
// import * as FileSaver from 'file-saver';
// import * as XLSX from 'xlsx';
// import { CandidateData } from '../model/CandidadteData.model';
// const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
// const EXCEL_EXTENSION = '.xlsx';
// @Injectable()
// export class ExcelService {
//   arrayBuffer: any;
//   file!: any;
//   excelFileData: any;
//   fileName!: string;

//   constructor() { }

//   public exportAsExcelFile(json: any[], excelFileName: string): void {
//     const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
//     const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
//     const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
//     this.saveAsExcelFile(excelBuffer, excelFileName);
//   }

//   private saveAsExcelFile(buffer: any, fileName: string): void {
//     const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
//     FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
//   }

//   excelUploadedData: any[] = [];

//   //empty field validation
//   emptyField(element: CandidateData): boolean {
//     // console.log(element);
//     for (let key in element) {
//       if (element[key] == undefined) {
//         return true;
//       }
//     }
//   }

//   //mobile field validation
//   mobileField(element: CandidateData): boolean {
//     // let lenght = element.mobileNumd.toString().length;
//     // if (element.mobileNumd.toString().length > 10 || element.mobileNumd.toString().length < 6) {
//     //   console.log(element.mobileNumd.toString());
//     // }
//     if (element.mobileNum.toString().length > 10 || element.mobileNum.toString().length < 6) {
//       return true;
//     }
//   }

//   //email field validation
//   emailField(element: CandidateData): boolean {
//     if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
//       .test(element.email))) {
//       return true;
//     }
//   }

//   //agg field validation
//   aggField(element: CandidateData): boolean {

//     if (element.aggrPer > 100 || element.aggrPer < 0) {
//       return true;
//     }
//   }

//   incomingfile(event: { target: { files: { name: string; }[]; }; }):any {
//     console.log('size', event.target.files[0].size);
//     console.log('size', event.target.files[0]);

//     //   var file = document.querySelector("#fUpload");
//       // if ( /\.(xlsx?g|xls|xlsm)$/i.test(event.target.files[0].name) === false ) { alert("not an image!"); }
//      console.log(/\.(xlsx|xls|xlsm)$/i.test(event.target.files[0].name));
     
   
//       if ( /\.(xlsx|xls|xlsm)$/i.test(event.target.files[0].name) === false ) 
//       {
//         return 0;
//       }else if(event.target.files[0].size>1000000){
//         return 1; // file size validation
//       }else{
//         this.file = event.target.files[0];
//         this.fileName = event.target.files[0].name;
//         return 2;
//       }


//     // console.log(event.target.files[0].name);

//     //validating file size
//     // console.log(event);
//     // console.log('type', event.target.files[0].type);
    
//     // console.log('size', this.file.size);
//     // console.log('type', this.file.type);
//   }

//   Upload(): any {
//     let fileReader = new FileReader();
//     fileReader.readAsArrayBuffer(this.file);

//     fileReader.onload = (e) => {
//       this.arrayBuffer = fileReader.result;
//       var data = new Uint8Array(this.arrayBuffer);
//       var arr = new Array();
//       for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
//       var bstr = arr.join("");
//       var workbook = XLSX.read(bstr, { type: "binary" });
//       var first_sheet_name = workbook.SheetNames[0];
//       var worksheet = workbook.Sheets[first_sheet_name];
//       // console.log(XLSX.utils.sheet_to_json(worksheet, { raw: true }));
//       // excelFileData = XLSX.utils.sheet_to_json(worksheet, { raw: true });
//       // console.log(XLSX.utils.sheet_to_json(worksheet, { raw: true }));
//       this.excelFileData = XLSX.utils.sheet_to_json(worksheet, { raw: true });
//       console.log('exceldata', this.excelFileData);
//     }

//     // setTimeout(() => {
//     // console.log ('print me only after all iterations');
//     // return excelFileData;
//     // resolve();
//     // }, 5000);
//   }
// }