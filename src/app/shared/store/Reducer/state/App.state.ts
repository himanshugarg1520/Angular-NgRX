import { routerReducer } from "@ngrx/router-store";
import { blogReducer } from "../reducer/Blog.reducer";
import { counterReducer } from "../reducer/counter.reducer";
import { AppReducer } from "../reducer/App.reducer";

export const Appstate= {
    counter: counterReducer,
    blog: blogReducer,
    app: AppReducer,
    router: routerReducer,
}