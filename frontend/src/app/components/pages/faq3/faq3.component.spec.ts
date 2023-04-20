import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Faq3Component } from './faq3.component';

describe('Faq3Component', () => {
  let component: Faq3Component;
  let fixture: ComponentFixture<Faq3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Faq3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Faq3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
