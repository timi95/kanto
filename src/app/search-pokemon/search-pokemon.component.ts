import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, filter, fromEvent, tap } from 'rxjs';
import { UtilityService } from 'src/services/utility.service';

@Component({
  selector: 'app-search-pokemon',
  templateUrl: './search-pokemon.component.html',
  styleUrls: ['./search-pokemon.component.scss']
})
export class SearchPokemonComponent implements OnInit, AfterViewInit {

  isSuggesting:boolean=false;
  suggestions:{name:string|undefined}[]=[];
  @ViewChild('input', { static: true })
  input!: ElementRef;

  constructor(private router: Router, private utility: UtilityService) { }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    fromEvent(this.input.nativeElement,'keyup')
            .pipe(
                filter(Boolean),
                debounceTime(1500),
                distinctUntilChanged()
                )
            .subscribe(()=>console.log(this.input.nativeElement.value));
  }

  ngOnInit(): void {
  }

  searchPokemon($event: Event) {
    //do some debounce stuff here whilst typing to call giveSuggestions()
    console.log("This is the event =>",$event);
    
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
