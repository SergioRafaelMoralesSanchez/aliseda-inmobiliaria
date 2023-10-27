import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Inmueble } from "../../../../shared/models/inmueble.interface";
import { InmuebleService } from "../../services/inmueble.service";

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
            const inmuebleRaw = await this.inmuebleService.getInmueble(routes["provinciaUrl"], routes["poblacionUrl"], routes["idInmueble"]) as Root;
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
        } catch (error) {
            // TODO controlar errores
            console.error(error);
        } finally {
            this.loading = false;
        }
    }
}
export interface Root {
    id: string
    original_id: string
    IdUnico: string
    FkTipo: number
    FkSubtipo: number
    ConstructedArea: number
    PromoReference: string
    UsableArea: number
    UrlYoutube: string
    UrlTourVirtual: string
    Decorview: string
    PlanosUrl: string
    idExternoGestor: number
    EnergyRating: string
    SupParcela: number
    Comercializacion: string
    RefCatastral: string
    NumImagen: number
    LastModifiedDate: string
    Patrocinado: number
    Excent: number
    Destacado: number
    Estrenar: number
    EstadoObra: string
    Activo: number
    CampanaEspecial: number
    DestacadoPromocion: number
    Imagen: string
    Relevancy: number
    servicer: string
    estadoAlquiler: string
    posesion: string
    scoring: string
    SuperficieTotal: number
    emailGestorVentaDigital: string
    nombreGestorVentaDigital: string
    perimetro: string
    idTier: number
    redComercial: string
    fechaInicioTransparencia: string
    fechaFinTransparencia: string
    ventaOnlineExclusiva: number
    urlVentaExclusiva: string
    situacionEspecial: string
    Proindiviso: string
    PrecioAlquiler: string
    FechaFinContratoAlquiler: string
    Particular: number
    Description: string
    Metadescription: string
    provinciaUrl: string
    ciudadUrl: string
    Capital: string
    Ciudad: string
    gStaticMapImage: string
    bookingBlocked: number
    visitBlocked: number
    originalId: string
    Campanas: boolean
    vivienda: Vivienda
    comercial: Comercial
    suelonave: Suelonave
    address: Address
    operacion: Operacion
    imagenes: Imagene[]
}

export interface Vivienda {
    FkPropiedad: string
    Bathrooms: number
    Bedrooms: number
    RentabilidadActivo: number
    Trastero: number
    NumTrasteros: number
    Garage: number
    NumGarages: number
    AireAcondicionado: number
    CocinaAmueblada: number
    Ascensor: number
    Piscina: number
    Terraza: number
    Calefaccion: number
    PorteroAutomatico: number
    PorteroFisico: number
    PiscinaComunitaria: number
    PiscinaPropia: number
    JardinComunitario: number
    JardinPropio: number
    Plantas: number
}

export interface Comercial {
    FkPropiedad: string
    SuperficieParcela: number
    NroPlantas: number
    Proindiviso: string
    EstadoOcupacional: string
    SupSobreRasante: number
    SupBajoRasante: number
    PlantasSRasante: number
    TipologiaActividad: string
    SupOficinas: number
    Restaurante: number
    TipoHotel: string
    FachadaML: number
    SuperficieTerciario: number
    AsesorComercial: number
}

export interface Suelonave {
    FkPropiedad: string
    SupConstruidaPB: number
    SupConstruidaPiso1: number
    SupConstruidaPiso2: number
    SupAlmacen: number
    SupOficinas: any
    SuperficieTerciario: number
    SupParcelaTerc: number
    Altura: number
    NroMuelles: number
    NroPortones: number
    Distribucion: string
    Categoria: string
    EstadoConservacion: string
    SalidaHumos: number
    Edificabilidad: string
    Uso: string
    PorcAmbito: number
    PorcentajeTitularidad: number
    PorcObraEjecutada: number
    SubUso: string
    Campa: number
}

export interface Address {
    FkPropiedad: string
    FkCiudad: number
    Ciudad: string
    FkProvincia: number
    StreetName: string
    StreetNumber: string
    Cercanias: string
    PostalCode: string
    Autobus: string
    Carretera: string
    TipoVia: string
    Bloque: string
    Escalera: string
    Piso: string
    Planta: string
    Puerta: string
    Latitude: number
    Longitude: number
    gStaticMapImage: string
}

export interface Operacion {
    FkPropiedad: string
    FechaPublicacion: string
    DescuentoPrecio: number
    Precio: number
    PrecioAnterior: number
    VentaOnline: number
    CitaVirtual: number
    VisitaFisica: number
    Rebajado: number
    Agente: string
    PorcentajeOferta: string
}

export interface Imagene {
    PkImagen: number
    FkPropiedad: string
    Orden: string
    Uri: string
}
