import { Component, OnInit, OnDestroy, TemplateRef } from '@angular/core';
import { SelectFlightService } from '../services/selectFlight.service';
import { Subscription } from 'rxjs';
import { Flight } from '../models/flight.model';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Router } from '@angular/router';

@Component({
  selector: 'search-result-info',
  templateUrl: './flight-search-result.component.html',
  styleUrls: ['./flight-search-result.component.css']
})
export class FlightSearchResultComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  flightes: Flight[] = [];
  modalRef: BsModalRef;
  route = new Object();
  constructor(
    private FlightService: SelectFlightService,
    private modalService: BsModalService,
    private router: Router
  ) { }

  ngOnInit() {
    this.route = JSON.parse(localStorage.getItem("route"));
    if (!this.route) {
      this.router.navigate([''])
    }
    this.subscription = this.FlightService.castId.subscribe(
      res => this.getAllFlight(res)
    )
  }

  getAllFlight(res) {
    let flight = new Object();
    let result = this.FlightService.getFlight(res);
    for (let key in result) {
      flight = result[key];
      flight['$key'] = key;

      this.flightes.push(flight as Flight);
    }

    //this.FlightService.getFlight(res)
    //.subscribe(
    //  res=>{
    //    for(let key in res){
    //      flight=res[key];
    //      flight['$key']=key;


    //   this.flightes.push(flight as Flight);


    //    }
    //  }
    //)

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  openModal(template: TemplateRef<any>, flight) {
    this.modalRef = this.modalService.show(template);
    // let journey={
    //   route:this.route,
    //   flight_info:flight,
    //   seats:
    // }

  }
  closeModal() {
    this.modalRef.hide();
  }

}
