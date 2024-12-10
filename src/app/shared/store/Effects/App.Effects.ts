import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Empty_Action, ShowAlert } from "../Actions/App.Action";
import { exhaustMap, map } from "rxjs";

@Injectable()

export class AppEffects{
    
    constructor(private action$: Actions, private snakbar: MatSnackBar){

    }


    _showALERT = createEffect(() =>
        this.action$.pipe(
            ofType(ShowAlert),
            exhaustMap(action => 
                this.showSnackbarAlert(action.message, action.actionresult)
                    .afterDismissed()
                    .pipe(
                        map(() => Empty_Action())
                    )
            )
        )
    );

    showSnackbarAlert(message: string, actionresult: string = 'Fail') {
        let _class = actionresult == 'Pass'?'green-snakbar': 'red-snakbar'
        return this.snakbar.open(message, 'Ok', {
            verticalPosition: 'top',
            horizontalPosition: 'end',
            panelClass: [_class],
            duration:4000
        });
    }

}