import { Injectable } from '@angular/core';
import { Hero } from './hero';
//import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//Import the catchError symbol from rxjs/operators, along with some other operators to use later.
import { catchError, map, tap } from 'rxjs';

//This marks the class as one that participates in the dependency injection system.
//The HeroService class is going to provide an injectable service, and it can also have its own injected dependencies.
@Injectable({
  providedIn: 'root',
})
export class HeroService {
  //Edit the constructor with a parameter that declares a private messageService property. Angular injects the singleton MessageService into that property when it creates the HeroService.
  //This is an example of a typical service-in-service scenario in which you inject the MessageService into the HeroService which is injected into the HeroesComponent.
  //inject HttpClient
  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) {}

  //Notice that you keep injecting the MessageService but since your application calls it so frequently, wrap it in a private log() method:
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  //Add a getHeroes method to return the mock heroes.
  //of(HEROES) returns an Observable<Hero[]> that emits a single value, the array of mock heroes.
  //Observable<Hero[]> that emits a single value, an array of heroes from the body of the HTTP response.
  getHeroes(): Observable<Hero[]> {
    //const heroes = of(HEROES);
    //send a message when the heroes are fetched.
    //this.messageService.add('HeroService: fetched heroes');
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap((_) => this.log('fetched heroes')),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );
  }

  /** GET hero by id. Return `undefined` when id not found */
  getHeroNo404<Data>(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/?id=${id}`;
    return this.http.get<Hero[]>(url)
      .pipe(
        map(heroes => heroes[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? 'fetched' : 'did not find';
          this.log(`${outcome} hero id=${id}`);
        }),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
  }

  

  getHero(id: number): Observable<Hero> {
    //const hero = HEROES.find(h => h.id === id)!;
    //this.messageService.add(`HeroService: fetched hero id=${id}`);
    //return of(hero);
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap((_) => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id= ${id}`))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      //// TODO: send the error to remote logging infrastructure
      console.error(error); //log to console instead

      //TODO: better job of transforming error for user consuption
      this.log(`${operation} failed: ${error.message}`);

      //let the app keep running by returning an empty result
      return of(result as T);
    };
  }

  

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  /** PUT: update the hero on the server */
  updateHero(hero: Hero): Observable<any> {
    //The HttpClient.put() method takes three parameters: the URL, the data to update, options
    //the heroes web API expects a special header in HTTP save requests. That header is in the httpOptions constant defined in the HeroService
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((_) => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  /** POST: add a new hero to the server */
  //addHero() differs from updateHero() in two ways:
  //It calls HttpClient.post() instead of put()
  //it expects the server to create an id for the new hero, which it returns in the Observable<Hero> to the caller
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w id=${newHero.id}`)),
      catchError(this.handleError<Hero>(`addHero`))
    );
  }

  //add deleteHero()
  /** DELETE: delete the hero from the server */
  //deleteHero() calls HttpClient.delete()
  //the URL is the heroes resource url plus the id of the hero to delete
  //we don't send data as we did with put() and post()
  //we still send the httpOptions
  //If we neglect to subscribe(), the service can't send the delete request to the server. As a rule, an Observable does nothing until something subscribes.
  deleteHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap((_) => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  //adding a searchHeroes() method 
  /* GET heroes whose name contains search term */
  //The method returns immediately with an empty array if there is no search term. The rest of it closely resembles getHeroes(), the only significant difference being the URL, which includes a query string with the search term.
  searchHeroes(term: string): Observable<Hero[]> {
    if(!term.trim()) {
      //if not search term, return empty hero array
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(tap(x=>x.length ? this.log(`found heroes matching "${term}"`) : this.log(`no heroes matching "${term}"`)), catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }

  //Define the heroesUrl of the form :base/:collectionName with the address of the heroes resource on the server. Here base is the resource to which requests are made, and collectionName is the heroes data object in the in-memory-data-service.ts.
  private heroesUrl = 'api/heroes';
}
