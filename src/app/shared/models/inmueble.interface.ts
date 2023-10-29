export interface Inmueble {
    id: string
    precio: string
    imagen: string
    descripcion: string
    direccion: {
        nombreCalle: string
        tipoVia: string
        ciudad: string
        nombreProvincia: string
        provinciaUrl: string
        ciudadUrl: string
        latitude: number
        longitude: number
    }
}