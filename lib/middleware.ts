import type { NextRequest } from "next/server"
// import jwt from "jsonwebtoken"

// export function verifyToken(request: NextRequest): { valid: boolean; userId?: number; username?: string } {
//   try {
//     const authHeader = request.headers.get("authorization")

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return { valid: false }
//     }

//     const token = authHeader.substring(7)
//     const decoded = jwt.verify(token, process.env.JWT_SECRET || "tu_clave_secreta") as {
//       id: number
//       username: string
//     }

//     return { valid: true, userId: decoded.id, username: decoded.username }
//   } catch (error) {
//     return { valid: false }
//   }
// }
