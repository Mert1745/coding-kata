import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { By } from '@angular/platform-browser';

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [HeaderComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should display the logo', () => {
        const imgElement = fixture.debugElement.query(By.css('img'));
        expect(imgElement).toBeTruthy();
        expect(imgElement.nativeElement.getAttribute('src')).toBe('favicon.ico');
    });

    it('should display the correct title', () => {
        const titleElement = fixture.debugElement.query(By.css('p'));
        expect(titleElement.nativeElement.textContent).toContain('Super Duper Market');
    });
});
