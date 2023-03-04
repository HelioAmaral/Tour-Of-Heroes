import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  //the messages cache, the property, its type and initial value
  messages: string[] = [];

  //method add() a message to the cache.
  add(message: string){
    this.messages.push(message);
  }

  //method to clear the cache
  clear(){
    this.messages = [];
  }


  constructor() { }
}
