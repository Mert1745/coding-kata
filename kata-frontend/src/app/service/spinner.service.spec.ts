import { TestBed } from '@angular/core/testing';
import { SpinnerService } from './spinner.service';

describe('SpinnerService', () => {
    let service: SpinnerService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(SpinnerService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should set loading$ to true when show() is called', (done) => {
        service.show();
        service.loading$.subscribe((isLoading) => {
            expect(isLoading).toBeTrue();
            done();
        });
    });

    it('should set loading$ to false when hide() is called', (done) => {
        service.show(); // First, set it to true
        service.hide();
        service.loading$.subscribe((isLoading) => {
            expect(isLoading).toBeFalse();
            done();
        });
    });
});
