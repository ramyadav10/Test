// import { Component, OnInit } from '@angular/core';
// import { MatDialog } from '@angular/material/dialog';
// import { UtilityService } from 'src/app/service/utility.service';
// import { ListContainer } from 'src/app/model/ListContainer.model';
// import { ChartType } from 'chart.js';

// import { Label, Color } from 'ng2-charts';
// import { ChartOptions, ChartDataset } from 'chart.js';
// import { BatchService } from 'src/app/service/batch.service';
// import { HiringService } from 'src/app/service/hiring.service';



// @Component({
//   selector: 'app-dashboard',
//   templateUrl: './dashboard.component.html',
//   styleUrls: ['./dashboard.component.scss']
// })
// export class DashboardComponent implements OnInit {
//   barChartLabels: any[] | undefined;
//   ngOnInit(): void {
//     throw new Error('Method not implemented.');
//   }
// //   public barChartLabels: Label[] = [];
//   public barChartType: ChartType = 'bar';
//   public barChartLegend = true;
//   public barChartPlugins = [];
//   public barChartColors: Color[] = [
//     { backgroundColor: '#90A2AD' },
//     { backgroundColor: '#A1D9FC' },
//   ]



// // //   // Doughnut
// // //   // Doughnut



//   public doughnutChartLabels!: Label[];
//   public doughnutChartData:any = [];
//   public doughnutChartType: ChartType = 'doughnut';
//   public doughnutChartColors: Color[] = [
//     { backgroundColor: ["#98F1B6", "#84DEE8", "#C9A5FC", "#F4A5CD", '#F5888A', '#FCE98E'] },

//   ];

//   assignCount!: number;
//   holdCount!: number;
//   unassignedCount!: number;
//   selectedTab: string = 'NEW';
//   searchTab: string = 'UNASSIGN';
//   selectedForCFPCount!: number;
//   movedToCFPCount!: number;
//   completedCount!: number;
//   delayedCount!: number;
//   movedToBRP!: number;
//   CountArray :any= []
//   CFP: any
//   RFP: any

//   BatchTypeTotal = 0
//   PracticeHeadWise:any = []
//   totalHeadWise = 0
//   ProgramTypeWise:any = []
//   totalTypeWise = 0
//   arr = []
//   TotalbyLearnersWise = 0
//   lengthOfArray!: boolean;
//   batches = new ListContainer(35);

//   listOfbatches: any;
//   notSelectedForCFPCount: any;
//   tablehead!: any[];
//   constructor(public dialog: MatDialog, private hiringService: HiringService, private batchService: BatchService, public openDialog: MatDialog, private utility: UtilityService) {
//     this.utility.openLoader();
//   }

//   // ngOnInit() {
//   //   this.getCandidateCount()
//   //   this.getCountByProgram()
//   // }


//   public colors = [
//     { color: '#A5F8EA' },
//     // { color: '#F8CFE7' },
//     { color: '#D7AEFB' },
//     { color: '#98FB98' },
//     // { color: '#AECBFA' },98FB98

//     { color: '#F28B82' },

//     { color: '#FBBD33' },

//     { color: '#FEF175' },
//     { color: '#A5F8EA' },
//     // { color: '#F8CFE7' },
//     { color: '#D7AEFB' },
//     { color: '#98FB98' },
//     // { color: '#AECBFA' },98FB98

//     { color: '#F28B82' },

//     { color: '#FBBD33' },

//     { color: '#FEF175' },
//     { color: '#A5F8EA' },
//     // { color: '#F8CFE7' },
//     { color: '#D7AEFB' },
//     { color: '#98FB98' },
//     // { color: '#AECBFA' },98FB98

//     { color: '#F28B82' },

//     { color: '#FBBD33' },

//     { color: '#FEF175' },
//     { color: '#A5F8EA' },
//     // { color: '#F8CFE7' },
//     { color: '#D7AEFB' },
//     { color: '#98FB98' },
//     // { color: '#AECBFA' },98FB98

//     { color: '#F28B82' },

//     { color: '#FBBD33' },

//     { color: '#FEF175' },
//     { color: '#A5F8EA' },
//     // { color: '#F8CFE7' },
//     { color: '#D7AEFB' },
//     { color: '#98FB98' },
//     // { color: '#AECBFA' },98FB98

//     { color: '#F28B82' },

//     { color: '#FBBD33' },

