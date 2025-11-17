import { type NextRequest, NextResponse } from "next/server"
import { executeQuery } from "@/lib/db"
import type { Persona } from "@/lib/types"
import * as XLSX from "xlsx"

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

    if (estado && estado !== "all") {
      query += " AND estado = ?"
      params.push(estado)
    }

    query += " ORDER BY nombre_completo ASC"

    const personas = await executeQuery<Persona[]>(query, params)

    // Formatear datos para Excel
    const excelData = personas.map((p) => ({
      ID: p.id,
      "Nombre Completo": p.nombre_completo,
      Documento: p.documento,
      Edad: p.edad,
      Género: p.genero,
      Dirección: p.direccion,
      Teléfono: p.telefono,
      Ocupación: p.ocupacion,
      Estado: p.estado,
      Notas: p.notas,
      "Fecha Creación": new Date(p.created_at).toLocaleString("es-ES"),
      "Última Actualización": new Date(p.updated_at).toLocaleString("es-ES"),
    }))

    // Crear workbook
    const worksheet = XLSX.utils.json_to_sheet(excelData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Personas")

    // Ajustar ancho de columnas
    const columnWidths = [
      { wch: 5 }, // ID
      { wch: 25 }, // Nombre
      { wch: 15 }, // Documento
      { wch: 6 }, // Edad
      { wch: 12 }, // Género
      { wch: 30 }, // Dirección
      { wch: 15 }, // Teléfono
      { wch: 20 }, // Ocupación
      { wch: 10 }, // Estado
      { wch: 40 }, // Notas
      { wch: 18 }, // Fecha Creación
      { wch: 18 }, // Última Actualización
    ]
    worksheet["!cols"] = columnWidths

    // Convertir a buffer
    const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" })

    // Retornar archivo
    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="personas-${new Date().toISOString().split("T")[0]}.xlsx"`,
      },
    })
  } catch (error: any) {
    console.error("[v0] Error al exportar:", error)
    return NextResponse.json({ success: false, error: error.message || "Error al exportar datos" }, { status: 500 })
  }
}
