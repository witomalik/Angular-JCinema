import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EventComponent } from './event/event.component';
import { EventAddComponent } from './event-add/event-add.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { TicketAddComponent } from './ticket-add/ticket-add.component'

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    data: { title: 'Home Page' }
  },
  {
    path: 'event/:id',
    component: EventComponent,
    data: { title: 'Event Page' }
  },
  {
    path: 'event-add',
    component: EventAddComponent,
    data: { title: 'Add Event Page' }
  },
  {
    path: 'invoice/:id',
    component: InvoiceComponent,
    data: { title: 'Testing' }
  },
  {
    path: 'ticket-add',
    component: TicketAddComponent,
    data: { title: 'Add Ticket Page' }
  },
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
