import { Inject, Injectable } from "@angular/core";
import { act, Actions, createEffect, ofType } from "@ngrx/effects";
import { MasterService } from "../../master.service";
import { addblog, addblogsuccess, deleteblog, deleteblogsuccess, Load_Blog, loadblog, loadblogfail, loadblogsuccess, updateblog, updateblogsuccess } from "../Actions/Blog.actions";
import { catchError, EMPTY, exhaustMap, switchMap } from "rxjs";
import { map } from "rxjs"; 
import { of } from "rxjs";
import { BlogModel } from "../Blog/Blog.model";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Empty_Action, ShowAlert } from "../Actions/App.Action";
import { Action } from "rxjs/internal/scheduler/Action";
import { OnChanges } from "@angular/core";
import { loadspinner } from "../Actions/App.Action";

@Injectable()

export class BlogEffects{

    constructor(private action$: Actions, private service:MasterService, private snakbar: MatSnackBar){

    }
    

    _blog = createEffect(() =>
    this.action$.pipe(
    
        ofType(loadblog),
        exhaustMap(() => 
            this.service.getallBlogs().pipe(
                map((data) => loadblogsuccess({ bloglist: data })),
                catchError((error) => of(loadblogfail({ Errortext: error.message }), loadspinner({isloaded: false})))
            )
        )

    )
    );

    // _Addblog = createEffect(()=>
    //     this.action$.pipe(
    //         ofType(addblog),
    //         exhaustMap(action=>{
    //             return this.service.createBlog(action.bloginput).pipe(
    //                 map((data)=>{
    //                     return addblogsuccess({bloginput: data as BlogModel})
    //                 }),
    //                 catchError((error)=> of(loadblogfail({Errortext: error.message})))
    //             )
    //         })
    //     )
    // )

    _Addblog = createEffect(() =>
        this.action$.pipe(
            ofType(addblog),
            switchMap(action =>
                this.service.createBlog(action.bloginput).pipe(
                    switchMap(data=>of(
                        addblogsuccess({bloginput: data as BlogModel}),
                        loadspinner({isloaded: false}),
                        ShowAlert({message: "Added Successfully",actionresult: 'Pass'})
                    )),
                    catchError((error) => of(ShowAlert({message: "Add Item Failed Due to"+ error.message,actionresult: 'Fail'}), loadspinner({isloaded: false})))
                )
            )
        )
    );

    _Updateblog = createEffect(()=>
        this.action$.pipe(
            ofType(updateblog),
            switchMap(action=>
                this.service.UpdateBlog(action.bloginput).pipe(
                    switchMap(res =>of(
                        updateblogsuccess({bloginput: action.bloginput}),
                        loadspinner({isloaded: false}),
                        ShowAlert({message: 'Updated Successfully', actionresult: 'Pass'})
                    )),
                    catchError((_error)=> of(ShowAlert({message: 'Update Failed - Due to '+ _error.message, actionresult: 'Fail'}), loadspinner({isloaded: false})))
                )
            )
        )
    )

    _Deleteblog = createEffect(()=>
        this.action$.pipe(
            ofType(deleteblog),
            switchMap(action=>
                this.service.DeleteBlog(action.id).pipe(
                    switchMap(res=> of(
                        deleteblogsuccess({id:action.id}),
                        loadspinner({isloaded: false}),
                        ShowAlert({message:'Deleted Successfully', actionresult: 'Pass'})
                    )),
                    catchError((error)=>of(ShowAlert({message: 'Deleted Failed Due to '+ error.message, actionresult: 'Fail'}), loadspinner({isloaded: false})))
                )
            )
        )
    )

   
}