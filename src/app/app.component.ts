import { Component, ViewChild } from '@angular/core';

import { MatTable, MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { element } from 'protractor';

export interface UsersData {
  name: string;
  id: number;
  emailTemplate: string;
  subject: string;
}

const ELEMENT_DATA: UsersData[] = [
  { id: 1, name: 'feedback.ftl', subject: 'test6', emailTemplate: 'emails@mail.com' },
  { id: 2, name: 'taskCreated.flt', subject: 'test1', emailTemplate: 'qeti@mail.com' },
  { id: 3, name: 'process-automation.ftl', subject: 'test2', emailTemplate: 'qeti@mail.com' },
  { id: 4, name: 'task-created-signup.ftl', subject: 'test3', emailTemplate: 'something@mail.com' }
];
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  displayedColumns: string[] = ['name', 'action'];
  dataSource = ELEMENT_DATA;

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  constructor(public dialog: MatDialog) { }

  openDialog(action, obj): void {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '500px',
      height: '500px',
      data: obj
    });



    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.event === 'Add') {
          this.addRowData(result.data);
        } else if (result.event === 'Save') {
          this.updateRowData(result.data);
        } else if (result.event === 'Delete') {
          this.deleteRowData(result.data);
        }
      }
    });
  }

  getRandomId(max): any {
    return Math.floor(Math.random() * Math.floor(max));
  }

  addRowData(ROW_OBJ): any {
    const id = this.getRandomId(100);
    this.dataSource.push({
      id,
      name: ROW_OBJ.name,
      subject: ROW_OBJ.subject,
      emailTemplate: ROW_OBJ.emailTemplate
    });
    this.table.renderRows();
  }
  updateRowData(ROW_OBJ): any {
    this.dataSource = this.dataSource.filter((value, key) => {
      if (value.id === ROW_OBJ.id) {
        value.name = ROW_OBJ.name;
        value.subject = ROW_OBJ.subject;
        value.emailTemplate = ROW_OBJ.emailTemplate;
      }
      return true;
    });

    // let index = this.dataSource.indexOf(this.dataSource.find(data => data.id = ROW_OBJ.id));
    // this.dataSource[index] = ROW_OBJ;
  }
  deleteRowData(ROW_OBJ): any {
    this.dataSource = this.dataSource.filter((value, key) => {
      return value.id !== ROW_OBJ.id;
    });
  }

}
