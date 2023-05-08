import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FAQReturnComponent } from './faq-return.component';

describe('FAQReturnComponent', () => {
  let component: FAQReturnComponent;
  let fixture: ComponentFixture<FAQReturnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FAQReturnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FAQReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
