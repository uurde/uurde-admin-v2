import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IotHubComponent } from './iot-hub.component';

describe('IotHubComponent', () => {
  let component: IotHubComponent;
  let fixture: ComponentFixture<IotHubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IotHubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IotHubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
