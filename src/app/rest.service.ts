import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

const endpoint = 'http://localhost:8080/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class RestService {

  private loggedInStatus = JSON.parse(localStorage.getItem('loggedIn') || 'false');

  constructor(private http: HttpClient) {}

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  getEvents(): Observable<any> {
    return this.http.get(endpoint + 'event').pipe(
      map(this.extractData));
  }

  getEvent(id): Observable<any> {
    return this.http.get(endpoint + 'event/' + id).pipe(
      map(this.extractData));
  }

  addEvent (event): Observable<any> {
    console.log(event);
    return this.http.post<any>(endpoint + 'createevent', JSON.stringify(event), httpOptions).pipe(
      tap((event) => console.log(`event added w/ id=${event.id}`)),
      catchError(this.handleError<any>('addEvent'))
    );
  }

  removeEvent (id): Observable<any> {
    console.log(id);
    return this.http.post<any>(endpoint + 'deleteevent', JSON.stringify(id), httpOptions).pipe(
      tap((event) => console.log(`event deleted w/ id=${id}`)),
      catchError(this.handleError<any>('addEvent'))
    );
  }

  deleteEvent (id): Observable<any> {
    return this.http.delete<any>(endpoint + 'delevent' + id, httpOptions).pipe(
      tap(_ => console.log(`deleted product id=${id}`)),
      catchError(this.handleError<any>('deleteProduct'))
    );
  }

  register (userData): Observable<any> {
    console.log(userData);
    return this.http.post<any>(endpoint + 'registercustomer', JSON.stringify(userData), httpOptions).pipe(
      tap((product) => console.log(`user registered w/ id=${product.id}`)),
      catchError(this.handleError<any>('register'))
    );
  }

  getCustomer(id): Observable<any> {
    return this.http.get(endpoint + 'getcustomer/' + id).pipe(
      map(this.extractData));
  }

  getCustomers(): Observable<any> {
    return this.http.get(endpoint + 'customers').pipe(
      map(this.extractData));
  }

  userLogin (user): Observable<any> {
    console.log(user);
    return this.http.post<any>(endpoint + 'logincust', JSON.stringify(user), httpOptions).pipe(
      tap((user) => console.log(`Logged in W/ id=${user.id}`)),
      catchError(this.handleError<any>('userLogin'))
    );
  }

  getInvoice(id): Observable<any> {
    return this.http.get(endpoint + 'invoice/' + id).pipe(
      map(this.extractData));
  }

  addInvoice (invoice): Observable<any> {
    console.log(invoice);
    return this.http.post<any>(endpoint + 'createinvoicepaid', JSON.stringify(invoice), httpOptions).pipe(
      tap((invoice) => console.log(`event added w/ id=${invoice.id}`)),
      catchError(this.handleError<any>('addInvoice'))
    );
  }

  getTickets(id): Observable<any> {
    return this.http.get(endpoint + 'ticketfromevent/' + id).pipe(
      map(this.extractData));
  }

  getTicket(id): Observable<any> {
    return this.http.get(endpoint + 'ticket/' + id).pipe(
      map(this.extractData));
  }

  addTicket (ticket): Observable<any> {
    console.log(ticket);
    return this.http.post<any>(endpoint + 'createticket', JSON.stringify(ticket), httpOptions).pipe(
      tap((invoice) => console.log(`ticket added w/ id=${ticket.id}`)),
      catchError(this.handleError<any>('addTIcket'))
    );
  }

  updateProduct (id, product): Observable<any> {
    return this.http.put(endpoint + 'products/' + id, JSON.stringify(product), httpOptions).pipe(
      tap(_ => console.log(`updated product id=${id}`)),
      catchError(this.handleError<any>('updateProduct'))
    );
  }

  deleteProduct (id): Observable<any> {
    return this.http.delete<any>(endpoint + 'products/' + id, httpOptions).pipe(
      tap(_ => console.log(`deleted product id=${id}`)),
      catchError(this.handleError<any>('deleteProduct'))
    );
  }

  setLoggedIn(value: boolean){
    if (value){
      localStorage.setItem('loggedIn', 'true');
    } else {
      localStorage.setItem('loggedIn', 'false');
    }
  }

  get isLoggedIn(){
    return JSON.parse(localStorage.getItem('loggedIn') || this.loggedInStatus.toString());
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
