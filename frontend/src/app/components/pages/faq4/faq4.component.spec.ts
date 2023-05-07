import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FAQ4Component } from './faq4.component';

describe('FAQ4Component', () => {
  let component: FAQ4Component;
  let fixture: ComponentFixture<FAQ4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FAQ4Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FAQ4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
