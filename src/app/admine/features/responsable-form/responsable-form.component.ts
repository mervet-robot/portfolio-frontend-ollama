import {Component, Input, OnInit, Output} from '@angular/core';
import {Responsable} from '../../models/responsable.model';
import EventEmitter from 'node:events';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ResponsableService} from '../../services/responsable.service';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-responsable-form',
  standalone: false,
  templateUrl: './responsable-form.component.html',
  styleUrl: './responsable-form.component.scss'
})
export class ResponsableFormComponent {
  form: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private responsableService: ResponsableService,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    this.loading = true;
    this.responsableService.createResponsable(this.form.value).subscribe({
      next: () => {
        this.snackBar.open('Responsable created successfully', 'Close', { duration: 3000 });
        this.form.reset();
        this.loading = false;
      },
      error: (err) => {
        this.snackBar.open(err.error?.message || 'Error creating responsable', 'Close', { duration: 4000 });
        this.loading = false;
      }
    });
  }
}
