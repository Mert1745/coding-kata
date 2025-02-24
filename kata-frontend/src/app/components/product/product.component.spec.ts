import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductComponent } from './product.component';
import { ProductDTO } from '../../shared/interface';
import { By } from '@angular/platform-browser';

describe('ProductComponent', () => {
    let component: ProductComponent;
    let fixture: ComponentFixture<ProductComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ProductComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(ProductComponent);
        component = fixture.componentInstance;
        component.products = [
            {
                id: 1,
                name: 'Product A',
                prices: [
                    { id: 1, quantity: 1, amount: 10 },
                    { id: 2, quantity: 3, amount: 25 }
                ]
            },
            {
                id: 2,
                name: 'Product B',
                prices: [
                    { id: 3, quantity: 2, amount: 15 }
                ]
            }
        ];
        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should render product names', () => {
        const productNames = fixture.debugElement.queryAll(By.css('.fw-bold'));
        expect(productNames.length).toBe(2);
        expect(productNames[0].nativeElement.textContent).toContain('Product A');
        expect(productNames[1].nativeElement.textContent).toContain('Product B');
    });

    it('should display correct pricing details', () => {
        const priceElements = fixture.debugElement.queryAll(By.css('.product-wrapper p'));
        expect(priceElements.length).toBe(5);
        expect(priceElements[1].nativeElement.textContent).toContain('1 for €10.00');
        expect(priceElements[2].nativeElement.textContent).toContain('3 for €25.00');
    });

    it('should emit count event when Add button is clicked', () => {
        spyOn(component.count, 'emit');
        const addButtons = fixture.debugElement.queryAll(By.css('.btn-success'));

        addButtons[0].nativeElement.click();
        expect(component.count.emit).toHaveBeenCalledWith(component.products![0]);

        addButtons[1].nativeElement.click();
        expect(component.count.emit).toHaveBeenCalledWith(component.products![1]);
    });
});
