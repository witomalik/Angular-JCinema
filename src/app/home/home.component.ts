import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import 'hammerjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  events:any = [];

  constructor(public rest:RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.getEvents();
  }

  getEvents() {
    this.events = [];
    this.rest.getEvents().subscribe((data: {}) => {
      console.log(data);
      this.events = data;
    });
  }

  add() {
    this.router.navigate(['/']);
  }

  logOut(){
    this.rest.setLoggedIn(false);
    this.router.navigate(['/log-in/']);
  }

}


