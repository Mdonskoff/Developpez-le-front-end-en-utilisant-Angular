import { Component, OnInit } from '@angular/core';
import { OlympicService } from './core/services/olympic.service';
import { OnDestroy } from '@angular/core';
import { Subscription, take } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {

  olympic$! : Subscription;

  constructor(private olympicService: OlympicService) {}
  ngOnDestroy(): void {
    if (this.olympic$)
    this.olympic$.unsubscribe();
  }

  ngOnInit(): void {
    this.olympicService.loadInitialData().pipe(take(1)).subscribe();
  }
}
