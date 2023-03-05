import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
})
export class HeroDetailComponent {

  hero: Hero | undefined;

  //inject the ActivatedRoute, HeroService, and Location services into the constructor, saving their values in private fields:
  //The ActivatedRoute holds information about the route to this instance of the HeroDetailComponent. This component is interested in the route's parameters extracted from the URL. The "id" parameter is the id of the hero to display.
  //The HeroService gets hero data from the remote server and this component uses it to get the hero-to-display.
  //The location is an Angular service for interacting with the browser. This service lets you navigate back to the previous view.
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}

  //inside ngOnInit call getHero
  ngOnInit(): void {
    this.getHero();
  }

  //define getHero
  getHero(): void {
    //The route.snapshot is a static image of the route information shortly after the component was created.
    //The paramMap is a dictionary of route parameter values extracted from the URL. The "id" key returns the id of the hero to fetch.
    //Route parameters are always strings. The JavaScript Number function converts the string to a number, which is what a hero id should be.
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.heroService.getHero(id).subscribe((hero) => (this.hero = hero));
  }

  //with the decorator input, any time the user clicks on a hero on the HeroesComponent it sends that hero to display to the HeroDetailComponent
  //the @Input decorator to make the hero property available for binding by the external HeroesComponent.
  //@Input() hero?: Hero;

  //Add a goBack() method to the component class that navigates backward one step in the browser's history stack using the Location service that you used to inject.
  goBack(): void {
    this.location.back();
  }

  //add the save() method, which persists hero name changes using the hero service updateHero() method and then navigates back to the previous view.
  save(): void {
    if (this.hero) {
      this.heroService.updateHero(this.hero).subscribe(() => this.goBack());
    }
  }
}
