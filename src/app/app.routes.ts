import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { Team } from './team/team';
import { Projects } from './projects/projects';
import { Calender } from './calender/calender';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: Dashboard },
    { path: 'team', component: Team },
    { path: 'projects', component: Projects },
    { path: 'calender', component: Calender }
];
