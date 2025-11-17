import { type NextRequest, NextResponse } from "next/server"
import { executeQuery } from "@/lib/db"
import type { Persona, CreatePersonaInput } from "@/lib/types"

// GET - Obtener una persona por ID
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const personas = await executeQuery<Persona[]>("SELECT * FROM personas WHERE id = ?", [id])

    if (personas.length === 0) {
      return NextResponse.json({ success: false, error: "Persona no encontrada" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: personas[0],
    })
  } catch (error: any) {
    console.error("[v0] Error al obtener persona:", error)
    return NextResponse.json({ success: false, error: error.message || "Error al obtener persona" }, { status: 500 })
  }
}

// PUT - Actualizar persona
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body: CreatePersonaInput = await request.json()

    // Verificar si la persona existe
    const existing = await executeQuery<Persona[]>("SELECT * FROM personas WHERE id = ?", [id])

    if (existing.length === 0) {
      return NextResponse.json({ success: false, error: "Persona no encontrada" }, { status: 404 })
    }

    // Verificar si el documento está duplicado
    if (body.documento && body.documento !== existing[0].documento) {
      const duplicate = await executeQuery<any[]>("SELECT id FROM personas WHERE documento = ? AND id != ?", [
        body.documento,
        id,
      ])

      if (duplicate.length > 0) {
        return NextResponse.json(
          { success: false, error: "Ya existe otra persona con este documento" },
          { status: 409 },
        )
      }
    }

    const query = `
      UPDATE personas 
      SET nombre_completo = ?, documento = ?, edad = ?, genero = ?, 
          direccion = ?, telefono = ?, ocupacion = ?, estado = ?, notas = ?
      WHERE id = ?
    `

    await executeQuery(query, [
      body.nombre_completo,
      body.documento,
      body.edad,
      body.genero,
      body.direccion || "",
      body.telefono || "",
      body.ocupacion || "",
      body.estado || "Activo",
      body.notas || "",
      id,
    ])

    const updated = await executeQuery<Persona[]>("SELECT * FROM personas WHERE id = ?", [id])

    return NextResponse.json({
      success: true,
      data: updated[0],
      message: "Persona actualizada exitosamente",
    })
  } catch (error: any) {
    console.error("[v0] Error al actualizar persona:", error)
    return NextResponse.json({ success: false, error: error.message || "Error al actualizar persona" }, { status: 500 })
  }
}

// DELETE - Eliminar persona
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    // Verificar si la persona existe
    const existing = await executeQuery<Persona[]>("SELECT * FROM personas WHERE id = ?", [id])

    if (existing.length === 0) {
      return NextResponse.json({ success: false, error: "Persona no encontrada" }, { status: 404 })
    }

    await executeQuery("DELETE FROM personas WHERE id = ?", [id])

    return NextResponse.json({
      success: true,
      message: "Persona eliminada exitosamente",
    })
  } catch (error: any) {
    console.error("[v0] Error al eliminar persona:", error)
    return NextResponse.json({ success: false, error: error.message || "Error al eliminar persona" }, { status: 500 })
  }
}
