import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SelectFlightService } from '../services/selectFlight.service';
import { SelectFlightComponent } from './select-flight.component';

describe('SelectFlightComponent', () => {
  let component: SelectFlightComponent;
  let fixture: ComponentFixture<SelectFlightComponent>;

  const selectFlightService = jasmine.createSpyObj('selectFlightService', ['getRoueId']);
  selectFlightService.getRoueId.and.returnValue({});

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [SelectFlightComponent],
      providers: [{ provide: SelectFlightService, useValue: selectFlightService },
        {
          provide: Router,
          useClass: class { navigate = jasmine.createSpy("navigate"); }
        }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectFlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
