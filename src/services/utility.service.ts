import { ElementRef, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  
  private currentPokemon = new BehaviorSubject<any|null>(null);
  constructor() {}
 
  public setPokemon(data:any){
    this.currentPokemon.next(data);
  }
  public get Pokemon(){
    return this.currentPokemon.getValue();
  }  
}
