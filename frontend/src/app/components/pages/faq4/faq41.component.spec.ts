import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FAQ41Component } from './faq41.component';

describe('FAQ41Component', () => {
  let component: FAQ41Component;
  let fixture: ComponentFixture<FAQ41Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FAQ41Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FAQ41Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
