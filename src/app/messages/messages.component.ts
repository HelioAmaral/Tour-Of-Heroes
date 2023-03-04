import { Component } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent {

  //constructor with a parameter that declares a public messageService property. Angular injects the singleton MessageService into that property when it creates the MessagesComponent.
  //The messageService property must be public because we're going to bind to it in the template. Angular only binds to public component properties.
  constructor(public messageService: MessageService){}

}
