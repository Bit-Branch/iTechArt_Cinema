//External
import { combineLatest, from, Subscription, switchMap } from 'rxjs';

//Angular
import { AfterViewInit, Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatSelectChange } from '@angular/material/select';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

//Local
import { Seat } from '@core/models/seat/seat';
import { Hall } from '@core/models/hall/hall';
import { SeatType } from '@core/models/seat-type/seat-type';
import { SeatTypeService } from '@core/services/seat-type.service';
import { ValidationPatterns } from '@core/constants/validation-patterns';
import { SeatingPlanComponent } from '@admin/seating-plan/seating-plan.component';
import { SeatingPlanSharedStateService } from '@admin/seating-plan/services/seating-plan-shared-state.service';
import { CreationDialogComponent } from '@admin/dialogs/creation-dialog/creation-dialog.component';
import { AvailableSeatType } from '@admin/seating-plan/intefraces/available-seat-type';

const nameControl = 'name';
const seatsCountControl = 'seatsCount';
const createDialogTitle = 'Create hall';
const editDialogTitle = 'Edit cinema';
const createActionButtonLabel = 'Create';
const editActionButtonLabel = 'Apply changes';

@Component({
  selector: 'app-hall-dialog',
  templateUrl: './hall-dialog.component.html',
  styleUrls: ['./hall-dialog.component.scss', '../dialogs-shared.scss']
})
export class HallDialogComponent implements OnInit, AfterViewInit, OnDestroy {
  readonly hallForm: FormGroup;
  dialogTitle = createDialogTitle;
  actionButtonLabel = createActionButtonLabel;
  seatTypes: SeatType[] = [];
  availableSeatTypes: AvailableSeatType[] = [];
  @ViewChild(SeatingPlanComponent, { static: true }) seatingPlan!: SeatingPlanComponent;
  private seatingPlanJson = '';
  private seats: Seat[] = [];
  private isInEditMode = false;
  private sharedStateServiceSubscription!: Subscription;

  constructor(
    private readonly fb: FormBuilder,
    private readonly dialog: MatDialog,
    private readonly seatTypeService: SeatTypeService,
    private readonly sharedStateService: SeatingPlanSharedStateService,
    private readonly dialogRef: MatDialogRef<HallDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private dialogData: Hall
  ) {
    this.hallForm = this.fb.group({
      [nameControl]: [null, Validators.required],
      [seatsCountControl]: [null, [Validators.required, Validators.pattern(ValidationPatterns.ONLY_NUMBERS_PATTERN)]]
    });
    if (dialogData) {
      this.isInEditMode = true;
      this.dialogTitle = editDialogTitle;
      this.actionButtonLabel = editActionButtonLabel;
    }
  }

  ngOnInit(): void {
    this.sharedStateServiceSubscription =
      combineLatest(
        [
          this.sharedStateService.seats$,
          this.sharedStateService.seatingPlanJson$,
          this.sharedStateService.availableSeatTypes$
        ]
      )
        .subscribe(
          ([seats, seatingPlanJson, availableSeatTypes]) => {
            this.seats = seats;
            this.seatingPlanJson = seatingPlanJson;
            this.availableSeatTypes = availableSeatTypes;
          }
        );
  }

  ngAfterViewInit(): void {
    if (this.isInEditMode) {
      this.fillFormWithData();
    }
  }

  ngOnDestroy(): void {
    this.sharedStateServiceSubscription.unsubscribe();
    this.sharedStateService.removeAllSeatTypesFromSharedState();
    this.sharedStateService.removeAllSeatsFromSharedState();
    this.sharedStateService.removeSeatingPlanJsonFromSharedState();
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
    this.dialog.open(
      CreationDialogComponent,
      {
        data: {
          action: 'createSeatType'
        }
      }
    );
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

  onSeatTypeSelected($event: MatSelectChange): void {
    // add available seat type for this form: all added seat types will be available in select menu of seat component
    this.addAvailableSeatType($event.source.value);
  }

  removeAvailableSeatType(availableSeatType: AvailableSeatType): void {
    this.sharedStateService.removeSeatTypeFromSharedState(availableSeatType);
  }

  onSubmit(): void {
    const hall: Hall = {
      id: this.dialogData?.id,
      name: this.hallForm.get(nameControl)?.value,
      seats: this.seats,
      cinemaId: this.dialogData?.cinemaId,
      seatingPlan: this.seatingPlanJson
    };
    this.dialogRef.close(hall);
  }

  closeDialog(): void {
    this.dialogRef.close(this.dialogData);
  }

  private generateRandomHexColorString(): string {
    return `#${(0x1000000 + Math.random() * 0xffffff).toString(16).substring(1, 5)}`;
  }

  private fillFormWithData(): void {
    this.hallForm.get(nameControl)?.setValue(this.dialogData?.name);
    this.hallForm.get(seatsCountControl)?.setValue(this.dialogData?.seats.length);
    this.seats = this.dialogData.seats;
    this.seatingPlanJson = this.dialogData.seatingPlan;
    this.seatingPlan.loadPlan(this.dialogData.seatingPlan);
    if (this.dialogData.id) {
      this.seatTypeService.findAllByHallId(this.dialogData.id)
        .subscribe(
          (seatTypes: SeatType[]) => {
            seatTypes.map(seatType => this.addAvailableSeatType(seatType));
            this.seatingPlan.loadData(this.dialogData.seats, this.availableSeatTypes);
          }
        );
    } else {
      const seatTypesIds = [...new Set(this.dialogData.seats.map(seat => seat.seatTypeId))];
      from(seatTypesIds)
        .pipe(
          switchMap(
            (id: number) => this.seatTypeService.getSeatTypeById(id)
          )
        )
        .subscribe(
          {
            next: (seatType: SeatType) => this.addAvailableSeatType(seatType),
            complete: () => this.seatingPlan.loadData(this.dialogData.seats, this.availableSeatTypes)
          }
        )
    }
  }

  // adding available seat type for this form: all added seat types will be available in select menu of seat component
  private addAvailableSeatType(seatType: SeatType): void {
    const availableSeatType: AvailableSeatType = {
      seatType: seatType,
      color: this.generateRandomHexColorString()
    };
    this.sharedStateService.addSeatTypeToSharedState(availableSeatType);
  }
}
