import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VinylFormComponent } from './vinyl-form.component';

describe('VinylFormComponent', () => {
  let component: VinylFormComponent;
  let fixture: ComponentFixture<VinylFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VinylFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VinylFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
