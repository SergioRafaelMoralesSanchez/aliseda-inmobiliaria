import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { InmueblesRoutingModule } from './inmuebles-routing.module';
import { InmuebleComponent } from "./pages/inmueble-page/inmueble.component";
import { InmueblesComponent } from './pages/inmuebles-page/inmuebles.component';
import { InmuebleService } from "./services/inmueble.service";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { InmuebleCardComponent } from './components/inmueble-card/inmueble-card.component';

@NgModule({
    declarations: [
        InmueblesComponent,
        InmuebleComponent,
        InmuebleCardComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        InmueblesRoutingModule
    ],
    providers: [
        InmuebleService,
        HttpClient
    ]
})
export class InmueblesModule { }
