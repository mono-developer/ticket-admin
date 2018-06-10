import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { json } from 'd3';
import { DeleteDialogComponent } from '../../delete-dialog/delete-dialog.component';
import { BaseService } from "../../../../provide/base-service";
import { DataService } from "../../../../provide/data-service";

@Component({
  selector: 'ms-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.scss']
})
export class ViewCategoryComponent implements OnInit {
  page_title: string = 'Event Categories';
  url: string;
  token: string;
  categoryList: any;
  displayedColumns = ['category', 'state', 'symbol'];
  dataSource: any;
  isLoading: boolean = false;

  constructor(
    public router: Router,
    public dialog: MatDialog,
    public baseService: BaseService,
    public dataService: DataService
  ) { }

  ngOnInit() {
    this.url = this.baseService.categoryURL;
    this.token = sessionStorage.getItem('token');
    this.getCategoryList();
  }

  addCategory() {
    this.router.navigate(['dashboard/event-categories/add-category']);
  }

  getCategoryList() {
    this.isLoading = true;
    this.dataService.getNoTokenData(this.url)
      .subscribe(
        (data) => {
          this.isLoading = false;
          this.categoryList = data;
          this.dataSource = new MatTableDataSource(this.categoryList);
          return true;
        },
        err => {
          this.isLoading = false;
          return true;
        });
  }

  edit(item: any) {
    this.router.navigate(['dashboard/event-categories/add-category', { item: item._id }]);
  }

  delete(item) {
    let dialogRef1 = this.dialog.open(DeleteDialogComponent, {
      width: '350px',
      data: { alert: `
      If you delete this item, it will delete all Events that are connected with this Category.
      Do you want to delete this Category? ` }
    });
    dialogRef1.afterClosed().subscribe(result => {
      result ? this.deleteCategory(item._id) : '';
    });
  }

  deleteCategory(id) {
    this.isLoading = true;
    this.dataService.deleteData(this.url, id, this.token)
      .subscribe(
        (data) => {
          this.getCategoryList();
          return true;
        },
        error => {
          this.isLoading = false;
          return true;
        }
      )
  }

}
