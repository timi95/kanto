import { Component, ElementRef, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subscribable } from 'rxjs';
import { UtilityService } from 'src/services/utility.service';
import { Router } from '@angular/router';
import { browserRefresh } from '../app.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  kanto: Observable<{results:any}|any> | undefined;
  generation:number=151;
  httpOptions: { headers: HttpHeaders; };
  browserRefresh: boolean | undefined;
    
  constructor(private httpClient: HttpClient, private router: Router, private utility: UtilityService) {
    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
  }
  
  ngOnInit(): void {
    this.browserRefresh = browserRefresh;
    this.kanto = this.httpClient
    .get(`https://pokeapi.co/api/v2/pokemon?limit=${this.generation}&offset=0`);

    //on browser refresh
    if(this.browserRefresh 
      && window.localStorage.getItem('kanto') as string) {
      this.kanto=of(JSON.parse(
        window.localStorage.getItem('kanto') as string ));
      } else {
      this.kanto
      .subscribe(resp=>{ 
        window.localStorage.setItem('kanto',JSON.stringify(resp))})
      }
  }
  
  
  pad(arg: number) {
      var str = "" + arg
      var pad = "000"
      var ans = pad.substring(0, pad.length - str.length) + str
      return ans;
    }
    
    navigateDetail(str: string, pokemonData:Object) {
      this.utility.setPokemon(pokemonData);
      this.router.navigate([str]);
    }
  }
  