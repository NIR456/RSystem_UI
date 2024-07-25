import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactListComponent } from './Contact-apps/Contact-List/contact-list.component';

const routes: Routes = [
  {path: '',component: ContactListComponent},
  {path: 'contact',component: ContactListComponent},
  {path: 'login',component: ContactListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
