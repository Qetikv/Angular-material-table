import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogBoxComponent } from './dialog-box.component';

describe('Dialog-Box-Component', () => {
    let component: DialogBoxComponent;
    let fixture: ComponentFixture<DialogBoxComponent>;
    const dialogMock = {
        close: () => { }
    };

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [
                DialogBoxComponent
            ],
            imports: [
                MatDialogModule,
                BrowserAnimationsModule
            ],
            providers: [
                { provide: MatDialogTitle, useValue: {} },
                { provide: MatDialogRef, useValue: dialogMock },
                { provide: MAT_DIALOG_DATA, useValue: [] }]
        });

        fixture = TestBed.createComponent(DialogBoxComponent);
        component = fixture.componentInstance;
    }));

    fit('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('should add the Template after doAction() function', () => {
        const spy = spyOn(component, 'doAction').and.callThrough();
        const button = fixture.debugElement.nativeElement.querySelectorAll('button')[0];

        button.click();
        fixture.whenStable().then(() => {
            expect(spy).toHaveBeenCalled();
          });
    });

    it('should close the dialog after closeDialog() function', () => {
        const spy = spyOn(component, 'closeDialog');
        const button = fixture.debugElement.nativeElement.querySelectorAll('button')[1];

        button.click();
        fixture.whenStable().then(() => {
            expect(spy).toHaveBeenCalled();
          });
    });
});
