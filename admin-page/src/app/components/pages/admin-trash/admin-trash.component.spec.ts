import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTrashComponent } from './admin-trash.component';

describe('AdminTrashComponent', () => {
  let component: AdminTrashComponent;
  let fixture: ComponentFixture<AdminTrashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTrashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminTrashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
