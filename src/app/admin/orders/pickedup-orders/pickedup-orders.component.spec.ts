import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PickedupOrdersComponent } from './pickedup-orders.component';

describe('PickedupOrdersComponent', () => {
  let component: PickedupOrdersComponent;
  let fixture: ComponentFixture<PickedupOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickedupOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PickedupOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
