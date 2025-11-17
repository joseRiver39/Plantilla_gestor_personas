"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Download, Edit, Trash2, Users, Filter, Database } from "lucide-react"
import { MOCK_PERSONAS, getStats, type Persona } from "@/lib/mock-data"
import { PersonaDialog } from "@/components/persona-dialog"
import { useToast } from "@/hooks/use-toast"

export default function DashboardPage() {
  const { toast } = useToast()

  const [personas, setPersonas] = useState<Persona[]>(MOCK_PERSONAS)

  // Filtros
  const [searchNombre, setSearchNombre] = useState("")
  const [searchCedula, setSearchCedula] = useState("")
  const [searchCiudad, setSearchCiudad] = useState("")
  const [searchEstado, setSearchEstado] = useState("todos")

  // Dialog state
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingPersona, setEditingPersona] = useState<Persona | null>(null)

  const personasFiltradas = personas.filter((persona) => {
    const matchNombre =
      searchNombre === "" || `${persona.nombre} ${persona.apellido}`.toLowerCase().includes(searchNombre.toLowerCase())
    const matchCedula = searchCedula === "" || persona.cedula.includes(searchCedula)
    const matchCiudad = searchCiudad === "" || persona.ciudad.toLowerCase().includes(searchCiudad.toLowerCase())
    const matchEstado = searchEstado === "todos" || persona.estado === searchEstado

    return matchNombre && matchCedula && matchCiudad && matchEstado
  })

  const stats = getStats(personas)

  const handleDelete = (id: number) => {
    if (!confirm("¿Estás seguro de eliminar esta persona?")) return

    setPersonas((prev) => prev.filter((p) => p.id !== id))
    toast({
      title: "Persona eliminada",
      description: "La persona fue eliminada exitosamente del demo",
    })
  }

  const handleSave = (persona: Omit<Persona, "id" | "createdAt" | "updatedAt"> | Persona) => {
    if ("id" in persona) {
      // Editar existente
      setPersonas((prev) =>
        prev.map((p) => (p.id === persona.id ? { ...persona, updatedAt: new Date().toISOString() } : p)),
      )
      toast({
        title: "Persona actualizada",
        description: "Los cambios se guardaron correctamente",
      })
    } else {
      // Crear nueva
      const newPersona: Persona = {
        ...persona,
        id: Math.max(...personas.map((p) => p.id)) + 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      setPersonas((prev) => [...prev, newPersona])
      toast({
        title: "Persona creada",
        description: "La nueva persona fue agregada exitosamente",
      })
    }
    setDialogOpen(false)
    setEditingPersona(null)
  }

  const handleExport = () => {
    const dataStr = JSON.stringify(personasFiltradas, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = `personas-${new Date().toISOString().split("T")[0]}.json`
    link.click()
    URL.revokeObjectURL(url)

    toast({
      title: "Exportación exitosa",
      description: `${personasFiltradas.length} personas exportadas a JSON`,
    })
  }

  const clearFilters = () => {
    setSearchNombre("")
    setSearchCedula("")
    setSearchCiudad("")
    setSearchEstado("todos")
  }

  const calcularEdad = (fechaNacimiento: string) => {
    const hoy = new Date()
    const nacimiento = new Date(fechaNacimiento)
    let edad = hoy.getFullYear() - nacimiento.getFullYear()
    const mes = hoy.getMonth() - nacimiento.getMonth()
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--
    }
    return edad
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="border-b bg-card shadow-sm">
        <div className="container mx-auto px-4 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Database className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">GestorLocalPersonas</h1>
                <p className="text-sm text-muted-foreground">Demo con datos de prueba</p>
              </div>
            </div>
            <Badge variant="outline" className="text-sm px-3 py-1">
              Modo Demo - Sin BD
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Estadísticas */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Personas</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground mt-1">Registros en el sistema</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Activos</CardTitle>
              <div className="h-3 w-3 bg-green-500 rounded-full" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{stats.activos}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {((stats.activos / stats.total) * 100).toFixed(0)}% del total
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Inactivos</CardTitle>
              <div className="h-3 w-3 bg-gray-400 rounded-full" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-600">{stats.inactivos}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {((stats.inactivos / stats.total) * 100).toFixed(0)}% del total
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ciudades</CardTitle>
              <Database className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.ciudades}</div>
              <p className="text-xs text-muted-foreground mt-1">Diferentes ubicaciones</p>
            </CardContent>
          </Card>
        </div>

        {/* Panel de Control */}
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle className="text-2xl">Gestión de Personas</CardTitle>
                <CardDescription className="text-base mt-1">
                  Administra y organiza la información de contactos
                </CardDescription>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  onClick={() => {
                    setEditingPersona(null)
                    setDialogOpen(true)
                  }}
                  size="lg"
                >
                  <Plus className="mr-2 h-5 w-5" />
                  Agregar Persona
                </Button>
                <Button variant="outline" size="lg" onClick={handleExport}>
                  <Download className="mr-2 h-5 w-5" />
                  Exportar
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Filtros */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Nombre</label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por nombre..."
                    value={searchNombre}
                    onChange={(e) => setSearchNombre(e.target.value)}
                    className="pl-9 h-11"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Cédula</label>
                <Input
                  placeholder="Buscar por cédula..."
                  value={searchCedula}
                  onChange={(e) => setSearchCedula(e.target.value)}
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Ciudad</label>
                <Input
                  placeholder="Buscar por ciudad..."
                  value={searchCiudad}
                  onChange={(e) => setSearchCiudad(e.target.value)}
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Estado</label>
                <Select value={searchEstado} onValueChange={setSearchEstado}>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos los estados</SelectItem>
                    <SelectItem value="activo">Activo</SelectItem>
                    <SelectItem value="inactivo">Inactivo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <Button variant="outline" onClick={clearFilters}>
                <Filter className="mr-2 h-4 w-4" />
                Limpiar Filtros
              </Button>
              <span className="text-sm text-muted-foreground">
                Mostrando {personasFiltradas.length} de {personas.length} personas
              </span>
            </div>

            {/* Tabla */}
            <div className="border rounded-lg overflow-hidden bg-card">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="w-[60px] font-semibold">ID</TableHead>
                      <TableHead className="font-semibold">Nombre Completo</TableHead>
                      <TableHead className="font-semibold">Cédula</TableHead>
                      <TableHead className="font-semibold">Edad</TableHead>
                      <TableHead className="font-semibold">Teléfono</TableHead>
                      <TableHead className="font-semibold">Ciudad</TableHead>
                      <TableHead className="font-semibold">Ocupación</TableHead>
                      <TableHead className="font-semibold">Estado</TableHead>
                      <TableHead className="text-right font-semibold">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {personasFiltradas.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={9} className="text-center py-12">
                          <div className="flex flex-col items-center gap-2">
                            <Users className="h-12 w-12 text-muted-foreground/50" />
                            <p className="text-muted-foreground font-medium">
                              No se encontraron personas con los filtros aplicados
                            </p>
                            <Button variant="link" onClick={clearFilters}>
                              Limpiar filtros
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : (
                      personasFiltradas.map((persona) => (
                        <TableRow key={persona.id} className="hover:bg-muted/30">
                          <TableCell className="font-medium">{persona.id}</TableCell>
                          <TableCell className="font-medium">
                            {persona.nombre} {persona.apellido}
                          </TableCell>
                          <TableCell className="font-mono text-sm">{persona.cedula}</TableCell>
                          <TableCell>{calcularEdad(persona.fechaNacimiento)} años</TableCell>
                          <TableCell className="text-sm">{persona.telefono}</TableCell>
                          <TableCell>{persona.ciudad}</TableCell>
                          <TableCell>{persona.ocupacion}</TableCell>
                          <TableCell>
                            <Badge
                              variant={persona.estado === "activo" ? "default" : "secondary"}
                              className="capitalize"
                            >
                              {persona.estado}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setEditingPersona(persona)
                                  setDialogOpen(true)
                                }}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => handleDelete(persona.id)}>
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Dialog para Crear/Editar */}
      <PersonaDialog open={dialogOpen} onOpenChange={setDialogOpen} persona={editingPersona} onSave={handleSave} />
    </div>
  )
}
