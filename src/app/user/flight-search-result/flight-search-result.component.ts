import { Component, OnInit, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { SelectFlightService } from '../services/selectFlight.service';
import { Subscription } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
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
  @ViewChild(MatSort) sort: MatSort;

  subscription: Subscription;
  flights: any;
  //flights: MatTableDataSource<any> = new MatTableDataSource<any>();
  modalRef: BsModalRef;
  route = new Object();
  displayedColumns: string[] = ['name', 'time', 'seat', 'fare', 'action'];
  constructor(
    private FlightService: SelectFlightService,
    private modalService: BsModalService,
    private router: Router
  ) { }

  ngOnInit() {
    //this.flights.sort = this.sort;
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
    let tempFlights = [];
    for (let key in result) {
      flight = result[key];
      flight['$key'] = key;

      tempFlights.push(flight as Flight);
      // this.flights.push(flight as Flight);
    }

    this.flights = new MatTableDataSource(tempFlights);
    this.flights.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.flights.filter = filterValue.trim().toLowerCase();
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
