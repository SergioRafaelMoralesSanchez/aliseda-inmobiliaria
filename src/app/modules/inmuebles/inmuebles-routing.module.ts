import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InmueblesComponent } from './pages/inmuebles-page/inmuebles.component';
import { InmuebleComponent } from "./pages/inmueble-page/inmueble.component";

const routes: Routes = [
    { path: '', component: InmueblesComponent },
    { path: ':provinciaUrl/:poblacionUrl/:idInmueble', component: InmuebleComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InmueblesRoutingModule { }
