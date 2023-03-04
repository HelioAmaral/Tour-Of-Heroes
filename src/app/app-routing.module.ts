import { NgModule } from '@angular/core';
//the app-routing.module.ts file imports RouterModule and Routes so the application can have routing capability. 
import { RouterModule, Routes } from '@angular/router';

//import, HeroesComponent, gives the Router somewhere to go once you configure the routes.
import { HeroesComponent } from './heroes/heroes.component';

//Import the DashboardComponent
import { DashboardComponent } from './dashboard/dashboard.component';

//import HeroDetailComponent
import { HeroDetailComponent } from './hero-detail/hero-detail.component';

//Routes tell the Router which view to display when a user clicks a link or pastes a URL into the browser address bar.
//path ->	A string that matches the URL in the browser address bar.
//component ->	The component that the router should create when navigating to this route.
//This tells the router to match that URL to path: 'heroes' and display the HeroesComponent when the URL is something like localhost:4200/heroes.
const routes: Routes = [
  { path: 'heroes', component: HeroesComponent },
  //Add a route to the routes array that matches a path to the DashboardComponent.
  { path: 'dashboard', component: DashboardComponent},
  //add a default route To make the application navigate to the dashboard automatically
  //This route redirects a URL that fully matches the empty path to the route whose path is '/dashboard'.
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  //add a parameterized route to the routes array that matches the path pattern to the hero detail view
  //The colon : character in the path indicates that :id is a placeholder for a specific hero id.
  {path: 'detail/:id', component: HeroDetailComponent}
];


//The @NgModule metadata initializes the router and starts it listening for browser location changes.
@NgModule({
  declarations: [],
  //The following line adds the RouterModule to the AppRoutingModule imports array and configures it with the routes in one step by calling RouterModule.forRoot():
  //The method is called forRoot() because you configure the router at the application's root level. The forRoot() method supplies the service providers and directives needed for routing, and performs the initial navigation based on the current browser URL.
  imports: [RouterModule.forRoot(routes)],
  //AppRoutingModule exports RouterModule to be available throughout the application.
  exports: [RouterModule]
})
export class AppRoutingModule { }
