import { Component, Input } from '@angular/core';
import { Hero } from '../hero';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent {

  //with the decorator input, any time the user clicks on a hero on the HeroesComponent it sends that hero to display to the HeroDetailComponent
  //the @Input decorator to make the hero property available for binding by the external HeroesComponent.
  @Input() hero?: Hero;
}
