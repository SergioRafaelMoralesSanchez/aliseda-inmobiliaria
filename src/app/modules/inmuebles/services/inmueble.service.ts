import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from "rxjs";
import { InmuebleIdDto } from "../../../shared/models/dto/inmueble-id-dto.interface";
import { InmmobiliariaDto } from "../../../shared/models/dto/inmobiliaria-dto.interface";

@Injectable({
    providedIn: 'root'
})
export class InmuebleService {

    baseurl = "https://laravelint.alisedainmobiliaria.com/api";
    constructor(
        private httpClient: HttpClient) {

    }

    getAllInmuebles(page: number) {
        return firstValueFrom(this.httpClient.get<InmmobiliariaDto>(`${this.baseurl}/new-search?tipo=10&page=${page}`));
    }

    getInmueble(provinciaUrl: string, ciudadUrl: string, id: string) {
        return firstValueFrom(this.httpClient.get<InmuebleIdDto>(`${this.baseurl}/get-property/10/${provinciaUrl}/${ciudadUrl}/${id}`));
    }
}
