import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, of, take, tap } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { OlympicCountry } from 'src/app/core/models/Olympic';
import { LegendPosition } from '@swimlane/ngx-charts';
import { Router } from '@angular/router';
import { ErrorService } from 'src/app/core/services/error.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit, OnDestroy {
  public olympics$: Observable<OlympicCountry[]> = of();

  olympicsObs$!: Subscription

  olympicArray!: Object[];
  totalMedals: number = 0;

  numberOfJOs!: number;
  numberOfCountry: number = 0;
  
  
  view: number[] = [700, 400];

  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: LegendPosition = LegendPosition.Below;
  

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
    
  customTooltipText(medal: {data : {name : string, value : number}}): string {
        return `${medal.data.name}<br>&#x1F3C5;${medal.data.value}`
    }

  constructor(private olympicService: OlympicService, private router : Router) {}
  
  ngOnDestroy(): void {
    this.olympicsObs$.unsubscribe();
  }

  ngOnInit(): void {
    this.view = [window.innerWidth, 400]
    this.olympics$ = this.olympicService.getOlympics() //appeler getOlympics du service
    this.olympicsObs$ = this.olympics$.pipe(  
      tap((dataCountry : OlympicCountry[]) => {    
        this.olympicArray = []
      dataCountry.forEach(data => {
          this.numberOfJOs = 0
          this.totalMedals = 0 //compter le nbr de médailles à chaque participation
          if (this.numberOfJOs < data.participations.length) {
            this.numberOfJOs = data.participations.length
          }
          data.participations.forEach(participation => { //boucle sur participation d'un pays
            this.totalMedals = this.totalMedals + participation.medalsCount  //add toutes les médailles de chaque participation
          })
          let infoCountry: {name: string, value: number} = {name: data.country, value: this.totalMedals} //formater les données pour avoir pays + nbr de médailles
          this.olympicArray.push(infoCountry)          
        })
      })
    ).subscribe();    
  }

  onResize(event : Event): void {  //pour le responsive
    const target = event.target as Window
    const width = target.innerWidth
    this.view = [width , 400 ]
  }

  onSelect(countryName: {name: string}): void {  //au click on va dans l'autre URL du pays sélectionné
    this.router.navigateByUrl(`/detail/${countryName.name}`)
  }
}
