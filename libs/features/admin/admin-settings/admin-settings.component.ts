import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-settings',
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Application Settings</mat-card-title>
      </mat-card-header>

      <mat-card-content>
        <form [formGroup]="settingsForm" (ngSubmit)="saveSettings()">
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Site Name</mat-label>
            <input matInput formControlName="siteName">
          </mat-form-field>

          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Contact Email</mat-label>
            <input matInput type="email" formControlName="contactEmail">
          </mat-form-field>

          <mat-slide-toggle formControlName="maintenanceMode">
            Maintenance Mode
          </mat-slide-toggle>

          <div class="actions">
            <button mat-raised-button color="primary" type="submit" [disabled]="!settingsForm.valid">
              Save Settings
            </button>
          </div>
        </form>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .full-width {
      width: 100%;
    }
    .actions {
      margin-top: 20px;
    }
  `]
})
export class AdminSettingsComponent implements OnInit {
  settingsForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.settingsForm = this.fb.group({
      siteName: ['Angular Migration Assessment', Validators.required],
      contactEmail: ['admin@example.com', [Validators.required, Validators.email]],
      maintenanceMode: [false]
    });
  }

  saveSettings(): void {
    if (this.settingsForm.valid) {
      this.adminService.updateSettings(this.settingsForm.value).subscribe({
        next: () => {
          this.snackBar.open('Settings saved successfully', 'Close', { duration: 3000 });
        },
        error: () => {
          this.snackBar.open('Error saving settings', 'Close', { duration: 3000 });
        }
      });
    }
  }
}
