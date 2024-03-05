import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ChatComponent } from './chat/chat.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path:"", component:LandingPageComponent},
  {path:"chat",component:ChatComponent,canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
