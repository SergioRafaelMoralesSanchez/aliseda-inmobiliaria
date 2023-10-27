import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from "rxjs";
import { InmuebleRaw } from "../pages/inmuebles-page/inmuebles.component";

@Injectable({
    providedIn: 'root'
})
export class InmuebleService {

    baseurl = "https://laravelint.alisedainmobiliaria.com/api";
    constructor(
        private httpClient: HttpClient) {

    }

    getAllInmuebles(page: number) {
        return firstValueFrom(this.httpClient.get(`${this.baseurl}/new-search?tipo=10&page=${page}`));
    }

    getInmueble(provinciaUrl: string, ciudadUrl: string, id: string) {
        return firstValueFrom(this.httpClient.get(`${this.baseurl}/get-property/10/${provinciaUrl}/${ciudadUrl}/${id}`));
    }
}
