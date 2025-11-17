import { type NextRequest, NextResponse } from "next/server"
import { executeQuery } from "@/lib/db"
import * as XLSX from "xlsx"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ success: false, error: "No se proporcionó ningún archivo" }, { status: 400 })
    }

    // Leer archivo
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Parsear Excel
    const workbook = XLSX.read(buffer, { type: "buffer" })
    const sheetName = workbook.SheetNames[0]
    const worksheet = workbook.Sheets[sheetName]
    const data = XLSX.utils.sheet_to_json(worksheet)

    let imported = 0
    let errors = 0
    const errorDetails: string[] = []

    for (const row of data as any[]) {
      try {
        // Mapear campos (flexible para diferentes formatos)
        const persona = {
          nombre_completo: row["Nombre Completo"] || row["nombre_completo"] || row["Nombre"] || "",
          documento: row["Documento"] || row["documento"] || row["ID"] || "",
          edad: Number.parseInt(row["Edad"] || row["edad"] || "0"),
          genero: row["Género"] || row["Genero"] || row["genero"] || "Otro",
          direccion: row["Dirección"] || row["Direccion"] || row["direccion"] || "",
          telefono: row["Teléfono"] || row["Telefono"] || row["telefono"] || "",
          ocupacion: row["Ocupación"] || row["Ocupacion"] || row["ocupacion"] || "",
          estado: row["Estado"] || row["estado"] || "Activo",
          notas: row["Notas"] || row["notas"] || "",
        }

        // Validar campos requeridos
        if (!persona.nombre_completo || !persona.documento) {
          errorDetails.push(`Fila con documento ${persona.documento || "vacío"}: faltan campos requeridos`)
          errors++
          continue
        }

        // Verificar si ya existe
        const existing = await executeQuery<any[]>("SELECT id FROM personas WHERE documento = ?", [persona.documento])

        if (existing.length > 0) {
          // Actualizar si ya existe
          const query = `
            UPDATE personas 
            SET nombre_completo = ?, edad = ?, genero = ?, direccion = ?, 
                telefono = ?, ocupacion = ?, estado = ?, notas = ?
            WHERE documento = ?
          `
          await executeQuery(query, [
            persona.nombre_completo,
            persona.edad,
            persona.genero,
            persona.direccion,
            persona.telefono,
            persona.ocupacion,
            persona.estado,
            persona.notas,
            persona.documento,
          ])
        } else {
          // Insertar nuevo
          const query = `
            INSERT INTO personas 
            (nombre_completo, documento, edad, genero, direccion, telefono, ocupacion, estado, notas)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
          `
          await executeQuery(query, [
            persona.nombre_completo,
            persona.documento,
            persona.edad,
            persona.genero,
            persona.direccion,
            persona.telefono,
            persona.ocupacion,
            persona.estado,
            persona.notas,
          ])
        }

        imported++
      } catch (rowError: any) {
        errors++
        errorDetails.push(`Error en fila: ${rowError.message}`)
      }
    }

    return NextResponse.json({
      success: true,
      message: `Importación completada. ${imported} personas procesadas, ${errors} errores.`,
      imported,
      errors,
      errorDetails: errorDetails.slice(0, 10), // Limitar a 10 errores
    })
  } catch (error: any) {
    console.error("[v0] Error al importar:", error)
    return NextResponse.json({ success: false, error: error.message || "Error al importar datos" }, { status: 500 })
  }
}
