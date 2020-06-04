import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() totalSize: number;
  @Input() currentPage: number;
  @Input() pageSize: number;
  @Output() changePage = new EventEmitter();
  lastPage: number;

  constructor() { }

  ngOnInit(): void {
    this.lastPage = Math.ceil(this.totalSize / this.pageSize);
  }

  ngOnChanges() {
    this.lastPage = Math.ceil(this.totalSize / this.pageSize);
  }

  updatePage(newPage) {
    this.currentPage = newPage;
    this.changePage.emit({ 'page': newPage });

  }

}
