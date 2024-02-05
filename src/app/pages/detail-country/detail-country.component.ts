import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, tap } from 'rxjs';
import { OlympicCountry } from 'src/app/core/models/Olympic';
import { Participation } from 'src/app/core/models/Participation';
import { ErrorService } from 'src/app/core/services/error.service';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-detail-country',
  templateUrl: './detail-country.component.html',
  styleUrl: './detail-country.component.scss'
})
export class DetailCountryComponent implements OnInit, OnDestroy {

  errorMessage!: string;
  
  detailCountry!: OlympicCountry;

  infoCountryArray: Array<{name : string, series: Array<Object>}> = [];

  seriesArray: Array<{name : string, value: number}> = [];

  numberOfAtheletes: number = 0;
  numberOfMedals: number = 0;
  numberOfEntries: number = 0;

  olympics$!: Subscription //variable d'observable

  view: number[] = [700, 300];

  // options
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Year';
  yAxisLabel: string = 'Medals';
  timeline: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  constructor (private router: Router, private routes: ActivatedRoute, private olympicService: OlympicService) {}
  ngOnDestroy(): void {
    this.olympics$.unsubscribe()
  }
  
  
  ngOnInit(): void {
    let country: string = this.routes.snapshot.paramMap.get("name")! //On récupère le nom du pays dans l'URL qui a la variable "name"
    this.olympics$ = this.olympicService.getOlympics().pipe( //On régupère les infos générales de tous les pays de notre fichier json
      tap(olympicArray => { //parcourir les données sans modifier le flux
        this.getDetailCountry(country, olympicArray)!
      })
    ).subscribe({
      error : () => {
        this.errorMessage = "An error occurred please try again"
      }
    });
  }

  getDetailCountry(country: string, olympicArray: OlympicCountry[]) { //Pour avoir le détail du pays qu'on a sélectionné
    olympicArray.forEach((olympicCountry: OlympicCountry) => { //boucle sur le tableau des pays 
      if (olympicCountry.country == country) { //condition qui recherche le pays sélectionné pour la stocker ensuite dans la variable si la condition est remplie
        this.detailCountry = olympicCountry
        this.formatCountryData();
      }
        
    })    
  }
  formatCountryData() {
    this.detailCountry.participations.forEach((participation: Participation) => {
      this.seriesArray.push({name: participation.year.toString(), value: participation.medalsCount})
      this.numberOfMedals = this.numberOfMedals + participation.medalsCount
      this.numberOfAtheletes = this.numberOfAtheletes + participation.athleteCount
    })
    this.numberOfEntries = this.detailCountry.participations.length
    this.infoCountryArray.push({name: this.detailCountry.country, series: this.seriesArray})
  }

  onResize(event : Event): void {
    const target = event.target as Window
    const width = target.innerWidth
    this.view = [width , 400 ]
  }
  
  onClick(){
    this.router.navigateByUrl("")
  }
}
