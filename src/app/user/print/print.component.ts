import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BookingService } from '../services/booking.service';
import { Router } from '@angular/router';
import { getActiveJourneyState } from '../state/flight-booking';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.css']
})
export class PrintComponent implements OnInit {
  createTicket;
  constructor(private store: Store<any>) { }

  ngOnInit() {
    this.store.select(getActiveJourneyState)
      .subscribe((journeyDet: any) => {
        if (journeyDet) {
          let journeyDetails = journeyDet;
          let journey = JSON.parse(localStorage.getItem("journey"));
          this.printTicket(journeyDetails, journey);
        }
      },
        (err) => {
          console.log(err);
        }
      );

    //let journey = JSON.parse(localStorage.getItem("journey"))
    //let journeyDetails = JSON.parse(localStorage.getItem("journeyDetails"));
  }

  printTicket(journeyDetails, journey) {
    if (journeyDetails && journey) {
      for (let i = 0; i < journeyDetails.length; i++) {
        let existingJourneyFlightId = journeyDetails[i].journey.flight['$key'];
        let existingJourneyDate = journeyDetails[i].journey.journey_route.date;
        let existingJourneyTime = journeyDetails[i].journey.flight.time;
        let existingJourneySeats = journeyDetails[i].journey.seats;

        if (existingJourneyFlightId === journey.flight['$key'] && existingJourneyDate === journey.journey_route.date
          && existingJourneyTime === journey.flight.time && existingJourneySeats.includes(journey.seats[0])) {
          this.createTicket = journeyDetails[i];
          break;
        }
      }
    }
  }
}
