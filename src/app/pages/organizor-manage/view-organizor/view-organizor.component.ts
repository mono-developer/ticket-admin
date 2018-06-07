import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Router } from '@angular/router';
import { json } from 'd3';
import { BaseService } from "../../../../provide/base-service";
import { DataService } from "../../../../provide/data-service";
import { DeleteDialogComponent } from '../../delete-dialog/delete-dialog.component';

@Component({
  selector: 'ms-view-organizor',
  templateUrl: './view-organizor.component.html',
  styleUrls: ['./view-organizor.component.scss']
})
export class ViewOrganizorComponent implements OnInit {

  page_title: string = 'View Organizor';
  url: string;
  token: string;
  orgList: Element[];
  displayedColumns = ['name', 'email', 'phone', 'address', 'state', 'symbol'];
  dataSource: any;
  isLoading: boolean;

  constructor(
    public router: Router,
    public dialog: MatDialog,
    public baseService: BaseService,
    public dataService: DataService
  ) {
   }

  ngOnInit() {
  this.url = this.baseService.userURL;
  this.token = sessionStorage.getItem('token');
  this.getOrgList();
  }

  getOrgList(){
    this.isLoading = true;
    this.dataService.getData(this.url, this.token)
      .subscribe(
        (data) => {
          this.isLoading = false;
          this.orgList = data.filter((item: any) =>
            item.access === '1'
          );
          this.dataSource = new MatTableDataSource(this.orgList);
          return true;
        },
        err => {
          this.isLoading = false;
          return true;
        });
  }

  edit(item: any) {
    this.router.navigate(['dashboard/organizor-manage/add-organizor', { item: item._id }]);
  }

  delete(item) {
    let dialogRef1 = this.dialog.open(DeleteDialogComponent, {
      width: '350px',
      data: {
        alert: `
                If you delete this item, it will delete all Events that are connected with this Organizer.
                Do you want to delete this Organizer from list? `
              }
    });
    dialogRef1.afterClosed().subscribe(result => {
      result ? this.deleteOrg(item._id) : '';
    });
  }

  deleteOrg(id) {
    this.isLoading = true;
    this.dataService.deleteData(this.url, id, this.token)
      .subscribe(
        (data) => {
          this.getOrgList();
          return true;
        },
        error => {
          this.isLoading = false;
          return true;
        });
  }

}

