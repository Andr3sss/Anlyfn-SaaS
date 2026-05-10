════════════════════════════════════════════════════════════════
ANLYFN STUDIO — FASE 4D: ELIMINAR CLIENTE
════════════════════════════════════════════════════════════════

CONTEXTO
────────
El panel de edición de cliente en /admin/clients/[id] está
completo con todas las secciones de configuración.
Las foreign keys en Supabase tienen ON DELETE CASCADE
configurado para modules, products y menu_items.
Esto significa que eliminar un cliente elimina 
automáticamente todos sus datos relacionados.

OBJETIVO
────────
Agregar un botón "Eliminar cliente" al panel de edición
que permita eliminar un cliente con confirmación doble
para evitar borrados accidentales.

════════════════════════════════════════════════════════════════
INSTRUCCIÓN 1 — API ROUTE PARA ELIMINAR
════════════════════════════════════════════════════════════════

Crear el archivo src/app/api/clients/[id]/delete/route.ts

Este archivo debe manejar un DELETE request.

Recibe el id del cliente en la URL.
Verifica que hay sesión activa. Si no la hay, devuelve 401.
Ejecuta una query DELETE en la tabla clients donde id
coincida con el parámetro.
Supabase automáticamente elimina sus modules, products
y menu_items por el ON DELETE CASCADE.
Si el cliente no existe, devuelve 404.
Si la operación es exitosa, devuelve status 200.
Si hay error en la base de datos, devuelve status 500
con el mensaje de error.

════════════════════════════════════════════════════════════════
INSTRUCCIÓN 2 — AGREGAR BOTÓN AL PANEL DE EDICIÓN
════════════════════════════════════════════════════════════════

En src/components/admin/EditClientForm.tsx,
en la topbar donde está el botón "Guardar cambios",
agregar un segundo botón a la derecha del primero
que diga "Eliminar cliente" con color rojo de advertencia.

Este botón abre un modal o dialog de confirmación.
El modal debe decir:
"¿Estás seguro de que deseas eliminar este cliente?"
"Se eliminarán todos sus datos, módulos y contenido."
"Esta acción no se puede deshacer."

El modal tiene dos botones:
- "Cancelar" que cierra el modal sin hacer nada
- "Sí, eliminar" que es rojo y ejecuta la eliminación

════════════════════════════════════════════════════════════════
INSTRUCCIÓN 3 — LÓGICA DE ELIMINACIÓN
════════════════════════════════════════════════════════════════

Cuando el usuario hace clic en "Sí, eliminar":

1. Deshabilitar ambos botones del modal.
2. Mostrar un spinner en el botón "Sí, eliminar".
3. Hacer un DELETE request a /api/clients/[id]/delete.
4. Si response.status === 200:
   Cerrar el modal.
   Mostrar un toast o notificación de éxito.
   Esperar 1 segundo.
   Redirigir a /admin/clients con router.push().
5. Si response.status === 404:
   Mostrar error "El cliente no existe".
   Rehabilitar los botones del modal.
6. Si cualquier otro error:
   Mostrar el mensaje de error.
   Rehabilitar los botones del modal.

════════════════════════════════════════════════════════════════
INSTRUCCIÓN 4 — MODAL/DIALOG
════════════════════════════════════════════════════════════════

El modal puede implementarse de dos maneras:

Opción A: Usar un componente Dialog/Modal nativo del
navegador con estado en React.

Opción B: Crear un simple elemento div con overlay que
aparece y desaparece usando state del componente.

Elegir la opción que requiera menos código nuevo.
La apariencia debe ser consistente con el design system
del admin (colores oscuros, bordes sutiles, etc).

════════════════════════════════════════════════════════════════
INSTRUCCIÓN 5 — VERIFICACIÓN FINAL
════════════════════════════════════════════════════════════════

Ejecutar npm run build sin errores de TypeScript.

Si todo pasa:
git add .
git commit -m "fase-4d: eliminar cliente con confirmacion"
git push origin main

════════════════════════════════════════════════════════════════
LO QUE NO DEBE HACER
════════════════════════════════════════════════════════════════

No permitir la eliminación sin confirmación.
No modificar el schema de Supabase.
No tocar el DELETE CASCADE — ya está configurado.
No crear una página de confirmación separada — usar modal.
No guardar copias de seguridad de clientes eliminados.

════════════════════════════════════════════════════════════════
FASE 4 COMPLETA DESPUÉS DE ESTO
════════════════════════════════════════════════════════════════

Cuando termines la Instrucción 5 y todas las pruebas pasen,
la Fase 4 está completamente lista.

El esqueleto del SaaS admin está terminado:
✓ Crear clientes (4B)
✓ Editar configuración de clientes (4C)
✓ Activar/desactivar módulos (4C)
✓ Eliminar clientes (4D)

