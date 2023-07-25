import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { concatMap, debounceTime, distinctUntilChanged, filter, from, fromEvent, map, of, take, takeUntil, tap } from 'rxjs';
import { UtilityService } from 'src/services/utility.service';

@Component({
  selector: 'app-search-pokemon',
  templateUrl: './search-pokemon.component.html',
  styleUrls: ['./search-pokemon.component.scss']
})
export class SearchPokemonComponent implements OnInit, AfterViewInit {

  isSuggesting:boolean=false;
  suggestions:any[]=[];
  @ViewChild('input', { static: true })
  input!: ElementRef;

  constructor(
    private httpClient: HttpClient,
    private router: Router, private utility: UtilityService) { }

  ngAfterViewInit(): void {
    fromEvent(this.input.nativeElement,'keyup')
            .pipe(
                debounceTime(1100),
                distinctUntilChanged()
                ).subscribe(()=>{
              this.giveSuggestions((this.input.nativeElement.value as string).toLowerCase())
            });
  }

  ngOnInit(): void {
  }

  searchPokemon($event: Event) {
    //do some debounce stuff here whilst typing to call giveSuggestions()
    console.log("This is the event =>",$event);
    
  }

  giveSuggestions(value?:string){
    this.suggestions=[] // always start with empty suggestions
    let kanto=of(JSON.parse(
      window.localStorage.getItem('kanto') as string ));
    let kantoList: {name:string|undefined}[]=[];
    kanto.subscribe(resp=>{      
      resp.results.forEach((element: any) => {       
        kantoList.push(element)
      });
    })

    if(!!(this.input.nativeElement.value as string))
     { this.isSuggesting=true }
    else
     { this.isSuggesting=false }

      if(!!value){
        of(...kantoList)
        .pipe(
          filter(pkmn=> (pkmn.name as string).includes(value)),
          take(5)
        )
        .subscribe(data =>{this.suggestions.push(data)})
      }
    //return an array of navigable pokemon data
    return this.suggestions;
  }

  evaluatedNavString(url:string){
    return `/pokemon/${this.xtract(url)}`
  }

  navigateDetail(str: string|undefined, pokemonData:any) {
    this.utility.setPokemon(pokemonData);
    this.httpClient.get(pokemonData.url)
    .subscribe(resp=>{
      window.localStorage.setItem('pokemonDetails',JSON.stringify(resp))
      window.localStorage.setItem('pokemonUrlData',JSON.stringify(pokemonData))
      window.location.reload();//I know I shouldn't do this
    });
    this.router.navigate([str]);
  }
  pad(arg: string) {
    var str = "" + (arg as unknown as number)
    var pad = "000"
    var ans = pad.substring(0, pad.length - str.length) + str
    return ans;
  }
  xtract(url:string){
    let result = url
    .replace("https://pokeapi.co/api/v2/pokemon/","")
    .replace("/","")
    // .split("https://pokeapi.co/api/v2/pokemon/150/")
    return result
  }

}
