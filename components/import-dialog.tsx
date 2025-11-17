"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Upload, FileSpreadsheet, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface ImportDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
}

export function ImportDialog({ open, onOpenChange, onSuccess }: ImportDialogProps) {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [result, setResult] = useState<any>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      const validTypes = [
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-excel",
        "text/csv",
      ]
      if (
        validTypes.includes(selectedFile.type) ||
        selectedFile.name.endsWith(".xlsx") ||
        selectedFile.name.endsWith(".xls") ||
        selectedFile.name.endsWith(".csv")
      ) {
        setFile(selectedFile)
        setResult(null)
      } else {
        toast({
          title: "Formato inválido",
          description: "Por favor selecciona un archivo Excel (.xlsx, .xls) o CSV",
          variant: "destructive",
        })
      }
    }
  }

  const handleImport = async () => {
    if (!file) {
      toast({
        title: "Error",
        description: "Por favor selecciona un archivo",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/import", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (data.success) {
        setResult(data)
        toast({
          title: "Importación exitosa",
          description: data.message,
        })
        onSuccess()
      } else {
        toast({
          title: "Error en la importación",
          description: data.error || "No se pudo importar el archivo",
          variant: "destructive",
        })
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Error de conexión al importar",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setFile(null)
    setResult(null)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Importar Personas desde Excel/CSV</DialogTitle>
          <DialogDescription>Selecciona un archivo Excel o CSV con los datos de las personas</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              El archivo debe contener las columnas: Nombre Completo, Documento, Edad, Género. Las demás columnas son
              opcionales (Dirección, Teléfono, Ocupación, Estado, Notas).
            </AlertDescription>
          </Alert>

          <div className="space-y-2">
            <Label htmlFor="file-upload">Archivo Excel/CSV</Label>
            <div className="flex items-center gap-2">
              <Input
                id="file-upload"
                type="file"
                accept=".xlsx,.xls,.csv"
                onChange={handleFileChange}
                disabled={loading}
              />
              {file && <FileSpreadsheet className="h-5 w-5 text-green-600" />}
            </div>
            {file && <p className="text-sm text-muted-foreground">Archivo seleccionado: {file.name}</p>}
          </div>

          {result && (
            <Alert>
              <AlertDescription>
                <div className="space-y-1">
                  <p className="font-medium">Resultado de la importación:</p>
                  <p>Personas procesadas: {result.imported}</p>
                  {result.errors > 0 && <p className="text-destructive">Errores: {result.errors}</p>}
                  {result.errorDetails && result.errorDetails.length > 0 && (
                    <div className="mt-2 text-xs">
                      <p className="font-medium">Detalles de errores:</p>
                      <ul className="list-disc pl-4 mt-1">
                        {result.errorDetails.map((err: string, i: number) => (
                          <li key={i}>{err}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </AlertDescription>
            </Alert>
          )}

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={handleClose} disabled={loading}>
              Cerrar
            </Button>
            <Button onClick={handleImport} disabled={loading || !file}>
              <Upload className="mr-2 h-4 w-4" />
              {loading ? "Importando..." : "Importar"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
