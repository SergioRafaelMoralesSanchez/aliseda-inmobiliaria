import { Component, OnInit } from '@angular/core';
import { InmmobiliariaDto, InmuebleRaw } from "../../../../shared/models/dto/inmobiliaria-dto.interface";
import { Inmueble } from "../../../../shared/models/inmueble.interface";
import { InmuebleService } from "../../services/inmueble.service";

@Component({
    selector: 'app-inmuebles',
    templateUrl: './inmuebles.component.html',
    styleUrls: ['./inmuebles.component.css']
})
export class InmueblesComponent implements OnInit {
    inmobiliaria: InmmobiliariaDto | undefined;
    inmuebles: Inmueble[] = [];
    numInmueblesPage = 1;

    loading = false;

    constructor(private inmuebleService: InmuebleService) {

    }

    async ngOnInit(): Promise<void> {
        await this.getInmbuebles();
    }

    async getInmbuebles() {
        try {
            this.loading = true;

            const inmobiliaria = await this.inmuebleService.getAllInmuebles(this.numInmueblesPage);

            this.mapearInmuebles(inmobiliaria);
        } catch (error) {
            // TODO manage errors
            console.error(error);
        } finally {
            this.loading = false;
        }
    }

    mapearInmuebles(inmobiliaria: InmmobiliariaDto) {
        inmobiliaria.data.forEach((inmuebleRaw: InmuebleRaw) => {
            this.inmuebles.push({
                id: inmuebleRaw.id,
                precio: inmuebleRaw.Precio,
                descripcion: inmuebleRaw.Descripcion,
                imagen: inmuebleRaw.imagenes[0].Uri,
                direccion: {
                    nombreCalle: inmuebleRaw.StreetName,
                    tipoVia: inmuebleRaw.TipoVia,
                    ciudad: inmuebleRaw.Ciudad,
                    nombreProvincia: inmuebleRaw.nombreProvincia,
                    provinciaUrl: inmuebleRaw.provinciaUrl,
                    ciudadUrl: inmuebleRaw.ciudadUrl,
                    latitude: inmuebleRaw.Latitude,
                    longitude: inmuebleRaw.Longitude
                }
            });
        });
    }

    async getMoreInmuebles() {
        this.numInmueblesPage += 1;
        await this.getInmbuebles();
    }

}
