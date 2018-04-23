import { Component, OnInit, Inject } from '@angular/core';
import { MatTableDataSource, MatSnackBar, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseService } from "../../../provide/base-service";
import { DataService } from "../../../provide/data-service";
import { ImageSize } from "../../../provide/image-size";
import { UploadFileService } from '../../../provide/upload-file.service';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'ms-banner-images',
  templateUrl: './banner-images.component.html',
  styleUrls: ['./banner-images.component.scss']
})
export class BannerImagesComponent implements OnInit {

  page_title: string = 'Background & Banner';
  isLoading: boolean = false;
  url1: string;
  url2: string;
  token: string;
  bgData: any = {url:'', _id: ''};
  bannerList: any;
  displayedColumns = ['title', 'image', 'button'];
  dataSource : any;
  constructor(
    public dialog: MatDialog,
    public baseService: BaseService,
    public dataService: DataService,
    public router: Router,
    public route: ActivatedRoute,
  ) {

   }

  ngOnInit() {
    this.token = sessionStorage.getItem('token');

    this.getBannerList();
  }

  getBgData() {
    this.isLoading = true;
    let url = this.baseService.bgroundURL;
    this.dataService.getNoTokenData(url)
      .subscribe(
        (data) => {
          this.isLoading = false;
          console.log('bgData', data);
          this.bgData = data;
          return true;
        },
        err => {
          this.isLoading = false;
          console.log('errorData', err);
          return true;
        });
  }

  getBannerList() {
    this.isLoading = true;
    let url = this.baseService.bannerURL;
    this.dataService.getNoTokenData(url)
      .subscribe(
        (data) => {
          this.isLoading = false;
          console.log('bannerData', data);
          this.bgData = data;
          this.getBgData();
          this.dataSource = new MatTableDataSource(this.bgData);
          return true;
        },
        err => {
          this.isLoading = false;
          console.log('errorData', err);
          return true;
        });
  }


  bannerDialog(): void {
    let dialogRef1 = this.dialog.open(AddBannerComponent, {
      width: '400px',
      data: { title: '', url: '' }
    });
    dialogRef1.afterClosed().subscribe(result => {
      if (result) {
        this.addBanner(result);
      }
    });
  }

  editBgDialog(item): void {
    let dialogRef1 = this.dialog.open(AddBannerComponent, {
      width: '400px',
      data: item
    });
    dialogRef1.afterClosed().subscribe(result => {
      if (result) {
        this.editBg(result);
      }
    });
  }

  editBannerDialog(item): void {
    let dialogRef1 = this.dialog.open(AddBannerComponent, {
      width: '400px',
      data: item
    });
    dialogRef1.afterClosed().subscribe(result => {
      if (result) {
        this.editBanner(result);
      }
    });
  }

  viewImage(url) {
    let dialogRef = this.dialog.open(ViewBannerComponent, {
      width: '400px',
      data: url
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  addBanner(item) {
    this.isLoading = true;
    let url = this.baseService.bannerURL
    this.dataService.postData(url, this.token, item)
      .subscribe(
        (data) => {
          this.getBannerList();
          return true;
        },
        error => {
          this.isLoading = false;
          console.log('errorData', error);
          return true;
        });
  }

  editBg(item) {
    let url = this.baseService.bgroundURL;
    this.isLoading = true;
    this.dataService.patchData(url, item._id, this.token, item)
      .subscribe(
        (data) => {
          this.isLoading = false;
          this.getBgData();
          return true;
        },
        error => {
          this.isLoading = false;
          console.log('errorData', error);
          return true;
        });
  }

  editBanner(item) {
    let url = this.baseService.bannerURL;
    this.isLoading = true;
    this.dataService.patchData(url, item._id, this.token, item)
      .subscribe(
        (data) => {
          this.isLoading = false;
          this.getBannerList();
          return true;
        },
        error => {
          this.isLoading = false;
          console.log('errorData', error);
          return true;
        });
  }

  delete(item) {
    let dialogRef1 = this.dialog.open(DeleteDialogComponent, {
      width: '350px',
      data: { alert: 'Do you want to delete this Banner Image?' }
    });
    dialogRef1.afterClosed().subscribe(result => {
      result ? this.deleteBanner(item._id) : '';
    });
  }

  deleteBanner(id) {
    this.isLoading = true;
    let url = this.baseService.bannerURL
    this.dataService.deleteData(url, id, this.token)
      .subscribe(
        (data) => {
          console.log('bannerList', data);
          this.getBannerList();
          return true;
        },
        error => {
          this.isLoading = false;
          console.log('errorData', error);
          return true;
        }
      )
  }


}

// View Banner Dialog
@Component({
  selector: 'view-banner',
  templateUrl: './view-banner.component.html'
})
export class ViewBannerComponent {
  constructor(
    public dialogRef: MatDialogRef<ViewBannerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(data);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}

// Add/Edit Banner Dialog
@Component({
  selector: 'add-banner',
  templateUrl: './add-banner.component.html',
  styleUrls: ['./banner-images.component.scss'],
})
export class AddBannerComponent {

  isLoading = false;
  constructor(
    public imageSize: ImageSize,
    private uploadService: UploadFileService,
    public snackBar: MatSnackBar,
    public dialogRef1: MatDialogRef<AddBannerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      console.log(data);
  }

  setImage(event: any) {

    const file = event.target.files[0];
    this.imageSize.sizeImage(file, (size) => {
      if (size.width == 800 && size.height == 533) {
        this.uploadImage(file, (image) => {
          this.data.url= image;
        })
      } else {
        this.openSnackBar();
      }
    });
  }
  uploadImage(file, callback) {
    this.isLoading = true;
    this.uploadService.uploadfile(file).subscribe((data: any) => {
      this.isLoading = false;
      let imageURL = data.Location;
      callback(imageURL);
    }, (err) => {
      this.isLoading = false;
      console.log("errror", err);
    });
  }

  openSnackBar() {
    this.snackBar.open('Image Size must be 100px' , 'ok', {
      duration: 2000,
    });
  }

  onNoClick(): void {
    this.dialogRef1.close();
  }
}
