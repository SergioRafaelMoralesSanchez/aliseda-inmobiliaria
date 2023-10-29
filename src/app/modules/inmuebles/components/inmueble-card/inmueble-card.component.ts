import { Component, Input } from '@angular/core';
import { Inmueble } from "../../../../shared/models/inmueble.interface";

@Component({
    selector: 'app-inmueble-card',
    templateUrl: './inmueble-card.component.html',
    styleUrls: ['./inmueble-card.component.css']
})
export class InmuebleCardComponent {
    @Input()
    inmueble: Inmueble | undefined;
}
