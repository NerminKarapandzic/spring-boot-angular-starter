import {Component, OnInit} from '@angular/core';
import {AppError, SnackbarService} from "../../services/layout/snackbar.service";

@Component({
  selector: 'app-event-snackbar',
  templateUrl: './event-snackbar.component.html',
  styleUrls: ['./event-snackbar.component.scss']
})
export class EventSnackbarComponent implements OnInit{

  errors: Map<number, AppError> = new Map<number, AppError>();
  constructor(
    private snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
    this.snackbarService.errors.subscribe(errors => {
      this.errors = errors
    })
  }

  dismissError(index: number) {
    this.snackbarService.removeError(index);
  }

}
