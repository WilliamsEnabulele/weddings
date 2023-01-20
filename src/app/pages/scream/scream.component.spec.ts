import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreamComponent } from './scream.component';

describe('ScreamComponent', () => {
  let component: ScreamComponent;
  let fixture: ComponentFixture<ScreamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScreamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
