import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children:[
      {
        path: 'book',
        loadChildren: () => import('./book/book.module').then( m => m.BookPageModule)
      },
      {
        path: 'bookings',
        loadChildren: () => import('./bookings/bookings.module').then( m => m.BookingsPageModule)
      },
      {
        path: 'user',
        loadChildren: () => import('./user/user.module').then( m => m.UserPageModule)
      },
      {
        path: '',
        redirectTo: 'bookings',
        pathMatch: 'full'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
