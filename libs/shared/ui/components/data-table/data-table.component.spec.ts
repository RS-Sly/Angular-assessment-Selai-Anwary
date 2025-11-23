
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataTableComponent } from './data-table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('DataTableComponent', () => {
  let component: DataTableComponent;
  let fixture: ComponentFixture<DataTableComponent>;
  let compiled: DebugElement;

  const mockData = [
    { id: 1, name: 'Item 1', status: 'Active', price: 100 },
    { id: 2, name: 'Item 2', status: 'Inactive', price: 200 },
    { id: 3, name: 'Item 3', status: 'Active', price: 300 }
  ];

  const mockColumns = [
    { key: 'name', label: 'Name', sortable: true, type: 'text' },
    { key: 'status', label: 'Status', sortable: true, type: 'badge' },
    { key: 'price', label: 'Price', sortable: true, type: 'currency' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataTableComponent, BrowserAnimationsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(DataTableComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Basic Rendering', () => {
    it('should render table with data', () => {
      component.data = mockData;
      component.columns = mockColumns;
      component.ngAfterViewInit();
      fixture.detectChanges();

      const table = compiled.query(By.css('table'));
      expect(table).toBeTruthy();
    });

    it('should display correct number of columns', () => {
      component.data = mockData;
      component.columns = mockColumns;
      component.ngAfterViewInit();
      fixture.detectChanges();

      expect(component.displayedColumns.length).toBe(mockColumns.length);
    });

    it('should display "No data available" when no data is provided', () => {
      component.data = [];
      component.columns = mockColumns;
      component.ngAfterViewInit();
      fixture.detectChanges();

      const noDataRow = compiled.query(By.css('.no-data-row'));
      expect(noDataRow).toBeTruthy();
      expect(noDataRow.nativeElement.textContent).toContain('No data available');
    });
  });

  describe('Columns Configuration', () => {
    it('should configure displayed columns from column definitions', () => {
      component.data = mockData;
      component.columns = mockColumns;
      component.ngAfterViewInit();

      expect(component.displayedColumns).toEqual(['name', 'status', 'price']);
    });

    it('should add select column when selectable is true', () => {
      component.data = mockData;
      component.columns = mockColumns;
      component.selectable = true;
      component.ngAfterViewInit();

      expect(component.displayedColumns[0]).toBe('select');
      expect(component.displayedColumns.length).toBe(mockColumns.length + 1);
    });

    it('should add actions column when rowActions are provided', () => {
      component.data = mockData;
      component.columns = mockColumns;
      component.rowActions = [
        { icon: 'edit', label: 'Edit', action: 'edit' }
      ];
      component.ngAfterViewInit();

      const lastColumn = component.displayedColumns[component.displayedColumns.length - 1];
      expect(lastColumn).toBe('actions');
    });
  });

  describe('Selection Functionality', () => {
    beforeEach(() => {
      component.data = mockData;
      component.columns = mockColumns;
      component.selectable = true;
      component.ngAfterViewInit();
      fixture.detectChanges();
    });

    it('should initialize with empty selection', () => {
      expect(component.selection.selected.length).toBe(0);
    });

    it('should select all rows when master toggle is clicked', () => {
      component.masterToggle();
      expect(component.selection.selected.length).toBe(mockData.length);
    });

    it('should deselect all rows when master toggle is clicked twice', () => {
      component.masterToggle();
      component.masterToggle();
      expect(component.selection.selected.length).toBe(0);
    });

    it('should emit selectionChange event when selection changes', () => {
      spyOn(component.selectionChange, 'emit');
      component.masterToggle();
      expect(component.selectionChange.emit).toHaveBeenCalledWith(component.selection.selected);
    });

    it('should correctly identify when all rows are selected', () => {
      expect(component.isAllSelected()).toBe(false);
      component.masterToggle();
      expect(component.isAllSelected()).toBe(true);
    });

    it('should toggle individual row selection', () => {
      const row = mockData[0];
      component.selection.toggle(row);
      expect(component.selection.isSelected(row)).toBe(true);
      component.selection.toggle(row);
      expect(component.selection.isSelected(row)).toBe(false);
    });
  });

  describe('Pagination', () => {
    it('should initialize with correct page size', () => {
      component.data = mockData;
      component.columns = mockColumns;
      component.pageSize = 5;
      component.ngAfterViewInit();
      fixture.detectChanges();

      expect(component.pageSize).toBe(5);
    });

    it('should have correct page size options', () => {
      component.data = mockData;
      component.columns = mockColumns;
      component.pageSizeOptions = [10, 20, 50];
      component.ngAfterViewInit();
      fixture.detectChanges();

      expect(component.pageSizeOptions).toEqual([10, 20, 50]);
    });

    it('should connect paginator to dataSource after view init', () => {
      component.data = mockData;
      component.columns = mockColumns;
      component.ngAfterViewInit();
      fixture.detectChanges();

      expect(component.dataSource.paginator).toBe(component.paginator);
    });
  });

  describe('Sorting', () => {
    it('should connect sort to dataSource after view init', () => {
      component.data = mockData;
      component.columns = mockColumns;
      component.ngAfterViewInit();
      fixture.detectChanges();

      expect(component.dataSource.sort).toBe(component.sort);
    });

    it('should enable sort for sortable columns', () => {
      component.data = mockData;
      component.columns = mockColumns;
      component.ngAfterViewInit();
      fixture.detectChanges();

      const sortHeaders = compiled.queryAll(By.css('[mat-sort-header]'));
      expect(sortHeaders.length).toBeGreaterThan(0);
    });
  });

  describe('Row Actions', () => {
    const mockActions = [
      { icon: 'edit', label: 'Edit', action: 'edit' },
      { icon: 'delete', label: 'Delete', action: 'delete' }
    ];

    it('should configure actions column when rowActions are provided', () => {
      component.data = mockData;
      component.columns = mockColumns;
      component.rowActions = mockActions;
      component.ngAfterViewInit();

      const lastColumn = component.displayedColumns[component.displayedColumns.length - 1];
      expect(lastColumn).toBe('actions');
    });

    it('should emit rowActionClick event when action button is clicked', () => {
      spyOn(component.rowActionClick, 'emit');
      const action = mockActions[0];
      const row = mockData[0];

      component.onRowAction(action, row);

      expect(component.rowActionClick.emit).toHaveBeenCalledWith({
        action: 'edit',
        row: row
      });
    });

    it('should evaluate disabled function for action buttons', () => {
      const disabledAction = {
        icon: 'delete',
        label: 'Delete',
        action: 'delete',
        disabled: (row: any) => row.status === 'Active'
      };

      const activeRow = mockData[0]; // status: 'Active'
      const inactiveRow = mockData[1]; // status: 'Inactive'

      expect(disabledAction.disabled!(activeRow)).toBe(true);
      expect(disabledAction.disabled!(inactiveRow)).toBe(false);
    });
  });

  describe('Row Click Events', () => {
    it('should emit rowClick event when row is clicked', () => {
      spyOn(component.rowClick, 'emit');
      component.data = mockData;
      component.columns = mockColumns;
      component.ngAfterViewInit();
      fixture.detectChanges();

      const row = mockData[0];
      component.onRowClick(row);

      expect(component.rowClick.emit).toHaveBeenCalledWith(row);
    });
  });

  describe('Data Source Management', () => {
    it('should update dataSource when data changes', () => {
      component.data = mockData;
      component.columns = mockColumns;
      component.ngAfterViewInit();
      fixture.detectChanges();

      expect(component.dataSource.data).toEqual(mockData);
    });

    it('should handle empty data array', () => {
      component.data = [];
      component.columns = mockColumns;
      component.ngAfterViewInit();
      fixture.detectChanges();

      expect(component.dataSource.data).toEqual([]);
    });
  });

  describe('Column Types', () => {
    it('should configure column with badge type', () => {
      const badgeColumn = { key: 'status', label: 'Status', type: 'badge' };
      component.data = mockData;
      component.columns = [badgeColumn];
      component.ngAfterViewInit();

      expect(component.displayedColumns).toContain('status');
      expect(component.columns[0].type).toBe('badge');
    });

    it('should configure column with date type', () => {
      const dateColumn = { key: 'date', label: 'Date', type: 'date' };
      component.data = [{ date: new Date('2023-01-01') }];
      component.columns = [dateColumn];
      component.ngAfterViewInit();

      expect(component.displayedColumns).toContain('date');
      expect(component.columns[0].type).toBe('date');
    });

    it('should configure column with currency type', () => {
      const currencyColumn = { key: 'price', label: 'Price', type: 'currency' };
      component.data = mockData;
      component.columns = [currencyColumn];
      component.ngAfterViewInit();

      expect(component.displayedColumns).toContain('price');
      expect(component.columns[0].type).toBe('currency');
    });
  });

  describe('Sticky Header', () => {
    it('should apply sticky header when stickyHeader is true', () => {
      component.data = mockData;
      component.columns = mockColumns;
      component.stickyHeader = true;
      component.ngAfterViewInit();
      fixture.detectChanges();

      expect(component.stickyHeader).toBe(true);
    });

    it('should not apply sticky header by default', () => {
      expect(component.stickyHeader).toBe(false);
    });
  });
});