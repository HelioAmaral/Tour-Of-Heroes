import { Injectable } from '@angular/core';

//This marks the class as one that participates in the dependency injection system.
//The HeroService class is going to provide an injectable service, and it can also have its own injected dependencies.
@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor() { }
}
