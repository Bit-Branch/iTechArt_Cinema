import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MovieSession } from '@core/models/movie-session';

const onlyNumbersPattern = /^[0-9]*$/;

@Component({
  selector: 'app-create-movie-session',
  templateUrl: './create-movie-session.component.html',
  styleUrls: ['./create-movie-session.component.scss']
})
export class CreateMovieSessionComponent {
  fileName = '';
  sessionForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder
  ) {
    this.sessionForm = this.fb.group({
      movie: [null, Validators.required],
      cinema: [null, Validators.required],
      hall: [null, Validators.required],
      showDateTime: [null, Validators.required],
      ticketPrice: [null,[Validators.required, Validators.pattern(onlyNumbersPattern)]]
    });
  }

  onSubmit(): void {
    const session: MovieSession = {
      cinema: this.sessionForm.get('cinema')?.value as string,
      hall: this.sessionForm.get('hall')?.value as string,
      movie: this.sessionForm.get('movie')?.value as string,
      seatTypes: [],
      services: [],
      showDateTime: this.sessionForm.get('showDateTime')?.value as Date,
      ticketPrice: this.sessionForm.get('ticketPrice')?.value as number
    };

    console.log(session);
  }

  addService(): void {
    console.log('added');
  }
}
