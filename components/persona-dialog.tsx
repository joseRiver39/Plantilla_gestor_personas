"use client"

import type React from "react"
import { useState, useEffect } from "react"
import type { Persona } from "@/lib/mock-data"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface PersonaDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  persona: Persona | null
  onSave: (persona: Omit<Persona, "id" | "createdAt" | "updatedAt"> | Persona) => void
}

export function PersonaDialog({ open, onOpenChange, persona, onSave }: PersonaDialogProps) {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    cedula: "",
    telefono: "",
    email: "",
    direccion: "",
    ciudad: "",
    fechaNacimiento: "",
    ocupacion: "",
    estado: "activo" as "activo" | "inactivo",
  })

  useEffect(() => {
    if (persona) {
      setFormData({
        nombre: persona.nombre,
        apellido: persona.apellido,
        cedula: persona.cedula,
        telefono: persona.telefono,
        email: persona.email,
        direccion: persona.direccion,
        ciudad: persona.ciudad,
        fechaNacimiento: persona.fechaNacimiento,
        ocupacion: persona.ocupacion,
        estado: persona.estado,
      })
    } else {
      setFormData({
        nombre: "",
        apellido: "",
        cedula: "",
        telefono: "",
        email: "",
        direccion: "",
        ciudad: "",
        fechaNacimiento: "",
        ocupacion: "",
        estado: "activo",
      })
    }
  }, [persona, open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (persona) {
      // Editar existente - incluir id
      onSave({ ...persona, ...formData })
    } else {
      // Crear nueva - sin id
      onSave(formData)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{persona ? "Editar Persona" : "Agregar Nueva Persona"}</DialogTitle>
          <DialogDescription>
            Complete la información de la persona. Los campos con * son obligatorios.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nombre" className="text-base">
                Nombre *
              </Label>
              <Input
                id="nombre"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                placeholder="María"
                className="h-11"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="apellido" className="text-base">
                Apellido *
              </Label>
              <Input
                id="apellido"
                value={formData.apellido}
                onChange={(e) => setFormData({ ...formData, apellido: e.target.value })}
                placeholder="González"
                className="h-11"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cedula" className="text-base">
                Cédula/DNI *
              </Label>
              <Input
                id="cedula"
                value={formData.cedula}
                onChange={(e) => setFormData({ ...formData, cedula: e.target.value })}
                placeholder="12345678"
                className="h-11"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="telefono" className="text-base">
                Teléfono *
              </Label>
              <Input
                id="telefono"
                type="tel"
                value={formData.telefono}
                onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                placeholder="+34 612 345 678"
                className="h-11"
                required
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="email" className="text-base">
                Email *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="ejemplo@email.com"
                className="h-11"
                required
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="direccion" className="text-base">
                Dirección *
              </Label>
              <Input
                id="direccion"
                value={formData.direccion}
                onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                placeholder="Calle Mayor 123, Piso 4"
                className="h-11"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ciudad" className="text-base">
                Ciudad *
              </Label>
              <Input
                id="ciudad"
                value={formData.ciudad}
                onChange={(e) => setFormData({ ...formData, ciudad: e.target.value })}
                placeholder="Madrid"
                className="h-11"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fechaNacimiento" className="text-base">
                Fecha de Nacimiento *
              </Label>
              <Input
                id="fechaNacimiento"
                type="date"
                value={formData.fechaNacimiento}
                onChange={(e) => setFormData({ ...formData, fechaNacimiento: e.target.value })}
                className="h-11"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ocupacion" className="text-base">
                Ocupación *
              </Label>
              <Input
                id="ocupacion"
                value={formData.ocupacion}
                onChange={(e) => setFormData({ ...formData, ocupacion: e.target.value })}
                placeholder="Ingeniera"
                className="h-11"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="estado" className="text-base">
                Estado *
              </Label>
              <Select
                value={formData.estado}
                onValueChange={(value: "activo" | "inactivo") => setFormData({ ...formData, estado: value })}
              >
                <SelectTrigger className="h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="activo">Activo</SelectItem>
                  <SelectItem value="inactivo">Inactivo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} size="lg">
              Cancelar
            </Button>
            <Button type="submit" size="lg">
              {persona ? "Actualizar Persona" : "Crear Persona"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
