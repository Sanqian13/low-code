import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RulerDemoComponent } from './ruler-demo.component';

describe('RulerDemoComponent', () => {
  let component: RulerDemoComponent;
  let fixture: ComponentFixture<RulerDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RulerDemoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RulerDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
