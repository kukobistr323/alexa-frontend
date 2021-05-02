import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GoogleComponent} from './components/google/google.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {AuthorizeComponent} from './components/authorize/authorize.component';


const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: GoogleComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'authorize', component: AuthorizeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
