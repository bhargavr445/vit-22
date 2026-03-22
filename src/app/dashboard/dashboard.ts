import { afterNextRender, Component, inject, signal } from '@angular/core';
import { DashboardService } from './dashboard-service';
import { form, required, FormField, FormRoot } from '@angular/forms/signals';

const INITIAL_VALUES = {
  userName: '',
  password: ''
}

interface DashboardI {
  userName: string;
  password: string;
}
@Component({
  selector: 'app-dashboard',
  imports: [FormField, FormRoot],
  providers: [DashboardService],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

  readonly #dashboardService = inject(DashboardService);
  
  protected name = signal('Bhargav');

  dashboardModel = signal<DashboardI>(INITIAL_VALUES);

  constructor() {
    afterNextRender(() => {
      
    }) 
  }

  dashboardForm = form(this.dashboardModel, (path) => {
    required(path.userName)
    required(path.password)
  }, {
    submission: {
      action: async (form) => {
        const creds = form().value();
        console.log(creds);
        const response = await this.#dashboardService.save(creds);
        console.log(response);
        return undefined;
      }
    }
  })


  protected fetchName() {
    const name = this.#dashboardService.sendName();
    this.name.set(name);
  }

  submit() {
    // console.log(this.dashboardForm().value());
    // console.log(event);

    this.#dashboardService.save1({}).subscribe(
      () => {},
      () => {}
    )
  }

}
