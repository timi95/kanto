import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Route, Router } from '@angular/router';
import { filter, Observable } from 'rxjs';
import { UtilityService } from 'src/services/utility.service';
import { browserRefresh } from '../app.component';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit {

  data:{ url: string, imageUrl: string }={
    url:'',
    imageUrl:''
  };
  details:any | undefined;
  browserRefresh: boolean | undefined;
  types:any[]=[];
  constructor( 
    private httpClient: HttpClient,
    private utility: UtilityService ) { }

  ngOnInit(): void {
    this.browserRefresh = browserRefresh;
    if(this.browserRefresh) {//on browser refresh
      this.data=JSON.parse(
       window.localStorage.getItem('pokemonUrlData') as string
     );
     this.details=JSON.parse(
      window.localStorage.getItem('pokemonDetails') as string
     );
     this.details?.types.forEach((_t: any)=>{
      this.types.push(_t);
    })
     console.log(this.types, ' - types');
    } else { //initial setup
      this.data=this.utility.Pokemon;
      this.httpClient.get(this.data.url)
      .subscribe(resp=>{
        window.localStorage.setItem('pokemonDetails',JSON.stringify(resp))
        window.localStorage.setItem('pokemonUrlData',JSON.stringify(this.data))
        this.details=resp;
      });
      this.details?.types.forEach((_t: any)=>{
        this.types.push(_t);
      })
      console.log(this.types, ' - types');
      
    }      
    
  }

}
