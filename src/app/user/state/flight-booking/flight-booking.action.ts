import { Action } from '@ngrx/store';

export const SelectJourneyDetails = 'Select Journey Details';

export class SetJourneyDetailsAction implements Action {
  readonly type = SelectJourneyDetails;
  constructor(public payload: string) { }
}

export type ActiveFlightActions = SetJourneyDetailsAction;
