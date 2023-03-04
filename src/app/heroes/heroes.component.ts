import { Component } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent {
  //Add a private heroService parameter of type HeroService to the constructor.
  //The parameter simultaneously defines a private heroService property and identifies it as a HeroService injection site.
  //When Angular creates a HeroesComponent, the Dependency Injection system sets the heroService parameter to the singleton instance of HeroService.
  constructor(private heroService: HeroService, private messageService: MessageService) {}

  //Create a method to retrieve the heroes from the service.
  //waits for the Observable to emit the array of heroes, which could happen now or several minutes from now. The subscribe() method passes the emitted array to the callback, which sets the component's heroes property.
  //This asynchronous approach works when the HeroService requests heroes from the server.
  getHeroes(): void {
    this.heroService.getHeroes().subscribe((heroes) => (this.heroes = heroes));
  }

  //call getHeroes() inside the ngOnInit lifecycle hook and let Angular call ngOnInit() at an appropriate time after constructing a HeroesComponent instance.
  ngOnInit(): void {
    this.getHeroes();
  }

  //after importing HeroService
  heroes: Hero[] = [];

  //set a property of type Hero, Hero is an interface created and imported into this component
  //selectedHero?: Hero;

  //event handler - when the user clicks on a hero this method is called and assigns the value hero (the clicked hero on the template) to the property selected hero
  //onSelect(hero: Hero) {
  //  this.selectedHero = hero;
  //  this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
  //}
}
