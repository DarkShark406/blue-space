import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FAQSecurityComponent } from './faq-security.component';

describe('FAQSecurityComponent', () => {
  let component: FAQSecurityComponent;
  let fixture: ComponentFixture<FAQSecurityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FAQSecurityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FAQSecurityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
