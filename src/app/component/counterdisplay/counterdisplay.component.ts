import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { counterModel } from 'src/app/shared/store/counter.model';
import { Observable, Subscription } from 'rxjs';
import { getcounter } from 'src/app/shared/store/Reducer/selector/counter.selector';
import { AppstateModel } from 'src/app/shared/store/Global/AppState.Model';

@Component({
  selector: 'app-counterdisplay',
  templateUrl: './counterdisplay.component.html',
  styleUrls: ['./counterdisplay.component.css']
})
export class CounterdisplayComponent implements OnInit{
 
  // constructor(private store: Store<{counter:counterModel}>){
  // }
  constructor(private store: Store<AppstateModel>){
  }


  counterDisplay!:number
  channelname='';
  counterSubscription!: Subscription
  counter$!: Observable<counterModel>

  ngOnInit(): void {

    this.counterSubscription = this.store.select(getcounter).subscribe(data=>{
     this.counterDisplay = data;
      // this.channelname = data;
      console.log("Counter Display");
    });

    // this.counter$ = this.store.select('counter')
  }


  ngOnDestroy(): void {
    if(this.counterSubscription){
      this.counterSubscription.unsubscribe();
     }
  }
  
}
