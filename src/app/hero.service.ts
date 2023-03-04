import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

//This marks the class as one that participates in the dependency injection system.
//The HeroService class is going to provide an injectable service, and it can also have its own injected dependencies.
@Injectable({
  providedIn: 'root'
})
export class HeroService {

  //Edit the constructor with a parameter that declares a private messageService property. Angular injects the singleton MessageService into that property when it creates the HeroService.
  //This is an example of a typical service-in-service scenario in which you inject the MessageService into the HeroService which is injected into the HeroesComponent.
  constructor(private messageService: MessageService) { }


  //Add a getHeroes method to return the mock heroes.
  //of(HEROES) returns an Observable<Hero[]> that emits a single value, the array of mock heroes.
  //Observable<Hero[]> that emits a single value, an array of heroes from the body of the HTTP response.
  getHeroes(): Observable<Hero[]>{
    const heroes = of(HEROES);
    //send a message when the heroes are fetched.
    this.messageService.add('HeroService: fetched heroes');
    return heroes;
  }

}
