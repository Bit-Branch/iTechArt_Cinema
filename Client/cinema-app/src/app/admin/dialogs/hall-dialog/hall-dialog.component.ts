//External
import { combineLatest, Observable } from 'rxjs';

//Angular
import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatSelectChange } from '@angular/material/select';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

//Local
import { Seat } from '@core/models/seat/seat';
import { Hall } from '@core/models/hall/hall';
import { CreateHall } from '@core/models/hall/create-hall';
import { SeatType } from '@core/models/seat-type/seat-type';
import { SeatTypeService } from '@core/services/seat-type.service';
import { ValidationPatterns } from '@core/constants/validation-patterns';
import { generateRandomHexColorString } from '@core/utils/generate-random-hex-color-string';
import { SeatingPlanComponent } from '@admin/seating-plan/seating-plan.component';
import { SeatingPlanSharedStateService } from '@admin/seating-plan/services/seating-plan-shared-state.service';
import { CreationDialogComponent } from '@admin/dialogs/creation-dialog/creation-dialog.component';
import { AvailableSeatType } from '@admin/seating-plan/intefraces/available-seat-type';

const nameControl = 'name';
const seatsCountControl = 'seatsCount';

@Component({
  selector: 'app-hall-dialog',
  templateUrl: './hall-dialog.component.html',
  styleUrls: ['./hall-dialog.component.scss', '../dialogs-shared.scss']
})
export class HallDialogComponent implements OnInit, AfterViewInit {
  readonly hallForm: FormGroup;
  readonly availableSeatTypes$: Observable<AvailableSeatType[]>;
  seatTypes: SeatType[] = [];
  @ViewChild(SeatingPlanComponent) seatingPlan!: SeatingPlanComponent;
  private seatingPlanJson = '';
  private seats: Seat[] = [];

  constructor(
    private readonly fb: FormBuilder,
    private readonly dialog: MatDialog,
    private readonly seatTypeService: SeatTypeService,
    private readonly seatingPlanSharedStateService: SeatingPlanSharedStateService,
    private readonly dialogRef: MatDialogRef<HallDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private dialogData: Hall
  ) {
    this.hallForm = this.fb.group({
      [nameControl]: [null, Validators.required],
      [seatsCountControl]: [null, [Validators.required, Validators.pattern(ValidationPatterns.ONLY_NUMBERS_PATTERN)]]
    });
    this.hallForm.get(nameControl)?.setValue(dialogData?.name);
    this.hallForm.get(seatsCountControl)?.setValue(dialogData?.seats.length);
    this.availableSeatTypes$ = this.seatingPlanSharedStateService.availableSeatTypes$;
  }

  ngOnInit(): void {
    combineLatest([this.seatingPlanSharedStateService.seats$, this.seatingPlanSharedStateService.seatingPlanJson$])
      .subscribe(
        ([seats, seatingPlanJson]) => {
          this.seats = seats;
          this.seatingPlanJson = seatingPlanJson;
        }
      );
  }

  ngAfterViewInit(): void {
    if (this.dialogData) {
      this.seatingPlan.loadPlan(this.dialogData.seatingPlan);
      this.seatingPlan.loadData(this.dialogData.seats);
    }
  }

  get nameControl(): string {
    return nameControl;
  }

  get seatsCountControl(): string {
    return seatsCountControl;
  }

  get seatingPlanIsNotSaved(): boolean {
    return this.seatingPlanJson === '';
  }

  openCreateSeatTypeDialog(): void {
    this.dialog.open(CreationDialogComponent, { data: 'seatType' });
  }

  onSearchSeatTypes(event: Event): void {
    const value = (event.target as HTMLInputElement)?.value;
    this.seatTypeService.findAllBySearchTerm(value)
      .subscribe(
        (seatTypes: SeatType[]) => {
          this.seatTypes = seatTypes;
        }
      );
  }

  // adding available seat type for this form: all added seat types will be available in select menu of seat component
  addAvailableSeatType($event: MatSelectChange): void {
    const availableSeatType: AvailableSeatType = {
      seatType: $event.source.value as SeatType,
      color: generateRandomHexColorString()
    };
    this.seatingPlanSharedStateService.addSeatTypeToSharedState(availableSeatType);
  }

  removeAvailableSeatType(availableSeatType: AvailableSeatType): void {
    this.seatingPlanSharedStateService.removeSeatTypeFromSharedState(availableSeatType);
  }

  onSubmit(): void {
    const hall: CreateHall = {
      name: this.hallForm.get(nameControl)?.value,
      seats: this.seats,
      seatingPlan: this.seatingPlanJson
    };
    this.dialogRef.close(hall);
  }

  closeDialog(): void {
    this.dialogRef.close(this.dialogData);
  }
}
