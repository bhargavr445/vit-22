import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-table',
  imports: [],
  templateUrl: './table.html',
  styleUrl: './table.css',
})
export class Table {

  // @Input() dateList: any[]= [];
  dateList = input.required<any[]>();

  headersLength = computed(() => this.dateList().length);

}
