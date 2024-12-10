import { createFeatureSelector, createSelector } from "@ngrx/store";
import { RouterstateModel } from "../../Router/CustomSerializer";
import { state } from "@angular/animations";
import { RouterReducerState } from "@ngrx/router-store";

const getrouterstate = createFeatureSelector<RouterReducerState<RouterstateModel>>('router');

export const getrouterinfo = createSelector(getrouterstate,(state)=>{
    return state.state.queryparams['id'];
});