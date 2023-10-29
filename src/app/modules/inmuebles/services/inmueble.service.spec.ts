import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";

import { HttpClient, HttpResponse } from '@angular/common/http';
import { InmuebleService } from "./inmueble.service";
import { InmmobiliariaDto } from "../../../shared/models/dto/inmobiliaria-dto.interface";
import * as rxjs from "rxjs";
import { InmuebleIdDto } from "../../../shared/models/dto/inmueble-id-dto.interface";

describe("InmuebleService", () => {

    let inmuebleService: InmuebleService;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            providers: [
                InmuebleService
            ],
            imports: [HttpClientTestingModule]
        });

        inmuebleService = TestBed.inject(InmuebleService);
    });

    afterEach(() => {
        jest.clearAllMocks();
        jest.restoreAllMocks();
    });

    describe("render", () => {
        it('should be created', () => {
            expect(inmuebleService).toBeTruthy();
        });

    });

    describe("metodos", () => {
        describe('getAllInmuebles', () => {
            it('obtener el pdf en formato Blob', async () => {

                const resultMock: InmmobiliariaDto = {} as InmmobiliariaDto;
                const url = `${inmuebleService.baseurl}/new-search?tipo=10&page=${2}`;
                const getSpy = jest.spyOn(HttpClient.prototype, "get").mockImplementation();
                const firstValueFromSpy = jest.spyOn(rxjs, 'firstValueFrom').mockResolvedValue(resultMock);

                const result: InmmobiliariaDto = await inmuebleService.getAllInmuebles(2);

                expect(result).toBe(resultMock);

                expect(firstValueFromSpy).toHaveBeenCalledTimes(1);
                expect(firstValueFromSpy).toHaveBeenCalledWith(undefined);

                expect(getSpy).toHaveBeenCalledTimes(1);
                expect(getSpy).toHaveBeenCalledWith(url);
            });
        });
    });
    describe('getInmueble', () => {
        it('obtener el pdf en formato Blob', async () => {

            const resultMock: InmuebleIdDto = {} as InmuebleIdDto;
            const url = `${inmuebleService.baseurl}/get-property/10/cordoba/almodovar-del-rio/2323`;
            const getSpy = jest.spyOn(HttpClient.prototype, "get").mockImplementation();
            const firstValueFromSpy = jest.spyOn(rxjs, 'firstValueFrom').mockResolvedValue(resultMock);

            const result: InmuebleIdDto = await inmuebleService.getInmueble("cordoba", "almodovar-del-rio", "2323");

            expect(result).toBe(resultMock);

            expect(firstValueFromSpy).toHaveBeenCalledTimes(1);
            expect(firstValueFromSpy).toHaveBeenCalledWith(undefined);

            expect(getSpy).toHaveBeenCalledTimes(1);
            expect(getSpy).toHaveBeenCalledWith(url);
        });
    });
});
