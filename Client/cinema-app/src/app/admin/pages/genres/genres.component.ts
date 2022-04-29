import { EMPTY, switchMap } from 'rxjs';

import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { Genre } from '@core/models/genre/genre';
import { GenreService } from '@core/services/genre.service';
import { PaginationResult } from '@core/models/pagination-result/pagination-result';
import { TableCurrentState } from '@shared/elements/editable-table/interfaces/table-current-state';
import { TableColumn } from '@shared/elements/editable-table/interfaces/table-column';
import { ConfirmDialogComponent } from '@shared/layout/confirm-dialog/confirm-dialog.component';
import { CreationPageDialogData } from '@admin/dialogs/creation-dialog/creation-dialog-messages';
import { CreationDialogComponent } from '@admin/dialogs/creation-dialog/creation-dialog.component';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html'
})
export class GenresComponent implements OnInit {
  genres: PaginationResult<Genre> = { totalCountInDatabase: 0, items: [] };
  genresTableColumns: TableColumn[] = [];

  constructor(
    private readonly dialog: MatDialog,
    private readonly genreService: GenreService
  ) {
  }

  ngOnInit(): void {
    this.initializeColumns();
  }

  openCreateGenreDialog(): void {
    this.openCreationDialog({ action: 'createGenre' });
  }

  editGenre($event: Genre): void {
    this.openCreationDialog({ object: $event, action: 'updateGenre' });
  }

  deleteGenre($event: Genre): void {
    const dialogRef = this.dialog.open(
      ConfirmDialogComponent,
      {
        data: {
          title: 'Are you sure?',
          message: 'Do you really want to delete this genre?'
        }
      }
    );
    dialogRef.afterClosed()
      .pipe(
        switchMap(
          (isSubmitted: boolean) => {
            return isSubmitted ? this.genreService.deleteGenre($event.id) : EMPTY;
          }
        )
      )
      .subscribe(
        (id: number) => {
          this.genres =
            {
              totalCountInDatabase: --this.genres.totalCountInDatabase,
              items: this.genres.items.filter(item => item.id !== id)
            }
        }
      );
  }

  getAllGenres($event: TableCurrentState): void {
    this.genreService.getAllGenresPaged($event)
      .subscribe(
        (value: PaginationResult<Genre>) => this.genres = value
      );
  }

  private initializeColumns(): void {
    this.genresTableColumns = [
      {
        name: 'Genre name',
        dataKey: 'name',
        isSortable: true
      }
    ];
  }

  private openCreationDialog(data: CreationPageDialogData): void {
    const ref = this.dialog.open(
      CreationDialogComponent,
      {
        data: data
      }
    );
    ref.afterClosed().subscribe(
      (result: { isSaved: boolean, savedEntity: Genre }) => {
        if (result.isSaved) {
          this.genres =
            {
              totalCountInDatabase: this.genres.totalCountInDatabase,
              items: this.genres.items.map(
                item => item.id === result.savedEntity.id
                  ? { ...item, ...result.savedEntity }
                  : item
              )
            };
        }
      }
    );
  }
}
