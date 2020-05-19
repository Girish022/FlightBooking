import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Journey } from '../models/journey.model';
import { BookingService } from '../services/booking.service';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { getActiveJourneyState, SetJourneyDetailsAction } from '../state/flight-booking';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  journey: Journey;
  journeyDetails;
  constructor(
    private store: Store<any>,
    private BookingService: BookingService,
    private route:Router
  ) { }

  ngOnInit() {
    this.store.select(getActiveJourneyState)
      .subscribe((journeyDet: any) => {
        if (journeyDet) {
          this.journeyDetails = journeyDet;
        }
      },
        (err) => {
          console.log(err);
        }
      );

    this.journey = JSON.parse(localStorage.getItem("journey"));
    //this.journeyDetails = JSON.parse(localStorage.getItem("journeyDetails"));
    if(!this.journey){
      this.route.navigate([''])
    }
  }

  userForm(form: NgForm) {
    let name = form.value.user_name;
    let mobile_no = form.value.user_mobile;
    let email = form.value.user_email;
    let user = {
      user_email: email,
      mobile: mobile_no,
      user_name: name
    }
    this.journeyDetails = this.journeyDetails ? this.journeyDetails : [];
    this.journeyDetails.push({
      journey: this.journey,
      user: user
    })

    this.store.dispatch(new SetJourneyDetailsAction(this.journeyDetails));
    //localStorage.setItem("journeyDetails", JSON.stringify(this.journeyDetails))
    this.route.navigate(['print']);
  }
}
