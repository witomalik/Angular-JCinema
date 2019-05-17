import { Component, OnInit, Input } from '@angular/core';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-event-add',
  templateUrl: './event-add.component.html',
  styleUrls: ['./event-add.component.css']
})
export class EventAddComponent implements OnInit {

  @Input() eventData = { title:'', year: 0, month: 0, dayOfMonth: 0 };

  constructor(public rest:RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  }

  addEvent() {
    this.rest.addEvent(this.eventData).subscribe((result) => {
      this.router.navigate(['/products/']);
    }, (err) => {
      console.log(err);
    });
  }

}
