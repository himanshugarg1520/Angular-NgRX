import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CounterdisplayComponent } from './component/counterdisplay/counterdisplay.component';
import { BlogComponent } from './component/blog/blog.component';
import { EditblogComponent } from './component/editblog/editblog.component';

const routes: Routes = [

  // {path: 'counter',component: CounterdisplayComponent},
  // {path: 'blog/edit/', component: BlogComponent},
  // {path: 'blog/edit/:id',component: EditblogComponent},


  { path: 'counter', component: CounterdisplayComponent }, 
  { path: 'blog', component: BlogComponent }, 
  { path: '', redirectTo: '/counter', pathMatch: 'full' }, 
  // { path: 'blog/edit', component: EditblogComponent },
  { path: 'blog/edit/:id', component: EditblogComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