//     { color: '#FEF175' },
//     { color: '#A5F8EA' },
//     // { color: '#F8CFE7' },
//     { color: '#D7AEFB' },
//     { color: '#98FB98' },
//     // { color: '#AECBFA' },98FB98

//     { color: '#F28B82' },

//     { color: '#FBBD33' },

//     { color: '#FEF175' },
//     { color: '#A5F8EA' },
//     // { color: '#F8CFE7' },
//     { color: '#D7AEFB' },
//     { color: '#98FB98' },
//     // { color: '#AECBFA' },98FB98

//     { color: '#F28B82' },

//     { color: '#FBBD33' },

//     { color: '#FEF175' },




//   ]



//   public barChartData: ChartDataset[] = [
//     { data: [], label: 'RFP Prac Head', pointStyle: 'rect' },
//     { data: [], label: 'RFP + CFP', pointStyle: 'rect' }
//   ];

//   getCountByProgram() {

//     this.hiringService.getCandidateCountByProgram().subscribe((res: any) => {
//       this.PracticeHeadWise = res.data.leadWiseCount
//       this.ProgramTypeWise = res.data.programTypeCount
// console.log(this.PracticeHeadWise);


//       let barchartLable = []
//       let bardata1 = []
//       let bardata2 = []

//       for (let i = 0; i < this.PracticeHeadWise.length; i++) {
//         for (let index = 0; index < this.PracticeHeadWise[i].programType.length; index++) {
//           if (this.PracticeHeadWise[i].programType[index].acronym == 'RFP') {
//             bardata1.push(this.PracticeHeadWise[i].programType[index].count)
//           } else if (this.PracticeHeadWise[i].programType[index].acronym == 'CFP' || this.PracticeHeadWise[i].programType[index].acronym == 'RFP') {
//             let counter = this.PracticeHeadWise[i].programType[1].count + this.PracticeHeadWise[i].programType[0].count;
//             bardata2.push(counter)
//           }
//         }


//         this.totalHeadWise = this.totalHeadWise + this.PracticeHeadWise[i].count
//         let sp = this.PracticeHeadWise[i].name.split(' ')[0]
//         barchartLable.push(sp)

//         for (let j = 0; j < this.PracticeHeadWise.length; j++) {
//           const element = this.colors[j];
//           this.PracticeHeadWise[i].total = this.PracticeHeadWise[i].programType[2].count + this.PracticeHeadWise[i].programType[3].count + this.PracticeHeadWise[i].programType[4].count


//         }

//       }


//       for (let index = 0; index < this.barChartData.length; index++) {

//         this.barChartData[index].data = bardata1

//       }
//       this.barChartData[0].data = bardata1
//       this.barChartData[1].data = bardata2
//       this.barChartLabels = barchartLable
//       let donutlabel = [];
//       let donutCount = []
//       for (let i = 0; i < this.ProgramTypeWise.length; i++) {
//         this.totalTypeWise = this.totalTypeWise + this.ProgramTypeWise[i].count
//         if (this.ProgramTypeWise[i].acronym == 'CFP') {
//           this.CFP = this.ProgramTypeWise[i].count
//         } else if (this.ProgramTypeWise[i].acronym == 'RFP') {
//           this.RFP = this.ProgramTypeWise[i].count
//         }
//         donutlabel.push(this.ProgramTypeWise[i].acronym)
//         donutCount.push(this.ProgramTypeWise[i].count)
//         for (let j = 0; j < this.ProgramTypeWise.length; j++) {
//           this.ProgramTypeWise[i].color = this.colors[i].color
//         }

//       }


//       this.doughnutChartLabels = donutlabel
//       this.doughnutChartData = donutCount

//       this.tablehead=donutlabel


//     })
//   }
//   getCandidateCount() {
//     let token = localStorage.getItem('token');
//     this.batchService.getCandidatesStatusCount(token).subscribe((response: { data: { assignCount: number; unassignedCount: number; movedToBRP: number; selectedForCFP: number; movedToCFP: number; delayedCount: number; holdCount: number; notSelectedCount: any; completedCount: number; }; }) => {

//       if ((response as any).status == 200) {
//         this.assignCount = response.data.assignCount;
//         this.unassignedCount = response.data.unassignedCount;
//         this.movedToBRP = response.data.movedToBRP;
//         this.selectedForCFPCount = response.data.selectedForCFP;
//         this.movedToCFPCount = response.data.movedToCFP;
//         this.delayedCount = response.data.delayedCount;
//         this.holdCount = response.data.holdCount;
//         this.notSelectedForCFPCount = response.data.notSelectedCount;

