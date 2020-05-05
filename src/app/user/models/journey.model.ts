import { Flight } from "./flight.model";
import { Seat } from "./seat.model";
import { Journey_Route } from "./route.model";

export class Journey {
    flight:Flight;
    seats:seat[];
    fare:number;
    journey_route:Journey_Route
}

export interface seat {
    seat:string
}