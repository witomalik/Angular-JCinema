import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  event:any;
  tickets:any = [];
  eventId:any;

  constructor(public rest:RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.rest.getEvent(this.route.snapshot.params['id']).subscribe((data: {}) => {
      console.log(data);
      this.event = data;
    });
    this.getTickets();
  }

  getTickets() {
    this.tickets = [];
    this.rest.getTickets(this.route.snapshot.params['id']).subscribe((data: {}) => {
      console.log(data);
      if (!data[0]){
        this.tickets = [];
        alert("Tiket belum tersedia")
      } else {
        this.tickets = data;

      }
      
    });
  }

  removeEvent() {
    this.rest.removeEvent({ id : this.event.id}).subscribe((result) => {
      console.log(result);
      this.router.navigate(['/home/']);
    }, (err) => {
      console.log(err);
    });
  }
}