//         this.completedCount = response.data.completedCount;

//         this.TotalbyLearnersWise = this.notSelectedForCFPCount + this.completedCount + this.holdCount + this.delayedCount + this.movedToCFPCount + this.selectedForCFPCount + this.movedToBRP + this.unassignedCount + this.assignCount


//         let ab = [

//           { count: this.assignCount, label: 'Assigned', color: '#A5F8EA' },
//           { count: this.unassignedCount, label: 'UnAssigned', color: '#D7AEFB' },
//           { count: this.movedToBRP, label: 'Moved to BRP', color: '#98FB98' },
//           { count: this.selectedForCFPCount, label: 'Selected For CFP', color: '#F28B82' },
//           { count: this.notSelectedForCFPCount, label: '  Not Selected For CFP', color: '#FBBD33' },

//           { count: this.movedToCFPCount, label: 'Moved To CFP', color: '#FEF175' },
//           { count: this.delayedCount, label: 'Delayed', color: '#A5F8EA' },
//           { count: this.holdCount, label: 'Dropped', color: '#D7AEFB		' },
//           { count: this.completedCount, label: 'Completed', color: '#98FB98 ' }

//         ]

//         this.CountArray = ab

//       }
//       this.utility.closeLoader();

//     }, (error: { error: { message: string; status: any; }; }) => {
//       this.utility.closeLoader();
//       this.utility.errorHandler(error);
//     });
//   }




//   // public barChartOptions: ChartOptions = {
//   //   responsive: true,


//   //   maintainAspectRatio: true,
//   //   legend: {
//   //     // position: "top",
//   //     // align :"end",
   
//   //     align: "start",
//   //     position: 'right',
//   //     labels: {
//   //       fontSize: 12,
//   //       usePointStyle: false,
//   //       boxWidth: 10,
//   //       fontColor: '#000',
//   //       fontStyle:'300',
//   //       // font-weight: 600;
//   //       // font-size: 16px;
//   //       // color: #002447;
//   //       // opacity: 100%;


//   //       // labelFontSize: 20
//   //       // pointStyle: 'line'

//   //     }
//   //   },
//   //   // tooltips :{
//   //   //   backgroundColor:'black',
//   //   //   callbacks:{
//   //   //     labelTextColor: function(tooltipItem, chart) { 
//   //   //        return "white";     
//   //   //     },
       
//   //   //   }
//   //   // },
//   //   scales: {
//   //     xAxes: [{
//   //       // fontSize: 20,
//   //       ticks: {
//   //         fontSize: 14,
//   //         fontColor: 'black',
//   //         fontFamily: '"Lato", serif',
//   //         // fontSize: 40,
//   //       },
//   //       display: true,
//   //       gridLines: {
//   //         drawBorder: true,
//   //         lineWidth: 0,
//   //       }
//   //     }],
//   //     yAxes: [{
//   //       ticks: { min: 0, max: 100,
//   //         fontSize: 12,
//   //         fontColor: 'black',
//   //         fontFamily: '"Lato", serif',
//   //         // display:false
//   //        },
//   //       display: true,
//   //       scaleLabel: {
//   //         display: false,
//   //         labelString: "Number of Reads",
//   //       },
//   //       gridLines: {
//   //         drawBorder: true,
//   //         lineWidth: 0
//   //       }
//   //     }]
//   //   }
//   // };

//   // doghnutchartOptions = {
//   //   legend: {
//   //     position: 'right',
//   //     boxWidth: 10,
//   //     labels: {
//   //       fontSize: 12,
//   //       usePointStyle: false,
//   //       fontFamily: "Lato",
//   //       boxWidth: 10,
//   //       fontColor: '#000',
//   //       // boxWidth: 10,
//   //       fontStyle:'300',
//   //       // FocusEvent:true

//   //       // boxHeight: 2
//   //     }
//   //   },
//   //   pieceLabel: {
//   //     render: 'value',
//   //     overlap: true,
//   //     // FocusEvent:true
//   //     fontFamily: "Lato",
//   //     // boxWidth: 10,
//   //     fontColor: '#000',
//   //     fontStyle:'300',

//   //   }
//   // }


// }
