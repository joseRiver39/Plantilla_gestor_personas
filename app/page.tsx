"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Database, Users, TrendingUp, Shield } from "lucide-react"

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    router.push("/dashboard")
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="space-y-1 text-center">
          <div className="flex items-center justify-center mb-4">
            <Database className="h-16 w-16 text-primary" />
          </div>
          <CardTitle className="text-4xl font-bold">GestorLocalPersonas</CardTitle>
          <CardDescription className="text-lg">
            Sistema de gestión inteligente para más de 1000 personas
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
              <Users className="h-8 w-8 text-primary mb-2" />
              <p className="text-sm font-medium text-center">Gestión Completa</p>
            </div>
            <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
              <TrendingUp className="h-8 w-8 text-primary mb-2" />
              <p className="text-sm font-medium text-center">Online/Offline</p>
            </div>
            <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
              <Shield className="h-8 w-8 text-primary mb-2" />
              <p className="text-sm font-medium text-center">Seguro y Rápido</p>
            </div>
          </div>

          <Button onClick={() => router.push("/dashboard")} className="w-full" size="lg">
            <Database className="mr-2 h-5 w-5" />
            Ver Demo con Datos
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            Demo con datos de prueba - Sin conexión a base de datos requerida
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
