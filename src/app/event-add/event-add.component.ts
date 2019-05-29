import { Component, OnInit, Input } from '@angular/core';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-event-add',
  templateUrl: './event-add.component.html',
  styleUrls: ['./event-add.component.css']
})
export class EventAddComponent implements OnInit {
  

  model: NgbDateStruct;
  date: {year: number, month: number, day:number};
  eventData : {title:string, description:string, year:number, month:number, dayOfMonth:number, location:string };
  

  constructor(public rest:RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.eventData = {title:'', description:'', year:0, month:0, dayOfMonth:0, location:'' };
  }

  addEvent() {
    if ((this.eventData.title == '') || (this.eventData.description =='') || (this.model.year == 0) || (this.model.month == 0) || (this.model.day == 0)){
      alert('Harap isi form dengan lengkap')
    } else {
      this.rest.addEvent({ title:this.eventData.title, description:this.eventData.description, year:this.model.year, month:this.model.month, dayOfMonth:this.model.day, location:this.eventData.location }).subscribe((result) => {
        this.router.navigate(['/home/']);
      }, (err) => {
        console.log(err);
      });
    }
  }

  

}
