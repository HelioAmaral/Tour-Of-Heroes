import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
//import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent {

  heroes: Hero[] = [];
  //Add a private heroService parameter of type HeroService to the constructor.
  //The parameter simultaneously defines a private heroService property and identifies it as a HeroService injection site.
  //When Angular creates a HeroesComponent, the Dependency Injection system sets the heroService parameter to the singleton instance of HeroService.
  constructor(private heroService: HeroService) {}

  
  //call getHeroes() inside the ngOnInit lifecycle hook and let Angular call ngOnInit() at an appropriate time after constructing a HeroesComponent instance.
  ngOnInit(): void {
    this.getHeroes();
  }

  //Create a method to retrieve the heroes from the service.
  //waits for the Observable to emit the array of heroes, which could happen now or several minutes from now. The subscribe() method passes the emitted array to the callback, which sets the component's heroes property.
  //This asynchronous approach works when the HeroService requests heroes from the server.
  getHeroes(): void {
    this.heroService.getHeroes().subscribe((heroes) => (this.heroes = heroes));
  }


  //after importing HeroService
  //heroes: Hero[] = [];

  //set a property of type Hero, Hero is an interface created and imported into this component
  //selectedHero?: Hero;

  //event handler - when the user clicks on a hero this method is called and assigns the value hero (the clicked hero on the template) to the property selected hero
  //onSelect(hero: Hero) {
  //  this.selectedHero = hero;
  //  this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
  //}

  //In response to a click event, call the component's click handler, add(), and then clear the input field so that it's ready for another name
  //When the given name isn't blank, the handler creates an object based on the hero's name. The handler passes the object name to the service's addHero() method.
  //When addHero() creates a new object, the subscribe() callback receives the new hero and pushes it into to the heroes list for display.
  add(name: string): void {
    name = name.trim();
    if(!name) {
      return;
    }
    this.heroService.addHero({name} as Hero).subscribe((hero) => {
      this.heroes.push(hero);
    });
  }

  //delete() handler
  //Although the component delegates hero deletion to the HeroService, it remains responsible for updating its own list of heroes. The component's delete() method immediately removes the hero-to-delete from that list, anticipating that the HeroService succeeds on the server.
  //There's really nothing for the component to do with the Observable returned by heroService.deleteHero() but it must subscribe anyway.
  //add a deleteHero() method to HeroService
  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }
}
