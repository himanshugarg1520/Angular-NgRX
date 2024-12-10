import { createFeatureSelector } from "@ngrx/store";
import { BlogModel, Blogs } from "../../Blog/Blog.model";
import { state } from "@angular/animations";
import { createSelector } from "@ngrx/store";

const getblogstate = createFeatureSelector<Blogs>('blog');

export const getblog = createSelector(getblogstate,(state)=>{
    return  state.bloglist;
})

export const getblogbyid=(blogid:number) => createSelector(getblogstate,(state)=>{
    return  state.bloglist.find((blog:BlogModel)=>blog.id===blogid) as BlogModel;
})

export const getbloginfo = createSelector(getblogstate, (state)=>{
    return state;
})

// export const getspinnerstate = createSelector(getblogstate,(state)=>{
//     return state.isloaded;
// })