export interface InmuebleIdDto {
    id: string
    Description: string
    provinciaUrl: string
    ciudadUrl: string
    Capital: string
    Ciudad: string
    address: Address
    operacion: { Precio: number }
    imagenes: { Uri: string }[]
}

export interface Address {
    Ciudad: string
    StreetName: string
    TipoVia: string
    Latitude: number
    Longitude: number
}
