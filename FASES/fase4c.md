════════════════════════════════════════════════════════════════
ANLYFN STUDIO — FASE 4C: PANEL DE EDICIÓN DE CLIENTE
════════════════════════════════════════════════════════════════

CONTEXTO DEL PROYECTO
──────────────────────
Proyecto Next.js 16, TypeScript, Tailwind CSS, App Router.
La ruta /admin/clients/[id] existe como placeholder.
El componente NewClientForm existe en src/components/admin/.
Los archivos src/lib/client-config.ts y src/lib/modules.ts
ya existen con todas las constantes necesarias.
La tabla clients tiene 47 columnas en Supabase.
La tabla modules tiene los 11 módulos booleanos por cliente.
NO crear nada nuevo desde cero — reutilizar lo que existe.

OBJETIVO DE ESTA FASE
──────────────────────
Construir la pantalla de edición de un cliente existente
en /admin/clients/[id]. Esta pantalla tiene dos propósitos:
ver y modificar la configuración del cliente, y activar
o desactivar sus módulos. Todo debe guardarse en Supabase.

════════════════════════════════════════════════════════════════
INSTRUCCIÓN 1 — API ROUTE PARA LEER Y ACTUALIZAR UN CLIENTE
════════════════════════════════════════════════════════════════

Crear el archivo src/app/api/clients/[id]/route.ts

Este archivo debe manejar dos operaciones:

GET: recibe el id del cliente en la URL, consulta Supabase
para obtener todos los campos de clients junto con su fila
de modules haciendo un join, y devuelve todo como JSON.
Si el cliente no existe, devuelve 404.

PUT: recibe el id en la URL y un body JSON con los campos
a actualizar. Actualiza la tabla clients con los campos de
configuración y actualiza la tabla modules con los valores
booleanos de los módulos. Ambas actualizaciones deben
ejecutarse. Si alguna falla, devuelve el error con su código.

En ambas operaciones verificar que hay sesión activa de
Supabase antes de proceder. Si no hay sesión, devolver 401.

════════════════════════════════════════════════════════════════
INSTRUCCIÓN 2 — SERVER COMPONENT: /admin/clients/[id]/page.tsx
════════════════════════════════════════════════════════════════

Reemplazar el placeholder actual con un Server Component real.

Este componente debe hacer lo siguiente en orden:
Primero, verificar que hay sesión activa. Si no la hay,
redirigir a /login.
Segundo, leer el parámetro id de los params usando await,
ya que en Next.js 16 los params son asíncronos.
Tercero, consultar Supabase para obtener todos los campos
del cliente con ese id, incluyendo su fila de modules
mediante un join. Si el cliente no existe, llamar a notFound().
Cuarto, pasar todos los datos obtenidos como props al
Client Component EditClientForm que se construye en la
siguiente instrucción.

════════════════════════════════════════════════════════════════
INSTRUCCIÓN 3 — COMPONENTE EditClientForm
════════════════════════════════════════════════════════════════

Crear src/components/admin/EditClientForm.tsx

Este componente es casi idéntico al NewClientForm que ya
existe. La diferencia fundamental es que recibe los datos
actuales del cliente como props y los usa para prellenar
todos los campos del formulario desde el inicio.

Seguir estas instrucciones exactas:

ESTRUCTURA GENERAL:
El formulario tiene las mismas 7 secciones colapsables
que NewClientForm: Identidad, Colores, Tipografía,
Contacto, Redes sociales, SEO y Configuración avanzada.
Reutilizar exactamente la misma organización visual y
los mismos campos. No inventar una estructura diferente.

DIFERENCIA CON NewClientForm — SECCIÓN DE MÓDULOS:
Agregar una octava sección llamada "Módulos del sitio"
con ícono de puzzle o bloques. Esta sección solo existe
en EditClientForm, no en NewClientForm.
Dentro de esta sección mostrar los 11 módulos como
toggles individuales, en este orden exacto:
announcement_bar, navigation_menu, hero_section,
product_catalog, whatsapp_button, contact_form,
gallery, about_section, reviews_section, paypal_button,
footer.
Cada toggle debe mostrar el nombre legible del módulo,
una descripción corta de para qué sirve, y el switch
para activarlo o desactivarlo.
Los nombres y colores de cada módulo están disponibles
en src/lib/modules.ts — usar esos valores, no hardcodear.
El estado inicial de cada toggle viene de los datos de
modules que llegan como prop del Server Component.

DIFERENCIA CON NewClientForm — SUBDOMINIO:
El campo de subdominio en la edición debe estar deshabilitado
y no ser editable. El subdominio no se puede cambiar una
vez que el cliente fue creado porque es el identificador
de su sitio. Mostrarlo como texto informativo, no como
input editable. Indicar visualmente que es de solo lectura.

DIFERENCIA CON NewClientForm — LOGO:
Si el cliente ya tiene logo_url guardado, mostrar esa
imagen como preview desde el inicio sin que el usuario
tenga que subir nada. El usuario puede reemplazarla
subiendo una nueva. La lógica de subida a Supabase
Storage es idéntica a la de NewClientForm.

TOPBAR DEL FORMULARIO:
La barra superior debe mostrar:
Izquierda: botón de flecha para volver a /admin,
breadcrumb "Clientes / [nombre del cliente]",
y el nombre del cliente como título principal.
Derecha: botón "Ver storefront" que abre el subdominio
en nueva pestaña, y botón "Guardar cambios" para submit.

LÓGICA DE GUARDADO:
Al hacer clic en "Guardar cambios", hacer un PUT a
/api/clients/[id] con todos los campos del formulario
incluyendo los estados de los módulos.
Manejar tres estados del botón: normal, cargando con
spinner, y éxito con check verde por 1.5 segundos.
Si hay error, mostrarlo sin perder los datos del form.
No redirigir después de guardar — el usuario permanece
en la misma pantalla de edición.

════════════════════════════════════════════════════════════════
INSTRUCCIÓN 4 — CONECTAR EL BOTÓN "EDITAR CLIENTE"
════════════════════════════════════════════════════════════════

En src/components/admin/ClientDetail.tsx el botón
"Editar cliente" ya tiene un onClick que navega a
/admin/clients/[id]. Verificar que ese onClick usa
el id correcto del cliente seleccionado y que la
navegación funciona sin errores de TypeScript.
Si hay algún problema de tipado, corregirlo.

════════════════════════════════════════════════════════════════
INSTRUCCIÓN 5 — VERIFICACIÓN FINAL
════════════════════════════════════════════════════════════════

Ejecutar npm run build y confirmar que no hay errores
de TypeScript.

Si todo pasa, ejecutar:
git add .
git commit -m "fase-4c: panel edicion de cliente con modulos"
git push origin main

════════════════════════════════════════════════════════════════
LO QUE NO DEBE HACER EN ESTA FASE
════════════════════════════════════════════════════════════════

No construir el storefront todavía.
No agregar nuevas columnas a Supabase.
No instalar nuevas librerías.
No modificar NewClientForm ni el dashboard principal.
No permitir que se edite el subdominio de un cliente.
No redirigir al usuario después de guardar cambios.

════════════════════════════════════════════════════════════════