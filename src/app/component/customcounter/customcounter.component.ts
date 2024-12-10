import { Component, OnInit } from '@angular/core';
import { CounterbuttonComponent } from '../counterbutton/counterbutton.component';
import { Store } from '@ngrx/store';
import { customincrement } from 'src/app/shared/store/Actions/counter.action';
import { counterModel } from 'src/app/shared/store/counter.model';
import { Subscription } from 'rxjs';
import { getchannelname } from 'src/app/shared/store/Reducer/selector/counter.selector';

@Component({
  selector: 'app-customcounter',
  templateUrl: './customcounter.component.html',
  styleUrls: ['./customcounter.component.css']
})
export class CustomcounterComponent implements OnInit {

  constructor(private store: Store<{counter:counterModel}>){
  }

  counterInput!:number;
  actionType='add';
  channelname= '';
  counterSubscription!: Subscription

  ngOnInit(): void {
    this.counterSubscription = this.store.select(getchannelname).subscribe(data=>{
      this.channelname = data;
      console.log('Custom Counter');
    });
  }

  onIncrement(){
    this.store.dispatch(customincrement({ value: + this.counterInput, action: this.actionType }))
  }

}
