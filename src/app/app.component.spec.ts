import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';

describe('ui-noninteractive - DialogUtComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    const itemToDelete = 'thing two';

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AppComponent],
            imports: [MatDialogModule, BrowserAnimationsModule, MatTableModule]
        }).overrideModule(BrowserDynamicTestingModule, {
            set: {
                entryComponents: []
            }
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    fit('should create', () => {
        expect(component).toBeTruthy();
    });

    fit('should call openDialog function when clicked addTemplate button', waitForAsync(() => {
        spyOn(component, 'openDialog');
        const button = fixture.debugElement.nativeElement.querySelector('button');
        button.click();

        fixture.whenStable().then(() => {
            expect(component.openDialog).toHaveBeenCalled();
        });
    }));

    fit('should open the dialog when openDialog is called', waitForAsync(() => {
        const spy = spyOn(component.dialog, 'open').and.callThrough();
        component.openDialog('Action', {});

        fixture.whenStable().then(() => {
            expect(spy).toHaveBeenCalled();
        });
    }));

    fit('should initialize table data with 4 objects', waitForAsync(() => {
        const data = component.dataSource;
        expect(data.length).toBe(4);
    }));

    fit('should add element to the datasource when addRowData is called', () => {
        const initialDataLength = component.dataSource.length;
        spyOn(component.table, 'renderRows').and.callThrough();
        component.addRowData({ id: 1, name: 'Ket', subject: 'something', emailTemplate: 'qqqetikv@gmail.com' });

        expect(component.dataSource.length).toBe(initialDataLength + 1);
       // const newData = component.dataSource.find(r => r.id === 1);
       // expect(newData).toBeTruthy;
    });

    fit('should delete element from the datasource when deleteRowData is called', () => {
        const initialDataLength = component.dataSource.length;
        component.deleteRowData({ id: 1, name: 'Ket', subject: 'something', emailTemplate: 'qqqetikv@gmail.com' });

        expect(component.dataSource.length).toBe(initialDataLength - 1);
      //  const deletedData = component.dataSource.find(r => r.id === 1);
      //  expect(deletedData).toBeFalsy;
    });

    fit('should update element from the datasource when updateRowData is called', () => {
        // component.dataSource = [{id: 1, name: 'Ket', subject: 'something', emailTemplate: 'qqqetikv@gmail.com'}];
        component.updateRowData({ id: 1, name: 'Ketevani', subject: 'somethingChanged', emailTemplate: 'qetikv@gmail.com' });
        const row = component.dataSource.find(r => r.id === 1);

        expect(row.name).toBe('Ketevani');
        expect(row.subject).toBe('somethingChanged');
        expect(row.emailTemplate).toBe('qetikv@gmail.com');
    });
});
