import { Component, ElementRef, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subscribable } from 'rxjs';
import { UtilityService } from 'src/services/utility.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  kanto: Observable<{results:any}|any> | undefined;
  generation:number=151;
  httpOptions: { headers: HttpHeaders; };
    
  constructor(private httpClient: HttpClient) {
      this.httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
      };
    }
    
    ngOnInit(): void {
      this.kanto = this.httpClient
      .get(`https://pokeapi.co/api/v2/pokemon?limit=${this.generation}&offset=0`);
    }
    
    
    pad(arg: number) {
      var str = "" + arg
      var pad = "000"
      var ans = pad.substring(0, pad.length - str.length) + str
      return ans;
    }
                     
  }
  