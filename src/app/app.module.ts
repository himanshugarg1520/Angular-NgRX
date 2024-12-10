import { isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CounterbuttonComponent } from './component/counterbutton/counterbutton.component';
import { CounterdisplayComponent } from './component/counterdisplay/counterdisplay.component';
import { Store, StoreModule } from '@ngrx/store';
// import { counterReducer } from './shared/store/counter.reducer';
import { counterReducer } from './shared/store/Reducer/reducer/counter.reducer';
import { materialModule } from './material.Module';
import { CustomcounterComponent } from './component/customcounter/customcounter.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { blogReducer } from './shared/store/Reducer/reducer/Blog.reducer';
import { BlogComponent } from './component/blog/blog.component';
import { Appstate } from './shared/store/Reducer/state/App.state';
import { MatDialogModule } from '@angular/material/dialog';
import { AddblogComponent } from './component/addblog/addblog.component'
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { BlogEffects } from './shared/store/Effects/Blog.Effects';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AppEffects } from './shared/store/Effects/App.Effects';
import { LoadingspinnerComponent } from './component/loadingspinner/loadingspinner.component';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { StoreRouterConnectingModule } from '@ngrx/router-store'
import { CustomSerializer } from './shared/store/Router/CustomSerializer';
import { EditblogComponent } from './component/editblog/editblog.component';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { ViewblogComponent } from './component/viewblog/viewblog.component';
import { HeaderComponent } from './component/header/header.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatIconModule } from '@angular/material/icon'

@NgModule({
  declarations: [
    AppComponent,
    CounterbuttonComponent,
    CounterdisplayComponent,
    CustomcounterComponent,
    BlogComponent,
    AddblogComponent,
    LoadingspinnerComponent,
    EditblogComponent,
    ViewblogComponent,
    HeaderComponent,
  ],
  imports: [

    BrowserModule,
    AppRoutingModule,
    // StoreModule.forRoot({counter: counterReducer, blog: blogReducer}),
    StoreModule.forRoot(Appstate),
    materialModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: !isDevMode() }),
    MatDialogModule,
    MatIconModule,
    HttpClientModule,
    EffectsModule.forRoot([BlogEffects, AppEffects]),
    MatSnackBarModule,
    MatProgressSpinnerModule,
    StoreRouterConnectingModule.forRoot(
      {serializer: CustomSerializer}
    ),
    BrowserAnimationsModule,
    MatMenuModule,
    MatSlideToggleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
