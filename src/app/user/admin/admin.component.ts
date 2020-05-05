import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  flights = [];
  displayedColumns: string[] = ['user', 'seat'];
  selectedFlight;
  constructor() { }

  ngOnInit() {
    let journeyDetails = JSON.parse(localStorage.getItem("journeyDetails"));
    if (journeyDetails) {
      for (let i = 0; i < journeyDetails.length; i++) {
        let found = false;
        for (let j = 0; j < this.flights.length; j++) {
          if (this.flights[j].key === journeyDetails[i].journey.flight.$key) {
            found = true;
            break;
          }
        }
        if (!found) {
          this.flights.push({
            key: journeyDetails[i].journey.flight.$key,
            name: journeyDetails[i].journey.flight.location + ' ' + journeyDetails[i].journey.flight.time
          })
        }        
      }
    }

  }

  onFlightSelect() {
    console.log('Flight selected' + this.selectedFlight)
  }

}
