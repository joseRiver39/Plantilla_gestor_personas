import { type NextRequest, NextResponse } from "next/server"
import { executeQuery } from "@/lib/db"
// import bcrypt from "bcrypt"

// export async function POST(request: NextRequest) {
//   try {
//     const { username, currentPassword, newPassword } = await request.json()

//     if (!username || !currentPassword || !newPassword) {
//       return NextResponse.json({ success: false, error: "Todos los campos son requeridos" }, { status: 400 })
//     }

//     // Verificar contraseña actual
//     const users = await executeQuery<any[]>("SELECT * FROM usuarios WHERE username = ?", [username])

//     if (users.length === 0) {
//       return NextResponse.json({ success: false, error: "Usuario no encontrado" }, { status: 404 })
//     }

//     const user = users[0]
//     const passwordMatch = await bcrypt.compare(currentPassword, user.password_hash)

//     if (!passwordMatch) {
//       return NextResponse.json({ success: false, error: "Contraseña actual incorrecta" }, { status: 401 })
//     }

//     // Generar nuevo hash
//     const newHash = await bcrypt.hash(newPassword, 10)

//     // Actualizar contraseña
//     await executeQuery("UPDATE usuarios SET password_hash = ? WHERE id = ?", [newHash, user.id])

//     return NextResponse.json({
//       success: true,
//       message: "Contraseña actualizada exitosamente",
//     })
//   } catch (error: any) {
//     console.error("[v0] Error al cambiar contraseña:", error)
//     return NextResponse.json({ success: false, error: "Error en el servidor" }, { status: 500 })
//   }
// }
