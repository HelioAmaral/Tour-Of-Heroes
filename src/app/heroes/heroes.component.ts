import { Component } from '@angular/core';
import { Hero } from '../hero';
import { HEROES } from '../mock-heroes';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent {

  //after importing HEROES (array of mock data on different heroes) we set a property heroes and assign its value to HEROES
heroes = HEROES;

//set a property of type Hero, Hero is an interface created and imported into this component
selectedHero?: Hero;


//event handler - when the user clicks on a hero this method is called and assigns the value hero (the clicked hero on the template) to the property selected hero
onSelect(hero: Hero){
this.selectedHero = hero;
}
}
