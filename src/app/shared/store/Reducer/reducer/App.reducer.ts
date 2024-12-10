import { createReducer, on } from "@ngrx/store"
import { blogstate } from "../state/Blog.state"
import { addblogsuccess, deleteblogsuccess, loadblog, loadblogfail, loadblogsuccess, updateblogsuccess } from "../../Actions/Blog.actions"
import { BlogModel } from "../../Blog/Blog.model"
import { Globalstate } from "../state/Global.state"
import { loadspinner } from "../../Actions/App.Action"

const _appReducer = createReducer(Globalstate,
    
    on(loadspinner, (state,action)=>{
        return {
            ...state,
            isloaded: action.isloaded
        }
    })
)

export function AppReducer(state:any,action:any){

    return _appReducer(state,action);
}