export interface Persona {
  id: number
  nombre_completo: string
  documento: string
  edad: number
  genero: "Masculino" | "Femenino" | "Otro" | "Prefiero no decir"
  direccion: string
  telefono: string
  ocupacion: string
  estado: string
  notas: string
  created_at: string
  updated_at: string
}

export interface CreatePersonaInput {
  nombre_completo: string
  documento: string
  edad: number
  genero: "Masculino" | "Femenino" | "Otro" | "Prefiero no decir"
  direccion: string
  telefono: string
  ocupacion: string
  estado: string
  notas: string
}

export interface Usuario {
  id: number
  username: string
  nombre_completo: string
  created_at: string
}
