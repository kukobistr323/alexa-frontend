import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {GoogleComponent} from './components/google/google.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';


const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: GoogleComponent},
  {path: 'dashboard', component: DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
