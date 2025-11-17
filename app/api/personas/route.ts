import { type NextRequest, NextResponse } from "next/server"
import { executeQuery } from "@/lib/db"
import type { Persona, CreatePersonaInput } from "@/lib/types"

// GET - Listar todas las personas con filtros opcionales
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const nombre = searchParams.get("nombre")
    const documento = searchParams.get("documento")
    const ocupacion = searchParams.get("ocupacion")
    const estado = searchParams.get("estado")

    let query = "SELECT * FROM personas WHERE 1=1"
    const params: any[] = []

    if (nombre) {
      query += " AND nombre_completo LIKE ?"
      params.push(`%${nombre}%`)
    }

    if (documento) {
      query += " AND documento LIKE ?"
      params.push(`%${documento}%`)
    }

    if (ocupacion) {
      query += " AND ocupacion LIKE ?"
      params.push(`%${ocupacion}%`)
    }

    if (estado) {
      query += " AND estado = ?"
      params.push(estado)
    }

    query += " ORDER BY nombre_completo ASC"

    const personas = await executeQuery<Persona[]>(query, params)

    return NextResponse.json({
      success: true,
      data: personas,
      count: personas.length,
    })
  } catch (error: any) {
    console.error("[v0] Error al obtener personas:", error)
    return NextResponse.json({ success: false, error: error.message || "Error al obtener personas" }, { status: 500 })
  }
}

// POST - Crear nueva persona
export async function POST(request: NextRequest) {
  try {
    const body: CreatePersonaInput = await request.json()

    // Validación básica
    if (!body.nombre_completo || !body.documento || !body.edad || !body.genero) {
      return NextResponse.json(
        { success: false, error: "Faltan campos requeridos: nombre_completo, documento, edad, genero" },
        { status: 400 },
      )
    }

    // Verificar si el documento ya existe
    const existing = await executeQuery<any[]>("SELECT id FROM personas WHERE documento = ?", [body.documento])

    if (existing.length > 0) {
      return NextResponse.json({ success: false, error: "Ya existe una persona con este documento" }, { status: 409 })
    }

    const query = `
      INSERT INTO personas 
      (nombre_completo, documento, edad, genero, direccion, telefono, ocupacion, estado, notas)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `

    const result = await executeQuery<any>(query, [
      body.nombre_completo,
      body.documento,
      body.edad,
      body.genero,
      body.direccion || "",
      body.telefono || "",
      body.ocupacion || "",
      body.estado || "Activo",
      body.notas || "",
    ])

    const newPersona = await executeQuery<Persona[]>("SELECT * FROM personas WHERE id = ?", [result.insertId])

    return NextResponse.json(
      {
        success: true,
        data: newPersona[0],
        message: "Persona creada exitosamente",
      },
      { status: 201 },
    )
  } catch (error: any) {
    console.error("[v0] Error al crear persona:", error)
    return NextResponse.json({ success: false, error: error.message || "Error al crear persona" }, { status: 500 })
  }
}
