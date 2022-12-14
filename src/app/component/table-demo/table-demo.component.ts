import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CandidateData } from 'src/app/model/CandidadteData.model';
import { BatchService } from 'src/app/service/batch.service';
import { DataService } from 'src/app/service/dataservice.service';

@Component({
  selector: 'app-table-demo',
  templateUrl: './table-demo.component.html',
  styleUrls: ['./table-demo.component.scss'],
})
export class TableDemoComponent implements OnInit {
  displayedColumns: string[] = ['EJET-ID', 'Name', 'Phone Number', 'Email','Status','Stage'];
  dataSource!: MatTableDataSource<CandidateData>;
  searchData!: any;
  showListData:boolean = false;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor( public dataService: DataService,private batchService: BatchService) {
    this.batchService.getLearnerDetails().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      console.log('this.dataSource :::::: ', this.dataSource);
    });
}
  ngOnInit(): void {
    this.dataService.searchMessage.subscribe((text: any) => {
      this.dataSource.filter = text.trim().toLowerCase();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}