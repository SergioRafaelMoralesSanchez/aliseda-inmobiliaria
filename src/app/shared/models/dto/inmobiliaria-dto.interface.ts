export interface InmmobiliariaDto {
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
    Latitude: number
    Longitude: number
    imagenes: Imagen[]
}

export interface Imagen {
    Uri: string
}
