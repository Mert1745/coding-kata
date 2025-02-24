import {TestBed} from '@angular/core/testing';
import {HTTP_INTERCEPTORS, HttpHandler, HttpRequest, HttpResponse} from '@angular/common/http';
import {SpinnerInterceptor} from './spinner.interceptor';
import {SpinnerService} from '../service/spinner.service';
import {of} from 'rxjs';

describe('SpinnerInterceptor', () => {
    let interceptor: SpinnerInterceptor;
    let spinnerService: jasmine.SpyObj<SpinnerService>;
    let httpHandler: jasmine.SpyObj<HttpHandler>;

    beforeEach(() => {
        spinnerService = jasmine.createSpyObj('SpinnerService', ['show', 'hide']);
        httpHandler = jasmine.createSpyObj('HttpHandler', ['handle']);

        TestBed.configureTestingModule({
            providers: [
                SpinnerInterceptor,
                { provide: SpinnerService, useValue: spinnerService },
                { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true }
            ]
        });

        interceptor = TestBed.inject(SpinnerInterceptor);
    });

    it('should call show() on the spinner service when an HTTP request is made', () => {
        const httpRequest = new HttpRequest('GET', '/test');
        httpHandler.handle.and.returnValue(of(new HttpResponse({ status: 200 })));

        interceptor.intercept(httpRequest, httpHandler);

        expect(spinnerService.show).toHaveBeenCalled();
    });
});
