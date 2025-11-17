import { type NextRequest, NextResponse } from "next/server"
import { verifyToken } from "@/lib/middleware"

export async function GET(request: NextRequest) {
  const verification = verifyToken(request)

  if (!verification.valid) {
    return NextResponse.json({ success: false, error: "Token inválido o expirado" }, { status: 401 })
  }

  return NextResponse.json({
    success: true,
    user: {
      id: verification.userId,
      username: verification.username,
    },
  })
}
