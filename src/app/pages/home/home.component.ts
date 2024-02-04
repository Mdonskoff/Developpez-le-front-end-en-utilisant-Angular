import { Component, OnInit } from '@angular/core';
import { Observable, of, take, tap } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { OlympicCountry } from 'src/app/core/models/Olympic';
import { LegendPosition } from '@swimlane/ngx-charts';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit {
  public olympics$: Observable<OlympicCountry[]> = of();

  olympicArray!: Object[];
  totalMedals: number = 0;

  numberOfJOs: number = 0;
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

  /*customTooltipTemplate(tooltipItem: any): string {
    return `<span style="color: white;">${tooltipItem.data.name}: ${tooltipItem.data.value}</span>`;
  }*/

  constructor(private olympicService: OlympicService, private router : Router) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics().pipe(  //appeler getOlympics du service
      tap((dataCountry : OlympicCountry[]) => {    
          let tempOlympicArray: Object[] = [] //tableau temporaire avec le nom des pays et des médailles (fichier json de la doc)
        dataCountry.forEach(data => {
          this.totalMedals = 0 //compter le nbr de médailles à chaque participation
          if (this.numberOfJOs < data.participations.length) {
            this.numberOfJOs = data.participations.length
          }
          data.participations.forEach(participation => { //boucle sur participation d'un pays
            this.totalMedals = this.totalMedals + participation.medalsCount  //add toutes les médailles de chaque participation
          })
          let infoCountry: {name: string, value: number} = {name: data.country, value: this.totalMedals} //formater les données pour avoir pays + nbr de médailles
          tempOlympicArray.push(infoCountry) //qui sont mises dans le tableau temporaire
        })
      this.olympicArray = tempOlympicArray //le tableau olympic reçoit le tableau temporaire pour qu'il soit rempli une fois
      }),
    );
  }

  onResize(event : Event): void {
    const target = event.target as Window
    const width = target.innerWidth
    this.view = [width , 400 ]
  }

  onSelect(countryName: {name: string}): void {  //au click on va dans l'autre URL du pays sélectionné
    this.router.navigateByUrl(`/detail/${countryName.name}`)
  }
}
