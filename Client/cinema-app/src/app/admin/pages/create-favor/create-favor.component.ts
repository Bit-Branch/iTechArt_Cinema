import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Favor } from '@core/models/favor';
import { FavorService } from '@core/services/favor.service';
import { FileInput, FileValidator } from 'ngx-material-file-input';

//'size in mb' * 2 ** 20
const imageMaxSizeInBytes = 5 * 2 ** 20;
const nameControl = 'name';
const descriptionControl = 'description';
const imageControl = 'image';

@Component({
  selector: 'app-create-favor',
  templateUrl: './create-favor.component.html',
  styleUrls: ['./create-favor.component.scss']
})
export class CreateFavorComponent {
  favorForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly favorService: FavorService
  ) {
    this.favorForm = this.fb.group({
      image: [null, FileValidator.maxContentSize(imageMaxSizeInBytes)],
      name: [null, Validators.required],
      description: [null, Validators.required]
    });
  }

  get nameControl(): string {
    return nameControl;
  }

  get descriptionControl(): string {
    return descriptionControl;
  }

  onSubmit(): void {
    const favor: Favor = {
      name: this.favorForm.get(nameControl)?.value as string,
      image: (this.favorForm.get(imageControl)?.value as FileInput).files[0],
      description: this.favorForm.get(descriptionControl)?.value
    };
    this.favorService.createFavor(favor);
  }
}
