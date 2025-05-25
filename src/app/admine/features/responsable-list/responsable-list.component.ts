import {Component, OnInit} from '@angular/core';
import {ResponsableService} from '../../services/responsable.service';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ConfirmationDialogComponent} from '../../../features/confirmation-dialog/confirmation-dialog.component';
import {ResponsableFormComponent} from '../responsable-form/responsable-form.component';
import {Responsable} from '../../models/responsable.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-responsable-list',
  standalone: false,
  templateUrl: './responsable-list.component.html',
  styleUrl: './responsable-list.component.scss'
})
export class ResponsableListComponent implements OnInit {

  responsables: Responsable[] = [];
  displayedColumns = ['username', 'email', 'firstName', 'lastName', 'createdAt', 'actions'];

  constructor(
    private fb: FormBuilder,
    private responsableService: ResponsableService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadResponsables();
  }

  loadResponsables(): void {
    this.responsableService.getAllResponsables().subscribe({
      next: (data) => this.responsables = data,
      error: (err) => this.showSnackbar('Failed to load responsables', 'error-snackbar')
    });
  }

  openDialog(mode: 'create' | 'edit', responsable?: Responsable): void {
    const dialogRef = this.dialog.open(ResponsableFormComponent, {
      width: '600px',
      data: { mode, responsable }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        this.loadResponsables();
        this.showSnackbar(`Responsable ${mode === 'create' ? 'created' : 'updated'} successfully`, 'success-snackbar');
      }
    });
  }

  confirmDelete(responsableId: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '450px',
      data: {
        title: 'Delete Responsable',
        message: 'Are you sure you want to delete this responsable?',
        confirmText: 'Delete',
        cancelText: 'Cancel'
      }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.responsableService.deleteResponsable(responsableId).subscribe({
          next: () => {
            this.loadResponsables();
            this.showSnackbar('Responsable deleted successfully', 'success-snackbar');
          },
          error: () => this.showSnackbar('Failed to delete responsable', 'error-snackbar')
        });
      }
    });
  }

  private showSnackbar(message: string, panelClass: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: [panelClass]
    });
  }
}
