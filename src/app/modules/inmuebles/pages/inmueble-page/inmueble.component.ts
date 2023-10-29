import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Inmueble } from "../../../../shared/models/inmueble.interface";
import { InmuebleService } from "../../services/inmueble.service";
import { InmuebleIdDto } from "../../../../shared/models/dto/inmueble-id-dto.interface";

@Component({
    selector: 'app-inmueble',
    templateUrl: './inmueble.component.html',
    styleUrls: ['./inmueble.component.css']
})
export class InmuebleComponent implements OnInit {
    inmueble: Inmueble | undefined;
    numInmuebles = 1;

    loading = false;
    constructor(
        private inmuebleService: InmuebleService,
        private activatedRoute: ActivatedRoute
    ) { }
    async ngOnInit(): Promise<void> {
        await this.getInmueble();
    }

    async getInmueble() {
        try {
            const routes = this.activatedRoute.snapshot.params;
            this.loading = true;
            const inmuebleRaw = await this.inmuebleService.getInmueble(routes["provinciaUrl"], routes["poblacionUrl"], routes["idInmueble"]);
            this.mapearInmueble(inmuebleRaw);
        } catch (error) {
            // TODO controlar errores
            console.error(error);
        } finally {
            this.loading = false;
        }
    }
    mapearInmueble(inmuebleRaw: InmuebleIdDto) {
        this.inmueble = {
            id: inmuebleRaw.id,
            precio: inmuebleRaw.operacion.Precio.toString(),
            imagen: inmuebleRaw.imagenes[0].Uri,
            descripcion: inmuebleRaw.Description,
            direccion: {
                nombreCalle: inmuebleRaw.address.StreetName,
                tipoVia: inmuebleRaw.address.TipoVia,
                nombreProvincia: inmuebleRaw.Capital,
                ciudad: inmuebleRaw.Ciudad,
                provinciaUrl: inmuebleRaw.provinciaUrl,
                ciudadUrl: inmuebleRaw.ciudadUrl,
                latitude: inmuebleRaw.address.Latitude,
                longitude: inmuebleRaw.address.Longitude,
            }
        };
    }
}
