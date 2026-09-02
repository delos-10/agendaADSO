// Archivo: src/api.js
// Capa de acceso a datos de Agenda ADSO.
// Aquí se realizan los llamados a la API REST.

// Importamos la URL base desde config.js
import { API_BASE_URL } from "./config";


// FUNCIÓN GET: LISTAR CONTACTOS

export async function listarContactos() {
  // Hacemos un GET a la URL base para obtener los contactos
  const res = await fetch(API_BASE_URL);

  // Si la respuesta no es correcta, lanzamos un error
  if (!res.ok) {
    throw new Error("Error al listar contactos");
  }

  // Parseamos el JSON y devolvemos el array de contactos
  return res.json();
}


// FUNCIÓN POST: CREAR UN NUEVO CONTACTO

export async function crearContacto(data) {
  // Hacemos un POST a la URL base con el objeto recibido
  const res = await fetch(API_BASE_URL, {
    method: "POST",

    // Indicamos que el body contiene información en formato JSON
    headers: {
      "Content-Type": "application/json",
    },

    // Convertimos el objeto JavaScript a JSON
    body: JSON.stringify(data),
  });

  // Validamos la respuesta
  if (!res.ok) {
    throw new Error("Error al crear el contacto");
  }

  // Devolvemos el contacto creado por la API
  return res.json();
}


// FUNCIÓN PUT: ACTUALIZAR UN CONTACTO

export async function actualizarContacto(id, data) {
  // Hacemos una petición PUT al contacto seleccionado
  const res = await fetch(`${API_BASE_URL}/${id}`, {
    method: "PUT",

    // Indicamos que los datos enviados están en formato JSON
    headers: {
      "Content-Type": "application/json",
    },

    // Convertimos los nuevos datos a JSON
    body: JSON.stringify(data),
  });

  // Si la respuesta no es correcta, mostramos un error
  if (!res.ok) {
    throw new Error("Error al actualizar el contacto");
  }

  // Devolvemos el contacto actualizado
  return res.json();
}


// FUNCIÓN DELETE: ELIMINAR CONTACTO POR ID

export async function eliminarContactoPorId(id) {
  // Hacemos un DELETE a /contactos/:id usando la URL base
  const res = await fetch(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
  });

  // Validamos la respuesta
  if (!res.ok) {
    throw new Error("Error al eliminar el contacto");
  }

  // Devolvemos true indicando que se eliminó correctamente
  return true;
}
