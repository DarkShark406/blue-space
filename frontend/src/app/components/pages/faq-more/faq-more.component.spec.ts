import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FAQMoreComponent } from './faq-more.component';

describe('FAQMoreComponent', () => {
  let component: FAQMoreComponent;
  let fixture: ComponentFixture<FAQMoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FAQMoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FAQMoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
