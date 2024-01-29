import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';
import { OlympicCountry } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { multi } from './data';

@Component({
  selector: 'app-detail-country',
  standalone: true,
  imports: [],
  templateUrl: './detail-country.component.html',
  styleUrl: './detail-country.component.scss'
})
export class DetailCountryComponent implements OnInit {
  
  detailCountry!: OlympicCountry;

  //multi: any[] | undefined;
  view: any[] = [700, 300];

  // options
  legend: boolean = true;
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

  constructor (private router: Router, private routes: ActivatedRoute, private olympicService: OlympicService) {Object.assign(this, { multi });}
  

  
  ngOnInit(): void {
    let country: string = this.routes.snapshot.paramMap.get("name")! //On récupère le nom du pays dans l'URL qui a la variable "name"
    this.olympicService.getOlympics().pipe( //On régupère les infos générales de tous les pays de notre fichier json
      tap(olympicArray => { //parcourir les données sans modifier le flux
        this.getDetailCountry(country, olympicArray)!
      })
    ).subscribe()
  }

  getDetailCountry(country: string, olympicArray: OlympicCountry[]) { //Pour avoir le détail du pays qu'on a sélectionné
    olympicArray.forEach((olympicCountry: OlympicCountry) => { //boucle sur le tableau des pays 
      if (olympicCountry.country == country) //condition qui recherche le pays sélectionné pour la stocker ensuite dans la variable si la condition est remplie
        this.detailCountry = olympicCountry
    })    
  }

}
