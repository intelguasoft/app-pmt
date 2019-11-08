import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { GuardService } from './services/guard.service';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  {
    path: 'admin',
    loadChildren: './pages/tabs/tabs.module#TabsPageModule',
    canActivate: [GuardService]
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
