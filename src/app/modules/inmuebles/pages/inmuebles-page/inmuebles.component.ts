import { Component, OnInit } from '@angular/core';
import { InmuebleService } from "../../services/inmueble.service";
import { Inmueble } from "../../../../shared/models/inmueble.interface";

@Component({
    selector: 'app-inmuebles',
    templateUrl: './inmuebles.component.html',
    styleUrls: ['./inmuebles.component.css']
})
export class InmueblesComponent implements OnInit {
    inmobiliaria: InmmobiliariaRaw | undefined;
    inmuebles: Inmueble[] = [];
    numInmuebles = 1;

    loading = false;
    constructor(private inmuebleService: InmuebleService) {

    }
    async ngOnInit(): Promise<void> {
        await this.getInmbuebles();
    }

    async getInmbuebles() {
        try {
            this.loading = true;

            this.inmobiliaria = await this.inmuebleService.getAllInmuebles(this.numInmuebles) as InmmobiliariaRaw;

            this.inmobiliaria.data.forEach((inmuebleRaw: InmuebleRaw) => {
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
                        ciudadUrl: inmuebleRaw.ciudadUrl
                    }
                });
            });
        } catch (error) {
            // TODO manage errors
            console.error(error);
        } finally {
            this.loading = false;
        }
    }

    async getMoreInmuebles() {
        this.numInmuebles += 1;
        await this.getInmbuebles();
    }

}

export interface InmmobiliariaRaw {
    data: InmuebleRaw[]
}

export interface InmuebleRaw {
    id: string
    Precio: string
    StreetName: string
    Descripcion: string
    Ciudad: string
    TipoVia: string
    ciudadUrl: string
    nombreProvincia: string
    provinciaUrl: string
    imagenes: Imagen[]
}

export interface Imagen {
    Uri: string
}
