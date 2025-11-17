import { type NextRequest, NextResponse } from "next/server"
import { executeQuery } from "@/lib/db"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    if (!username || !password) {
      return NextResponse.json({ success: false, error: "Usuario y contraseña son requeridos" }, { status: 400 })
    }

    // Buscar usuario
    const users = await executeQuery<any[]>("SELECT * FROM usuarios WHERE username = ?", [username])

    if (users.length === 0) {
      return NextResponse.json({ success: false, error: "Credenciales inválidas" }, { status: 401 })
    }

    const user = users[0]

    // Verificar contraseña
    const passwordMatch = await bcrypt.compare(password, user.password_hash)

    if (!passwordMatch) {
      return NextResponse.json({ success: false, error: "Credenciales inválidas" }, { status: 401 })
    }

    // Generar JWT
    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET || "tu_clave_secreta", {
      expiresIn: "24h",
    })

    return NextResponse.json({
      success: true,
      token,
      user: {
        id: user.id,
        username: user.username,
        nombre_completo: user.nombre_completo,
      },
    })
  } catch (error: any) {
    console.error("[v0] Error en login:", error)
    return NextResponse.json({ success: false, error: "Error en el servidor" }, { status: 500 })
  }
}
