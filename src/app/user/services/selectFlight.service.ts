import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Flight } from "../models/flight.model";
import {BehaviorSubject} from 'rxjs'

@Injectable()

export class SelectFlightService {
    private Root_url = "https://bdflightticket.firebaseio.com/";


    private routeId= new BehaviorSubject <string> (''); 
    castId=this.routeId.asObservable();
    
    constructor(
        private http: HttpClient,
    ) { }

    getFlight(routeId) {
      //return this.http.get(this.Root_url + 'flightes/' + routeId + '.json');
      let flightes = {
        "-LAl4y1UdfdfGNWVo6Pfd_S": {
          "coach_type": "AC",
          "fare": 1000,
          "location": "Dhaka to Chittagong",
          "name": "Green Line",
          "seat": 36,
          "time": "10:00 PM"
        }
        //"-LAl55drgdf44nxdf8kf": {
        //  "coach_type": "Non AC",
        //  "fare": 800,
        //  "location": "Dhaka to Chittagong",
        //  "name": "Star Line",
        //  "seat": 36,
        //  "time": "7:00 PM"
        //},
        //"-LAl5Dg9erterr4d94aPBrh": {
        //  "coach_type": "AC",
        //  "fare": 1000,
        //  "location": "Dhaka to Chittagong",
        //  "name": "Green Line",
        //  "seat": 36,
        //  "time": "12:00 PM"
        //},
        //"-LAl5EqsdghfN1ZDXV9MRg": {
        //  "coach_type": "AC",
        //  "fare": 1000,
        //  "location": "Dhaka to Chittagong",
        //  "name": "Green Line",
        //  "seat": 36,
        //  "time": "3:00 PM"
        //},
        //"-LAl5JM45GSDow5HPe-QZ": {
        //  "coach_type": "Non AC",
        //  "fare": 800,
        //  "location": "Dhaka to Chittagong",
        //  "name": "Green Line",
        //  "seat": 36,
        //  "time": "11:00 PM"
        //},
        //"-LAl5LedMrUXP2jerqHT": {
        //  "coach_type": "Non AC",
        //  "fare": 800,
        //  "location": "Dhaka to Chittagong",
        //  "name": "Green Line",
        //  "seat": 36,
        //  "time": "4:00 PM"
        //},
        //"-LAl5Ndf5Zgu1hdHso9_": {
        //  "coach_type": "Non AC",
        //  "fare": 800,
        //  "location": "Dhaka to Chittagong",
        //  "name": "Green Line",
        //  "seat": 36,
        //  "time": "7:00 PM"
        //},
        //"-LAl5S8WeRX6blNIGSgE": {
        //  "coach_type": "Non AC",
        //  "fare": 800,
        //  "location": "Dhaka to Chittagong",
        //  "name": "Star Line",
        //  "seat": 36,
        //  "time": "5:00 PM"
        //},
        //"-LAl5TXGFLfUHSXgliG": {
        //  "coach_type": "Non AC",
        //  "fare": 800,
        //  "location": "Dhaka to Chittagong",
        //  "name": "Star Line",
        //  "seat": 36,
        //  "time": "9:00 PM"
        //},
        //"-LAl5WbOS_kJbI1-dn8l": {
        //  "coach_type": "AC",
        //  "fare": 800,
        //  "location": "Dhaka to Chittagong",
        //  "name": "Star Line",
        //  "seat": 36,
        //  "time": "9:00 AM"
        //},
        //"-LAl5cnLHDCZJZHa4d2u": {
        //  "coach_type": "AC",
        //  "fare": 900,
        //  "location": "Dhaka to Chittagong",
        //  "name": "S ALOM Paribahan",
        //  "seat": 36,
        //  "time": "9:00 AM"
        //},
        //"-LAl5fzeferttmAy_SzV1j": {
        //  "coach_type": "AC",
        //  "fare": 900,
        //  "location": "Dhaka to Chittagong",
        //  "name": "S ALOM Paribahan",
        //  "seat": 36,
        //  "time": "12:00 PM"
        //},
        //"-LAl5gegW_hw2eedJJN_R6Y": {
        //  "coach_type": "AC",
        //  "fare": 900,
        //  "location": "Dhaka to Chittagong",
        //  "name": "S ALOM Paribahan",
        //  "seat": 36,
        //  "time": "2:00 PM"
        //}
      }
      return flightes;
    }

    getRoueId(routeId){
        this.routeId.next(routeId)
    }


    getFillupseat(key,flightID){
        
       return  this.http.get(this.Root_url+'booking/'+key+'/'+flightID+'/seat_booking.json')
        //console.log(this.Root_url+'booking/'+key+'/'+flightID+'.json')
    }

    getRoute(key){
        return  this.http.get(this.Root_url+'routes/'+key+'.json')
    }
}
