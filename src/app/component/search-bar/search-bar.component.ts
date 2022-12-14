import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  // showsearchbarinlearnercomponents: boolean = false;
  // onlearners: boolean = true;

  constructor() { }

  ngOnInit() {
  }
  applyFilter(event: any) {
    let name = event.target.value;
    console.log("From search -> "+name);
  }
}
