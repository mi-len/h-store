import { NgModule } from '@angular/core';
// import { CommonModule } from "@angular/common";

import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import {MatRadioModule} from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule, MatSortModule } from '@angular/material';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatTabsModule} from '@angular/material/tabs';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
    imports: [
        MatMenuModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatTableModule,
        MatRadioModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatInputModule,
        MatSelectModule,
        MatTabsModule,
        MatSortModule,
        MatPaginatorModule,
        MatToolbarModule,
        MatTooltipModule
    ],
    exports: [
        MatMenuModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatTableModule,
        MatRadioModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatInputModule,
        MatSelectModule,
        MatTabsModule,
        MatSortModule,
        MatPaginatorModule,
        MatToolbarModule,
        MatTooltipModule
    ]
})
export class MaterialModule {}