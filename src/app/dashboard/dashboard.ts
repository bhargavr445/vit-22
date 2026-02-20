import { Component, inject, signal } from '@angular/core';
import { DashboardService } from './dashboard-service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  providers: [DashboardService],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

  readonly #dashboardService = inject(DashboardService);
  
  protected name = signal('Bhargav');


  protected fetchName() {
    const name = this.#dashboardService.sendName();
    this.name.set(name);
  }

  test() {
    console.log();
    
  }

}
