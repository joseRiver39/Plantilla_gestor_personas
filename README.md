# GestorLocalPersonas - Demo Interactivo

Sistema de gestión de personas diseñado para manejar más de 1000 registros con capacidad de funcionar **online y offline**.

## Estado Actual: Demo con Datos de Prueba

Este es un **demo completamente funcional** que te permite evaluar la interfaz y funcionalidades antes de elegir la tecnología de base de datos.

### Características del Demo

- **12 personas con datos realistas** para probar todas las funcionalidades
- **CRUD completo** - Crear, leer, actualizar y eliminar personas
- **Filtros avanzados** - Buscar por nombre, cédula, ciudad y estado
- **Estadísticas en tiempo real** - Totales, activos, inactivos y ciudades únicas
- **Exportación a JSON** - Descarga los datos filtrados
- **Interfaz moderna y responsive** - Diseño optimizado para escritorio y móvil
- **Sin configuración necesaria** - Todo funciona en memoria (los datos se pierden al recargar)

### Cómo Usar el Demo

1. Abre la aplicación - se carga directamente el dashboard
2. Explora las 12 personas de ejemplo en la tabla
3. Prueba los filtros de búsqueda por nombre, cédula, ciudad o estado
4. Agrega nuevas personas con el botón "Agregar Persona"
5. Edita o elimina registros usando los íconos de acción
6. Exporta los datos con el botón "Exportar"

## Estructura de Datos

Cada persona contiene los siguientes campos:

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | Número | ID único autogenerado |
| nombre | Texto | Nombre de la persona |
| apellido | Texto | Apellido de la persona |
| cedula | Texto | Cédula o documento de identidad |
| telefono | Texto | Número de teléfono con formato internacional |
| email | Texto | Correo electrónico |
| direccion | Texto | Dirección completa |
| ciudad | Texto | Ciudad de residencia |
| fechaNacimiento | Fecha | Fecha de nacimiento (se calcula edad automáticamente) |
| ocupacion | Texto | Profesión u ocupación |
| estado | Selección | "activo" o "inactivo" |
| createdAt | Timestamp | Fecha de creación del registro |
| updatedAt | Timestamp | Última fecha de actualización |

## Próximos Pasos: Elegir Base de Datos

### Opción 1: Aplicación Web con IndexedDB
**Ideal para:** Acceso desde navegador sin instalación

**Ventajas:**
- ✅ Funciona 100% offline en el navegador
- ✅ No requiere instalación de software
- ✅ Compatible con Progressive Web App (PWA)
- ✅ Puede convertirse en app móvil
- ✅ Sincronización opcional con servidor

**Desventajas:**
- ⚠️ Limitado por el almacenamiento del navegador (~50-100 MB)
- ⚠️ Consultas menos potentes que SQL

**Mejor para:** Equipos que quieren acceso web sin instalar nada

---

### Opción 2: Aplicación de Escritorio con SQLite
**Ideal para:** Instalación en computadora con máximo rendimiento

**Ventajas:**
- ✅ Base de datos robusta en archivo local
- ✅ Excelente rendimiento con miles de registros
- ✅ Consultas SQL completas y complejas
- ✅ No requiere servidor de base de datos
- ✅ Perfecto para Electron o Tauri

**Desventajas:**
- ⚠️ Requiere instalación de la aplicación
- ⚠️ No funciona directamente en navegador

**Mejor para:** Uso en un solo equipo o instalación local

---

### Opción 3: MySQL Local (Original)
**Ideal para:** Servidor local con múltiples usuarios

**Ventajas:**
- ✅ Base de datos profesional y robusta
- ✅ Soporte para múltiples usuarios simultáneos
- ✅ Herramientas de administración conocidas
- ✅ Backups y migraciones estándar

**Desventajas:**
- ❌ Requiere MySQL instalado y corriendo
- ❌ No funciona verdaderamente offline
- ❌ Configuración más compleja

**Mejor para:** Equipos con experiencia en bases de datos

---

### Opción 4: Híbrida (SQLite Local + API para Sync)
**Ideal para:** Lo mejor de ambos mundos

**Ventajas:**
- ✅ SQLite local para trabajar 100% offline
- ✅ API REST para sincronizar cuando hay internet
- ✅ Respaldo automático en servidor
- ✅ Acceso desde múltiples dispositivos
- ✅ Funciona incluso sin conexión

**Desventajas:**
- ⚠️ Requiere desarrollo adicional para sincronización
- ⚠️ Posibles conflictos si editan en múltiples lugares

**Mejor para:** Necesidad de trabajar offline pero con respaldo en la nube

---

## Tecnologías Utilizadas Actualmente

- **Next.js 15** - Framework de React con App Router
- **React 19** - Biblioteca de interfaz de usuario
- **TypeScript** - Tipado estático para código seguro
- **Tailwind CSS v4** - Estilos modernos y responsive
- **shadcn/ui** - Componentes de interfaz de alta calidad
- **Lucide Icons** - Iconografía moderna y limpia
- **SWR** - Manejo de estado cliente (preparado para futuras APIs)

## Comparación Rápida

| Característica | IndexedDB | SQLite | MySQL | Híbrida |
|---------------|-----------|---------|-------|---------|
| Instalación | Ninguna | Media | Alta | Media |
| Offline | ✅ Completo | ✅ Completo | ❌ Requiere servidor | ✅ Completo |
| Rendimiento | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Capacidad | ~1000 registros | Ilimitado | Ilimitado | Ilimitado |
| Múltiples dispositivos | No | No | Sí | Sí |
| Sincronización | Con desarrollo | Con desarrollo | Nativa | Incluida |
| Complejidad | Baja | Baja | Alta | Media-Alta |

## ¿Qué opción elegir?

**Pregúntate:**

1. **¿Necesitas instalar algo o prefieres que funcione en el navegador?**
   - Navegador → IndexedDB (Opción 1)
   - Instalación OK → SQLite (Opción 2)

2. **¿Necesitas acceder desde múltiples equipos?**
   - Sí → MySQL (Opción 3) o Híbrida (Opción 4)
   - No → SQLite (Opción 2) o IndexedDB (Opción 1)

3. **¿Cuántos registros aproximadamente?**
   - Menos de 1000 → Cualquier opción funciona
   - Más de 5000 → SQLite (Opción 2) o MySQL (Opción 3)

4. **¿Es crítico trabajar sin internet?**
   - Sí, siempre → SQLite (Opción 2) o IndexedDB (Opción 1)
   - A veces → Híbrida (Opción 4)
   - Tengo internet → MySQL (Opción 3)

## Siguientes Pasos

Una vez que elijas la opción de base de datos, puedo:

1. Implementar la conexión a la base de datos elegida
2. Migrar todos los componentes para usar datos reales
3. Agregar funcionalidades de importación/exportación real
4. Implementar autenticación si es necesario
5. Optimizar para producción

## Contacto

Dime qué opción prefieres y puedo implementarla inmediatamente. También puedo crear un demo de cualquiera de las opciones si quieres ver cómo funcionarían.
