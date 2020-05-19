import { ActiveFlightActions, SelectJourneyDetails } from './flight-booking.action';

export function activeJourneyReducer(state: any, action: ActiveFlightActions) {
  switch (action.type) {
    case SelectJourneyDetails:
      return action.payload;
    default:
      return state;
  }
}
