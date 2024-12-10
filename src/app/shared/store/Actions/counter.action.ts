import { createAction, props } from "@ngrx/store";

export const increment = createAction("Increment");
export const decrement = createAction("Decrement");
export const reset = createAction("Reset");

// in props refers to properties or data that passed to actions
export const customincrement = createAction("CustomIncrement", props<{value: number, action: string}>())
export const changechannelname = createAction("ChangeChannelname", props<{channel:string}>()) 
