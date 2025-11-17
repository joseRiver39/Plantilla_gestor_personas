export interface Persona {
  id: number
  nombre: string
  apellido: string
  cedula: string
  telefono: string
  email: string
  direccion: string
  ciudad: string
  fechaNacimiento: string
  ocupacion: string
  estado: "activo" | "inactivo"
  createdAt: string
  updatedAt: string
}

// Datos dummy realistas para demostración
export const MOCK_PERSONAS: Persona[] = [
  {
    id: 1,
    nombre: "María",
    apellido: "González",
    cedula: "12345678",
    telefono: "+34 612 345 678",
    email: "maria.gonzalez@email.com",
    direccion: "Calle Mayor 123, Piso 4",
    ciudad: "Madrid",
    fechaNacimiento: "1985-03-15",
    ocupacion: "Ingeniera",
    estado: "activo",
    createdAt: "2024-01-15T10:30:00",
    updatedAt: "2024-01-15T10:30:00",
  },
  {
    id: 2,
    nombre: "Carlos",
    apellido: "Rodríguez",
    cedula: "23456789",
    telefono: "+34 623 456 789",
    email: "carlos.rodriguez@email.com",
    direccion: "Avenida Libertad 45",
    ciudad: "Barcelona",
    fechaNacimiento: "1990-07-22",
    ocupacion: "Diseñador",
    estado: "activo",
    createdAt: "2024-01-16T11:20:00",
    updatedAt: "2024-01-16T11:20:00",
  },
  {
    id: 3,
    nombre: "Ana",
    apellido: "Martínez",
    cedula: "34567890",
    telefono: "+34 634 567 890",
    email: "ana.martinez@email.com",
    direccion: "Plaza España 7",
    ciudad: "Valencia",
    fechaNacimiento: "1988-11-30",
    ocupacion: "Doctora",
    estado: "activo",
    createdAt: "2024-01-17T09:15:00",
    updatedAt: "2024-01-17T09:15:00",
  },
  {
    id: 4,
    nombre: "Pedro",
    apellido: "López",
    cedula: "45678901",
    telefono: "+34 645 678 901",
    email: "pedro.lopez@email.com",
    direccion: "Calle Sol 89",
    ciudad: "Sevilla",
    fechaNacimiento: "1992-05-18",
    ocupacion: "Abogado",
    estado: "inactivo",
    createdAt: "2024-01-18T14:30:00",
    updatedAt: "2024-01-18T14:30:00",
  },
  {
    id: 5,
    nombre: "Laura",
    apellido: "Sánchez",
    cedula: "56789012",
    telefono: "+34 656 789 012",
    email: "laura.sanchez@email.com",
    direccion: "Paseo Marítimo 234",
    ciudad: "Málaga",
    fechaNacimiento: "1995-09-25",
    ocupacion: "Arquitecta",
    estado: "activo",
    createdAt: "2024-01-19T16:45:00",
    updatedAt: "2024-01-19T16:45:00",
  },
  {
    id: 6,
    nombre: "Javier",
    apellido: "Fernández",
    cedula: "67890123",
    telefono: "+34 667 890 123",
    email: "javier.fernandez@email.com",
    direccion: "Ronda Norte 56",
    ciudad: "Bilbao",
    fechaNacimiento: "1987-12-10",
    ocupacion: "Profesor",
    estado: "activo",
    createdAt: "2024-01-20T08:00:00",
    updatedAt: "2024-01-20T08:00:00",
  },
  {
    id: 7,
    nombre: "Carmen",
    apellido: "Ruiz",
    cedula: "78901234",
    telefono: "+34 678 901 234",
    email: "carmen.ruiz@email.com",
    direccion: "Calle Luna 12",
    ciudad: "Zaragoza",
    fechaNacimiento: "1991-04-03",
    ocupacion: "Contadora",
    estado: "activo",
    createdAt: "2024-01-21T10:30:00",
    updatedAt: "2024-01-21T10:30:00",
  },
  {
    id: 8,
    nombre: "Miguel",
    apellido: "Díaz",
    cedula: "89012345",
    telefono: "+34 689 012 345",
    email: "miguel.diaz@email.com",
    direccion: "Avenida Central 78",
    ciudad: "Murcia",
    fechaNacimiento: "1989-08-14",
    ocupacion: "Periodista",
    estado: "inactivo",
    createdAt: "2024-01-22T12:00:00",
    updatedAt: "2024-01-22T12:00:00",
  },
  {
    id: 9,
    nombre: "Isabel",
    apellido: "Torres",
    cedula: "90123456",
    telefono: "+34 690 123 456",
    email: "isabel.torres@email.com",
    direccion: "Calle Flores 34",
    ciudad: "Granada",
    fechaNacimiento: "1993-02-28",
    ocupacion: "Farmacéutica",
    estado: "activo",
    createdAt: "2024-01-23T15:20:00",
    updatedAt: "2024-01-23T15:20:00",
  },
  {
    id: 10,
    nombre: "Antonio",
    apellido: "Jiménez",
    cedula: "01234567",
    telefono: "+34 601 234 567",
    email: "antonio.jimenez@email.com",
    direccion: "Plaza Mayor 9",
    ciudad: "Córdoba",
    fechaNacimiento: "1986-06-20",
    ocupacion: "Empresario",
    estado: "activo",
    createdAt: "2024-01-24T09:45:00",
    updatedAt: "2024-01-24T09:45:00",
  },
  {
    id: 11,
    nombre: "Rosa",
    apellido: "Moreno",
    cedula: "11223344",
    telefono: "+34 611 223 344",
    email: "rosa.moreno@email.com",
    direccion: "Calle Real 156",
    ciudad: "Alicante",
    fechaNacimiento: "1994-10-05",
    ocupacion: "Enfermera",
    estado: "activo",
    createdAt: "2024-01-25T11:00:00",
    updatedAt: "2024-01-25T11:00:00",
  },
  {
    id: 12,
    nombre: "Francisco",
    apellido: "Álvarez",
    cedula: "22334455",
    telefono: "+34 622 334 455",
    email: "francisco.alvarez@email.com",
    direccion: "Avenida del Puerto 88",
    ciudad: "Las Palmas",
    fechaNacimiento: "1990-01-12",
    ocupacion: "Piloto",
    estado: "activo",
    createdAt: "2024-01-26T13:30:00",
    updatedAt: "2024-01-26T13:30:00",
  },
]

export interface Stats {
  total: number
  activos: number
  inactivos: number
  ciudades: number
}

export function getStats(personas: Persona[]): Stats {
  return {
    total: personas.length,
    activos: personas.filter((p) => p.estado === "activo").length,
    inactivos: personas.filter((p) => p.estado === "inactivo").length,
    ciudades: new Set(personas.map((p) => p.ciudad)).size,
  }
}
