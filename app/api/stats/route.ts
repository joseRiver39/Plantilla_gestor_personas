import { NextResponse } from "next/server"
import { executeQuery } from "@/lib/db"

export async function GET() {
  try {
    // Total de personas
    const totalResult = await executeQuery<any[]>("SELECT COUNT(*) as total FROM personas", [])
    const total = totalResult[0].total

    // Por estado
    const porEstado = await executeQuery<any[]>("SELECT estado, COUNT(*) as count FROM personas GROUP BY estado", [])

    // Por género
    const porGenero = await executeQuery<any[]>("SELECT genero, COUNT(*) as count FROM personas GROUP BY genero", [])

    // Top ocupaciones
    const topOcupaciones = await executeQuery<any[]>(
      "SELECT ocupacion, COUNT(*) as count FROM personas GROUP BY ocupacion ORDER BY count DESC LIMIT 10",
      [],
    )

    return NextResponse.json({
      success: true,
      data: {
        total,
        porEstado,
        porGenero,
        topOcupaciones,
      },
    })
  } catch (error: any) {
    console.error("[v0] Error al obtener estadísticas:", error)
    return NextResponse.json(
      { success: false, error: error.message || "Error al obtener estadísticas" },
      { status: 500 },
    )
  }
}
