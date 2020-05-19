import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FlightState } from '../booking.state';

export * from './flight-booking.action';

export const getFlightState = createFeatureSelector<FlightState>('flight');

export const getActiveJourneyState = createSelector(getFlightState, state => state.activeJourneyDetails);
