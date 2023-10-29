import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InmueblesComponent } from './inmuebles.component';
import { HttpClientModule } from "@angular/common/http";
import { InmuebleService } from "../../services/inmueble.service";
import { InmmobiliariaDto } from "../../../../shared/models/dto/inmobiliaria-dto.interface";

describe('InmueblesComponent', () => {
    let component: InmueblesComponent;
    let fixture: ComponentFixture<InmueblesComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule
            ],
            declarations: [InmueblesComponent],
            providers: [
                InmuebleService
            ]
        });
        fixture = TestBed.createComponent(InmueblesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    afterEach(() => {
        jest.clearAllMocks();
        jest.restoreAllMocks();
    });

    describe("render", () => {
        it('should be created', () => {
            expect(component).toBeTruthy();
        });
        it('ngOnInit, debe de llamar a getInmuebles al crear el componente', async () => {
            const getInmbueblesSpy = jest.spyOn(InmueblesComponent.prototype, "getInmbuebles").mockImplementation();
            await component.ngOnInit();

            expect(getInmbueblesSpy).toHaveBeenCalledTimes(1);
            expect(getInmbueblesSpy).toHaveBeenCalledWith();
        });

    });
    describe("metodos", () => {

        describe("getInmbuebles", () => {
            it('Debe de obtener los inmbueles y llamar a mapearInmuebles', async () => {
                const inmmobiliariaDtoMock: InmmobiliariaDto = {
                    data: []
                };
                const mapearInmueblesSpy = jest.spyOn(InmueblesComponent.prototype, "mapearInmuebles").mockImplementation();
                const getAllInmueblesSpy = jest.spyOn(InmuebleService.prototype, "getAllInmuebles").mockResolvedValue(inmmobiliariaDtoMock);

                component.numInmueblesPage = 2;

                await component.getInmbuebles();

                expect(getAllInmueblesSpy).toHaveBeenCalledTimes(1);
                expect(getAllInmueblesSpy).toHaveBeenCalledWith(2);

                expect(mapearInmueblesSpy).toHaveBeenCalledTimes(1);
                expect(mapearInmueblesSpy).toHaveBeenCalledWith(inmmobiliariaDtoMock);
            });
            it('Debe de no hacer nada si falla la llamada', async () => {
                const getAllInmueblesSpy = jest.spyOn(InmuebleService.prototype, "getAllInmuebles").mockRejectedValue(new Error('No se han encontrado inmuebles'));

                component.numInmueblesPage = 3;

                await component.getInmbuebles();

                expect(getAllInmueblesSpy).toHaveBeenCalledTimes(1);
                expect(getAllInmueblesSpy).toHaveBeenCalledWith(3);

            });
        });
        describe("mapearInmuebles", () => {
            it('Debe de mapear y añadir los inmbuebles obtenidos a la lista general', async () => {
                component.inmuebles = [{
                    id: "id",
                    precio: "Precio",
                    descripcion: "Descripcion",
                    imagen: "imagenes",
                    direccion: {
                        nombreCalle: "StreetName",
                        tipoVia: "TipoVia",
                        ciudad: "Ciudad",
                        nombreProvincia: "nombreProvincia",
                        provinciaUrl: "provinciaUrl",
                        ciudadUrl: "ciudadUrl",
                        latitude: 40,
                        longitude: -100
                    }
                }];
                const inmmobiliariaDtoMock: InmmobiliariaDto = {
                    data: [{
                        id: "inmuebleRaw.id",
                        Precio: "inmuebleRaw.Precio",
                        Descripcion: "inmuebleRaw.Descripcion",
                        imagenes: [{
                            Uri: "https://..."
                        }],
                        StreetName: "inmuebleRaw.StreetName",
                        TipoVia: "inmuebleRaw.TipoVia",
                        Ciudad: "inmuebleRaw.Ciudad",
                        nombreProvincia: "inmuebleRaw.nombreProvincia",
                        provinciaUrl: "inmuebleRaw.provinciaUrl",
                        ciudadUrl: "inmuebleRaw.ciudadUrl",
                        Latitude: 40,
                        Longitude: 40,
                    }]
                };
                component.numInmueblesPage = 2;

                component.mapearInmuebles(inmmobiliariaDtoMock);
                expect(component.inmuebles.length).toBe(2);
            });
        });
        describe("getMoreInmuebles", () => {
            it('Debe de aumentar el numero de Pagina de inmbuebles y llamar a getInmbuebles', async () => {

                component.numInmueblesPage = 2;

                const getInmbueblesSpy = jest.spyOn(InmueblesComponent.prototype, "getInmbuebles").mockImplementation();
                await component.getMoreInmuebles();

                expect(getInmbueblesSpy).toHaveBeenCalledTimes(1);
                expect(getInmbueblesSpy).toHaveBeenCalledWith();

                expect(component.numInmueblesPage).toBe(3);
            });
        });
    });
});
