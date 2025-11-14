import { Component, Input, Output, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';

/**
 * Shared Data Table Component
 * Referenced in SharedUiModule - needs to be converted to standalone
 */
@Component({
  selector: 'app-data-table',
  template: `
    <div class="data-table-container">
      <table mat-table [dataSource]="dataSource" matSort class="data-table">
        <!-- Selection Column -->
        <ng-container matColumnDef="select" *ngIf="selectable">
          <th mat-header-cell *matHeaderCellDef>
            <mat-checkbox (change)="$event ? masterToggle() : null"
                          [checked]="selection.hasValue() && isAllSelected()"
                          [indeterminate]="selection.hasValue() && !isAllSelected()">
            </mat-checkbox>
          </th>
          <td mat-cell *matCellDef="let row">
            <mat-checkbox (click)="$event.stopPropagation()"
                          (change)="$event ? selection.toggle(row) : null"
                          [checked]="selection.isSelected(row)">
            </mat-checkbox>
          </td>
        </ng-container>

        <!-- Dynamic Columns -->
        <ng-container *ngFor="let column of columns" [matColumnDef]="column.key">
          <th mat-header-cell *matHeaderCellDef mat-sort-header [disabled]="!column.sortable">
            {{ column.label }}
          </th>
          <td mat-cell *matCellDef="let element">
            <ng-container [ngSwitch]="column.type">
              <span *ngSwitchCase="'badge'" class="badge">{{ element[column.key] }}</span>
              <span *ngSwitchCase="'date'">{{ element[column.key] | date:'short' }}</span>
              <span *ngSwitchCase="'currency'">{{ element[column.key] | currency }}</span>
              <span *ngSwitchDefault>{{ element[column.key] }}</span>
            </ng-container>
          </td>
        </ng-container>

        <!-- Actions Column -->
        <ng-container matColumnDef="actions" *ngIf="rowActions && rowActions.length > 0">
          <th mat-header-cell *matHeaderCellDef>Actions</th>
          <td mat-cell *matCellDef="let element">
            <button mat-icon-button
                    *ngFor="let action of rowActions"
                    (click)="onRowAction(action, element)"
                    [disabled]="action.disabled ? action.disabled(element) : false"
                    [matTooltip]="action.label">
              <mat-icon>{{ action.icon }}</mat-icon>
            </button>
          </td>
        </ng-container>

        <!-- Header and Row Declarations -->
        <tr mat-header-row *matHeaderRowDef="displayedColumns; sticky: stickyHeader"></tr>
        <tr mat-row
            *matRowDef="let row; columns: displayedColumns;"
            (click)="onRowClick(row)"
            [class.selected]="selection.isSelected(row)">
        </tr>

        <!-- No Data Row -->
        <tr class="mat-row no-data-row" *matNoDataRow>
          <td class="mat-cell" [colspan]="displayedColumns.length">
            No data available
          </td>
        </tr>
      </table>

      <mat-paginator [pageSizeOptions]="pageSizeOptions"
                     [pageSize]="pageSize"
                     showFirstLastButtons
                     *ngIf="paginator">
      </mat-paginator>
    </div>
  `,
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements AfterViewInit {
  @Input() data: any[] = [];
  @Input() columns: any[] = [];
  @Input() selectable = false;
  @Input() rowActions?: any[];
  @Input() pageSizeOptions = [5, 10, 25, 100];
  @Input() pageSize = 10;
  @Input() stickyHeader = false;

  @Output() rowClick = new EventEmitter<any>();
  @Output() rowActionClick = new EventEmitter<any>();
  @Output() selectionChange = new EventEmitter<any[]>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource = new MatTableDataSource<any>();
  selection = new SelectionModel<any>(true, []);
  displayedColumns: string[] = [];

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.setupTable();
  }

  private setupTable(): void {
    this.dataSource.data = this.data;

    const cols = [...this.columns.map(c => c.key)];
    if (this.selectable) {
      cols.unshift('select');
    }
    if (this.rowActions && this.rowActions.length > 0) {
      cols.push('actions');
    }
    this.displayedColumns = cols;
  }

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle(): void {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.dataSource.data.forEach(row => this.selection.select(row));
    }
    this.selectionChange.emit(this.selection.selected);
  }

  onRowClick(row: any): void {
    this.rowClick.emit(row);
  }

  onRowAction(action: any, row: any): void {
    this.rowActionClick.emit({ action: action.action, row });
  }
}