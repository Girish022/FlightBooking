import { Injectable } from "@angular/core";
import { Journey } from "../models/journey.model";
import { HttpClient } from "@angular/common/http";
import { UserService } from "./user.service";
import { User } from "../models/user.model";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";

@Injectable()

export class BookingService {

  journey_info = new BehaviorSubject('')
  cast = this.journey_info.asObservable();
  private USerId;
  private Root_Url = "https://bdflightticket.firebaseio.com/"
  constructor(
    private http: HttpClient,
    private UserService: UserService,
    private router: Router
  ) { }

  // userBooking(jourey:Journey) {
  //     this.http.post(this.Root_Url+'user_booking',jourey)
  // }

  async seatBooking(jourey: Journey, user) {
    let flightID = jourey.flight.$key;
    let booking = new Object()
    let key = new Date(jourey.journey_route.date).getTime();
    await this.createUserID(user).subscribe(
      res => {
        booking = {
          user_id: Object.values(res)[0],
          seats: jourey.seats
        }
        this.chekBookingDate_FlightInfo(key, jourey, booking, flightID)
      });

  }

  private async createBookingDate(journey: Journey, key, booking, flightID) {

    await this.create(journey, key, flightID, booking)
    // await this.createBooking(booking, key,flightID)

  }

  private async  create(journey: Journey, key, flightID, booking) {
    let location = journey.journey_route.leaving_form + ' to ' + journey.journey_route.going_to;
    this.http.put(this.Root_Url + 'booking/' + key + '/' + flightID + '.json', {

      flight: {
        location: location,
        name: journey.flight.name,
        coach_type: journey.flight.coach_type,
        nfareame: journey.flight.fare,
        time: journey.flight.time,
        seat: journey.flight.seat
      }
    })
      .subscribe(res => {
        this.createBooking(booking, key, flightID);
      },
        error => console.log(error))
  }

  private CheckFlightID(flightID, key, booking, journey) {
    let flightidArray = [];
    this.http.get(this.Root_Url + 'booking/' + key + '.json')
      .subscribe(res => {
        for (let key in res) {
          flightidArray.push(key)
        }
        if (flightidArray.indexOf(String(flightID)) > -1) {
          this.createBooking(booking, key, flightID);
        }
        else {
          this.create(journey, key, flightID, booking);
        }
      });
  }

  private async chekBookingDate_FlightInfo(key, journey, booking, flightID) {

    let keys = [];
    this.http.get(this.Root_Url + 'booking.json')
      .subscribe(
        res => {
          for (let key in res) {
            keys.push(key)
          }
          if (keys.indexOf(String(key)) > -1) {
            this.CheckFlightID(flightID, key, booking, journey)
          }
          else {
            this.createBookingDate(journey, key, booking, flightID);
          }
        }
      );
  }

  private createBooking(booking, key, flightID) {
    let tketID;
    this.http.post(this.Root_Url + 'booking/' + key + '/' + flightID + '/seat_booking.json', booking)
      .subscribe(res => {
        for (let key in res) {
          tketID = res[key]
        }
        this.createPrintView(tketID);
      },
        err => console.log(err));


  }

  private createUserID(user) {
    localStorage.setItem("user", JSON.stringify(user))
    return this.UserService.createUser(user)

  }


  createPrintView(tketID) {

    let journey = JSON.parse(localStorage.getItem("journey"));
    let user = JSON.parse(localStorage.getItem("user"));
    let Ticket = {
      ticketId: tketID,
      journey: journey,
      user: user
    }
    this.getJourneyInfo(Ticket);
    this.router.navigate(['print']);
  }

  getJourneyInfo(Ticket) {
    this.journey_info.next(Ticket);
    localStorage.removeItem("journey");
    localStorage.removeItem("route");
    localStorage.removeItem("user");
  }


}



