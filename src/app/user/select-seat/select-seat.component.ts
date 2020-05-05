import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Seat } from '../models/seat.model';
import { Journey } from '../models/journey.model';
import { Journey_Route } from '../models/route.model';
import { Router } from '@angular/router';
import { Flight } from '../models/flight.model';
import { SelectFlightService } from '../services/selectFlight.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'select-seat',
  templateUrl: './select-seat.component.html',
  styleUrls: ['./select-seat.component.css']
})
export class SelectSeatComponent implements OnInit, OnDestroy {
  @Input('flight') flight: Flight;
  @Output('closeModal') closeModal = new EventEmitter()
  showSeatList: Seat[] = [];
  total = 0;
  fillupSeat = [];
  alert = false;

  subscription: Subscription;
  constructor(
    private route: Router,
    private FlightService: SelectFlightService
  ) { }

  ngOnInit() {
    this.getbookSeat();
  }

  Seat(e) {
    let seats = [];
    seats = this.showSeatList.map(iteam => {
      return iteam.seatNo
    })
    let id = document.getElementById(e);

    if ((this.fillupSeat.indexOf(String(e)) < 0) && (seats.indexOf(e) < 0)) {
      if ((this.showSeatList.length != 4)) {
        id.innerHTML = `   <img src="../assets/img/fseat.png" alt="">`

        let seat = {
          seatNo: e,
          fare: this.flight.fare,
          seatClass: 'economy'
        }
        this.totalFare(seat.fare);
        this.showList(seat);
      }
      else {
        this.alert = true;
      }
    }

  }

  showList(seat) {
    this.showSeatList.push(seat)
  }

  totalFare(fare) {
    this.total += fare;
  }

  confirmJourney() {
    let route: Journey_Route = JSON.parse(localStorage.getItem("route"))

    let seats = [];
    seats = this.showSeatList.map(iteam => {
      return iteam.seatNo
    });

    let journey: Journey = {
      flight: this.flight,
      seats: seats,
      fare: Number(this.total),
      journey_route: route
    }

    localStorage.setItem("journey", JSON.stringify(journey))
    this.route.navigate(['user-form']);
    this.closeModal.emit();
  }


  getbookSeat() {
    let journeyDetails = JSON.parse(localStorage.getItem("journeyDetails"));

    let route: Journey_Route = JSON.parse(localStorage.getItem("route"))
    let flightid = this.flight.$key;
    let key = String(new Date(route.date).getTime());

    if (journeyDetails) {

      for (let i = 0; i < journeyDetails.length; i++) {
        let existingJourneyFlightId = journeyDetails[i].journey.flight['$key'];
        let existingJourneyDate = journeyDetails[i].journey.journey_route.date;
        let existingJourneyTime = journeyDetails[i].journey.flight.time;

        if (existingJourneyFlightId === flightid && existingJourneyDate === route.date && existingJourneyTime === this.flight.time) {
          for (let j in journeyDetails[i].journey.seats) {
            this.fillupSeat.push(journeyDetails[i].journey.seats[j])
            this.changeSeatColor(journeyDetails[i].journey.seats[j])
          }
        }
      }
    }

    //console.log(flightid, key)
    //this.subscription = this.FlightService.getFillupseat(key, flightid)
    //  .subscribe(res => {
    //    for (key in res) {
    //      for (let i in res[key].seats) {
    //        this.fillupSeat.push(res[key].seats[i])
    //        this.changeSeatColor(res[key].seats[i])
    //      }
    //    }
    //  })
  }

  changeSeatColor(seatNo) {
    let id = document.getElementById(seatNo)
    id.innerHTML = `  <img src="../assets/img/bookseat.png">`
    id.removeEventListener("click", this.Seat);


  }

  ngOnDestroy() {
    //this.subscription.unsubscribe();
  }

} 
