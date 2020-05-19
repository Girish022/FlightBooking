import { ActionReducerMap } from '@ngrx/store';
import { activeJourneyReducer } from './flight-booking/flight-booking.reducer';
import { FlightState } from './booking.state';

export const flightReducer: ActionReducerMap<FlightState> = {
  activeJourneyDetails: activeJourneyReducer
};
