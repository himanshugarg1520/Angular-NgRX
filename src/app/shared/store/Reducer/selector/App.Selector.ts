import { createFeatureSelector, createSelector } from "@ngrx/store";
import { BlogModel, Blogs } from "../../Blog/Blog.model";
import { AppstateModel } from "../../Global/AppState.Model";
import { loadspinner } from "../../Actions/App.Action";

const getAppstate = createFeatureSelector<AppstateModel>('blog');

export const getspinnerstate = createSelector(getAppstate,(state)=>{
    return state.isloaded;
})

