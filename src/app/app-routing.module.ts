import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: 'inmuebles', loadChildren: () => import('./modules/inmuebles/inmuebles.module').then(m => m.InmueblesModule) },
    { path: '**', redirectTo: 'inmuebles' },

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
