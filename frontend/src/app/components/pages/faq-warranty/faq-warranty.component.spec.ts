import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FAQWarrantyComponent } from './faq-warranty.component';

describe('FAQWarrantyComponent', () => {
  let component: FAQWarrantyComponent;
  let fixture: ComponentFixture<FAQWarrantyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FAQWarrantyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FAQWarrantyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
