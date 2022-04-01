import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface UsersData {
  name: string;
  subject: string;
  emailTemplate: string;
  id: number;
}

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent implements OnInit{

  action: string;
  LOCAL_DATA: any;

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: UsersData) {
    this.LOCAL_DATA = {...data};
    this.action = this.LOCAL_DATA.action;
  }

  ngOnInit(): void{
    this.dialogRef.disableClose = true;
  }

  doAction(): void{
    this.dialogRef.close({event: this.action, data: this.LOCAL_DATA});
  }

  closeDialog(): void{
     this.dialogRef.close();
  }
}
