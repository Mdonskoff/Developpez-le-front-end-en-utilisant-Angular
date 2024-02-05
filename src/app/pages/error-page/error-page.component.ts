import { Component, OnInit } from '@angular/core';
import { ErrorService } from 'src/app/core/services/error.service';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrl: './error-page.component.scss'
})
export class ErrorPageComponent implements OnInit {

errorMessage!: string  

constructor(private errorService: ErrorService) {} 

  ngOnInit(): void {
    this.errorMessage = this.errorService.getMessage();
  }
}
