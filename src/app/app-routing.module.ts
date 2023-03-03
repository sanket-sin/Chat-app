import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatOneComponent } from './components/chat-one/chat-one.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  {path:'', component: ChatOneComponent},
  // {path:'', component: RegisterComponent},
  // {path:'', component: RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
