import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IotDeviceMessagesComponent } from './iot-device-messages.component';

describe('IotDeviceMessagesComponent', () => {
  let component: IotDeviceMessagesComponent;
  let fixture: ComponentFixture<IotDeviceMessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IotDeviceMessagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IotDeviceMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
