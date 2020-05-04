import { Component, OnInit } from '@angular/core';
import { BookingService } from '../services/booking.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.css']
})
export class PrintComponent implements OnInit {
  createTicket;
  constructor(
    private BookingService: BookingService,
    private route: Router
  ) { }

  ngOnInit() {
    let journey = JSON.parse(localStorage.getItem("journey"))
    let journeyDetails = JSON.parse(localStorage.getItem("journeyDetails"));

    if (journeyDetails && journey) {
      for (let i = 0; i < journeyDetails.length; i++) {
        let existingJourneyBusId = journeyDetails[i].journey.bus['$key'];
        let existingJourneyDate = journeyDetails[i].journey.journey_route.date;
        let existingJourneyTime = journeyDetails[i].journey.bus.time;
        let existingJourneySeats = journeyDetails[i].journey.seats;

        if (existingJourneyBusId === journey.bus['$key'] && existingJourneyDate === journey.journey_route.date
          && existingJourneyTime === journey.bus.time && existingJourneySeats.includes(journey.seats[0])) {          
          this.createTicket = journeyDetails[i];
          break;
        }
      }
    }

    //this.BookingService.cast.subscribe(
    //  res=>this.createTicket=res,
    //)
    //if(!this.createTicket){
    //  this.route.navigate([''])
    //}
  }

}
