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
     
      let flightes = {
        "-LAl4y1UdfdfGNWVo6Pfd_S": {
         
          "fare": 1000,
          "location": "banglore to delhi",
          "name": "JetAirways",
          "seat": 72,
          "time": "10:00 PM"
        },
        "-LAl55drgdf44nxdf8kf": {
       
         "fare": 800,
         "location": "banglore to delhi",
         "name": "Air indigo",
         "seat": 72,
         "time": "7:00 PM"
        },
        "-LAl5Dg9erterr4d94aPBrh": {
        
         "fare": 1000,
         "location": "banglore to delhi",
         "name": "JetAirways",
         "seat": 72,
         "time": "12:00 PM"
        },
      
        "-LAl5S8WeRX6blNIGSgE": {
         
         "fare": 800,
         "location": "banglore to delhi",
         "name": "Air indigo",
         "seat": 72,
         "time": "5:00 PM"
        },
        "-LAl5TXGFLfUHSXgliG": {
       
         "fare": 800,
         "location": "banglore to delhi",
         "name": "Air indigo",
         "seat": 72,
         "time": "9:00 PM"
        },
     
      }
      return flightes;
    }

    getRoueId(routeId){
        this.routeId.next(routeId)
    }


    getFillupseat(key,flightID){
        
       return  this.http.get(this.Root_url+'booking/'+key+'/'+flightID+'/seat_booking.json')
      
    }

    getRoute(key){
        return  this.http.get(this.Root_url+'routes/'+key+'.json')
    }
}
