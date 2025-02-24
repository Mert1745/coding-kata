import {ComponentFixture, TestBed} from '@angular/core/testing';
import {SpinnerComponent} from './spinner.component';
import {BehaviorSubject} from 'rxjs';
import {By} from '@angular/platform-browser';
import {SpinnerService} from "../../service/spinner.service";

describe('SpinnerComponent', () => {
    let component: SpinnerComponent;
    let fixture: ComponentFixture<SpinnerComponent>;
    let spinnerService: SpinnerService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SpinnerComponent],
            providers: [
                {
                    provide: SpinnerService,
                    useValue: { loading$: new BehaviorSubject<boolean>(false) } // Mock service
                }
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SpinnerComponent);
        component = fixture.componentInstance;
        spinnerService = TestBed.inject(SpinnerService);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should show spinner when loading$ is true', () => {
        (spinnerService.loading$ as BehaviorSubject<boolean>).next(true);
        fixture.detectChanges();

        const spinnerElement = fixture.debugElement.query(By.css('.spinner-overlay'));
        expect(spinnerElement).toBeTruthy();
    });

    it('should hide spinner when loading$ is false', () => {
        (spinnerService.loading$ as BehaviorSubject<boolean>).next(false);
        fixture.detectChanges();

        const spinnerElement = fixture.debugElement.query(By.css('.spinner-overlay'));
        expect(spinnerElement).toBeNull();
    });
});
