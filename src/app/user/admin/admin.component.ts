import { Component, OnInit, TemplateRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { getActiveJourneyState, SetJourneyDetailsAction } from '../state/flight-booking';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  journeyDetails;
  flights = [];
  selectedFlight;
  bookingList = [];
  modalRef: BsModalRef;
  displayedColumns: string[] = ['userName', 'seats', 'action'];

  constructor(private modalService: BsModalService, private store: Store<any>) { }

  ngOnInit() {
    //this.journeyDetails = JSON.parse(localStorage.getItem("journeyDetails"));
    this.store.select(getActiveJourneyState)
      .subscribe((journeyDet: any) => {
        if (journeyDet) {
          this.journeyDetails = journeyDet;
          this.setFlights();
        }
      },
        (err) => {
          console.log(err);
        }
      );
    
  }

  setFlights() {
    if (this.journeyDetails) {
      for (let i = 0; i < this.journeyDetails.length; i++) {
        let found = false;
        for (let j = 0; j < this.flights.length; j++) {
          if (this.flights[j].key === this.journeyDetails[i].journey.flight.$key) {
            found = true;
            break;
          }
        }
        if (!found) {
          this.flights.push({
            key: this.journeyDetails[i].journey.flight.$key,
            name: this.journeyDetails[i].journey.flight.location + ' ' + this.journeyDetails[i].journey.flight.time
          })
        }
      }
    }
  }

  onFlightSelect() {
    console.log('Flight selected' + this.selectedFlight);
    this.bookingList = [];
    for (let i = 0; i < this.journeyDetails.length; i++) {
      if (this.journeyDetails[i].journey.flight.$key === this.selectedFlight) {
        this.bookingList.push(this.journeyDetails[i]);
      }
    }
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  cancelBooking(booking) {
    console.log('Flight selected' + booking)
    for (let i = 0; i < this.journeyDetails.length; i++) {
      if (this.journeyDetails[i].journey.flight.$key === booking.journey.flight.$key &&
        this.journeyDetails[i].journey.journey_route.date === booking.journey.journey_route.date &&
        this.journeyDetails[i].journey.flight.time === booking.journey.flight.time &&
        this.journeyDetails[i].journey.seats === booking.journey.seats) {

        this.journeyDetails.splice(i, 1);
        break;
      }
    }
    this.onFlightSelect();
    this.store.dispatch(new SetJourneyDetailsAction(this.journeyDetails));
    //localStorage.setItem("journeyDetails", JSON.stringify(this.journeyDetails));
    this.closeModal();
  }

  closeModal() {
    this.modalRef.hide();
  }
}
