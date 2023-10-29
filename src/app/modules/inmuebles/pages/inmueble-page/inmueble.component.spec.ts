import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientModule } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";
import { InmuebleIdDto } from "../../../../shared/models/dto/inmueble-id-dto.interface";
import { InmuebleService } from "../../services/inmueble.service";
import { InmuebleComponent } from './inmueble.component';

describe('InmuebleComponent', () => {
    let component: InmuebleComponent;
    let fixture: ComponentFixture<InmuebleComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule
            ],
            declarations: [InmuebleComponent],
            providers: [
                InmuebleService,
                {
                    provide: ActivatedRoute,
                    useValue: {
                        snapshot: {
                            params: {
                                provinciaUrl: "cordoba",
                                poblacionUrl: "almodovar-del-rio",
                                idInmueble: "2323232",
                            }
                        },
                    },
                }
            ]
        });
        fixture = TestBed.createComponent(InmuebleComponent);
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
            const getInmbueblesSpy = jest.spyOn(InmuebleComponent.prototype, "getInmueble").mockImplementation();
            await component.ngOnInit();

            expect(getInmbueblesSpy).toHaveBeenCalledTimes(1);
            expect(getInmbueblesSpy).toHaveBeenCalledWith();
        });

    });
    describe("metodos", () => {

        describe("getInmueble", () => {
            it('Debe de obtener los inmbueles y llamar a mapearInmueble', async () => {
                const inmuebleIdDtoMock: InmuebleIdDto = {

                    id: "id",
                    operacion: {
                        Precio: 2323,
                    },
                    Description: "Descripcion",
                    imagenes: [{
                        Uri: "https://..."
                    }],
                    address: {
                        StreetName: "estacion",
                        TipoVia: "calle",
                        Latitude: 40,
                        Longitude: -100,
                        Ciudad: "Ciudad",
                    },
                    Ciudad: "Ciudad",
                    Capital: "nombreProvincia",
                    provinciaUrl: "provinciaUrl",
                    ciudadUrl: "ciudadUrl",

                };
                const mapearInmueblesSpy = jest.spyOn(InmuebleComponent.prototype, "mapearInmueble").mockImplementation();
                const getInmuebleSpy = jest.spyOn(InmuebleService.prototype, "getInmueble").mockResolvedValue(inmuebleIdDtoMock);

                await component.getInmueble();

                expect(getInmuebleSpy).toHaveBeenCalledTimes(1);
                expect(getInmuebleSpy).toHaveBeenCalledWith("cordoba", "almodovar-del-rio", "2323232",);

                expect(mapearInmueblesSpy).toHaveBeenCalledTimes(1);
                expect(mapearInmueblesSpy).toHaveBeenCalledWith(inmuebleIdDtoMock);
            });
            it('Debe de no hacer nada si falla la llamada', async () => {
                const getInmuebleSpy = jest.spyOn(InmuebleService.prototype, "getInmueble").mockRejectedValue(new Error('No se ha encontrado el inmueble'));

                await component.getInmueble();

                expect(getInmuebleSpy).toHaveBeenCalledTimes(1);
                expect(getInmuebleSpy).toHaveBeenCalledWith("cordoba", "almodovar-del-rio", "2323232",);

            });
        });
        describe("mapearInmueble", () => {
            it('Debe de mapear y añadir los inmbuebles obtenidos a la lista general', async () => {
                const inmuebleMock = {
                    id: "id",
                    precio: "2323",
                    descripcion: "Descripcion",
                    imagen: "https://...",
                    direccion: {
                        nombreCalle: "estacion",
                        tipoVia: "calle",
                        ciudad: "Ciudad",
                        nombreProvincia: "nombreProvincia",
                        provinciaUrl: "provinciaUrl",
                        ciudadUrl: "ciudadUrl",
                        latitude: 40,
                        longitude: -100
                    }
                };
                const inmmobiliariaDtoMock: InmuebleIdDto = {
                    id: "id",
                    operacion: {
                        Precio: 2323,
                    },
                    Description: "Descripcion",
                    imagenes: [{
                        Uri: "https://..."
                    }],
                    address: {
                        StreetName: "estacion",
                        TipoVia: "calle",
                        Latitude: 40,
                        Longitude: -100,
                        Ciudad: "Ciudad",
                    },
                    Ciudad: "Ciudad",
                    Capital: "nombreProvincia",
                    provinciaUrl: "provinciaUrl",
                    ciudadUrl: "ciudadUrl",
                };

                component.mapearInmueble(inmmobiliariaDtoMock);
                expect(component.inmueble).toStrictEqual(inmuebleMock);
            });
        });

    });
});
