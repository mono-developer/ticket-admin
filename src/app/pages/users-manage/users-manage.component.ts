import { Component, OnInit, Inject } from '@angular/core';
import { MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Router, ActivatedRoute } from "@angular/router";

import { BaseService } from "./../../../provide/base-service";
import { DataService } from "./../../../provide/data-service";

@Component({
  selector: 'ms-users-manage',
  templateUrl: './users-manage.component.html',
  styleUrls: ['./users-manage.component.scss']
})
export class UsersManageComponent implements OnInit {

  page_title: string = 'Management of sales teams';

  url: string;
  token: string;
  isLoading: boolean = false;
  userList: any;

  displayedColumns = ['first_name', 'email', 'status', 'symbol'];
  dataSource: any;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    public baseService: BaseService,
    public dataService: DataService
  ) {

  }

  ngOnInit() {
    this.url = this.baseService.userURL;
    this.token = sessionStorage.getItem('token');
    this.getUsersList();
  }

  getUsersList() {
    this.isLoading = true;
    this.dataService.getData(this.url, this.token)
      .subscribe(
        (data) => {
          this.isLoading = false;
          console.log('userList', data);
          this.userList = data;
          this.dataSource = new MatTableDataSource(this.userList);
          return true;
        },
        err => {
          this.isLoading = false;
          console.log('errorData', err);
          return true;
        });
  }

  deleteUser(id) {
    this.isLoading = true;
    this.dataService.deleteData(this.url, id, this.token)
      .subscribe(
        (data) => {
          this.isLoading = false;
          console.log('userData', data);
          this.getUsersList();
          return true;
        },
        error => {
          this.isLoading = false;
          console.log('errorData', error);
          return true;
        }
      )
  }

  openDialog(data): void {
    let dialogRef = this.dialog.open(UserAccessDialogComponent, {
      width: '400px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined){
        console.log(result);
        let accessData = {
          status: result.status
        }
        this.changeUserAccess(result._id, accessData )
      }
    });
  }

  changeUserAccess(id, data ) {
    this.isLoading = true;
    this.dataService.patchData(this.url, id, this.token, data)
      .subscribe(
        (data) => {
          this.isLoading = false;
          console.log('UserData', data);
          this.getUsersList();
          return true;
        },
        error => {
          this.isLoading = false;
          console.log('errorData', error);
          return true;
        });
  }

}

@Component({
  selector: 'user-access-dialog',
  templateUrl: 'user-access-dialog.html',
  styleUrls: ['./users-manage.component.scss'],
})
export class UserAccessDialogComponent {

  stateList: any;
  constructor(
    public dialogRef: MatDialogRef<UserAccessDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      console.log(this.data);
      this.stateList = [
        { id: 0, name: 'Active', status: true },
        { id: 1, name: 'Inactive' ,status: false }
      ];
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
