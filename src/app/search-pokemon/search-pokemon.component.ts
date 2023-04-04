import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilityService } from 'src/services/utility.service';

@Component({
  selector: 'app-search-pokemon',
  templateUrl: './search-pokemon.component.html',
  styleUrls: ['./search-pokemon.component.scss']
})
export class SearchPokemonComponent implements OnInit {

  isSuggesting:boolean=false;
  suggestions:{name:string|undefined}[]=[];

  constructor(private router: Router, private utility: UtilityService) { }

  ngOnInit(): void {
  }

  searchPokemon($event: Event) {
    //do some debounce stuff here whilst typing to call giveSuggestions()
  }

  giveSuggestions(){
    //return an array of navigable pokemon data
    return this.suggestions;
  }

  navigateDetail(str: string|undefined, pokemonData:Object) {
    this.utility.setPokemon(pokemonData);
    this.router.navigate([str]);
  }


}
