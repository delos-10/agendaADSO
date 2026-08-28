// Archivo: src/App.jsx
// Componente principal de la aplicación Agenda ADSO.
// Se encarga de:
// - Cargar contactos desde la API.
// - Agregar y eliminar contactos.
// - Buscar contactos por nombre, correo, etiqueta y teléfono.
// - Ordenar los contactos alfabéticamente.
// - Mostrar la cantidad de contactos encontrados.

// Importamos los hooks de React
import { useEffect, useState } from "react";

// Importamos las funciones de la API
import {
  listarContactos,
  crearContacto,
  eliminarContactoPorId,
} from "./api";

// Importamos la configuración global
import { APP_INFO } from "./config";

// Importamos los componentes
import FormularioContacto from "./components/FormularioContacto";
import ContactoCard from "./components/ContactoCard";

function App() {
  // Estado que almacena la lista de contactos
  const [contactos, setContactos] = useState([]);

  // Estado que indica si los contactos están cargando
  const [cargando, setCargando] = useState(true);

  // Estado para guardar mensajes de error
  const [error, setError] = useState("");


  // CLASE 10: ESTADOS PARA BÚSQUEDA Y ORDEN
 

  // Guarda el texto escrito en el buscador
  const [busqueda, setBusqueda] = useState("");

  // true = orden A-Z
  // false = orden Z-A
  const [ordenAsc, setOrdenAsc] = useState(true);

  
  // CARGAR CONTACTOS
 

  useEffect(() => {
    const cargarContactos = async () => {
      try {
        setCargando(true);
        setError("");

        // Obtenemos los contactos desde la API
        const data = await listarContactos();

        // Guardamos los contactos en el estado
        setContactos(data);
      } catch (error) {
        console.error("Error al cargar contactos:", error);

        setError(
          "No se pudieron cargar los contactos. Verifica que el servidor esté encendido e intenta de nuevo."
        );
      } finally {
        setCargando(false);
      }
    };

    cargarContactos();
  }, []);

  
  // AGREGAR CONTACTO


  const onAgregarContacto = async (nuevoContacto) => {
    try {
      setError("");

      // Creamos el contacto en la API
      const creado = await crearContacto(nuevoContacto);

      // Agregamos el nuevo contacto al estado
      setContactos((prev) => [...prev, creado]);
    } catch (error) {
      console.error("Error al crear contacto:", error);

      setError(
        "No se pudo guardar el contacto. Verifica tu conexión o el estado del servidor e intenta nuevamente."
      );

      throw error;
    }
  };

  
  // ELIMINAR CONTACTO
  

  const onEliminarContacto = async (id) => {
    try {
      setError("");

      // Eliminamos el contacto de la API
      await eliminarContactoPorId(id);

      // Eliminamos el contacto del estado local
      setContactos((prev) => prev.filter((c) => c.id !== id));
    } catch (error) {
      console.error("Error al eliminar contacto:", error);

      setError(
        "No se pudo eliminar el contacto. Vuelve a intentarlo o verifica el servidor."
      );
    }
  };


  // CLASE 10: FILTRAR CONTACTOS


  // Filtramos los contactos según el texto escrito
  const contactosFiltrados = contactos.filter((c) => {
    // Convertimos el término de búsqueda a minúsculas
    const termino = busqueda.toLowerCase();

    // Convertimos los textos a minúsculas
    // para ignorar mayúsculas y minúsculas
    const nombre = (c.nombre || "").toLowerCase();
    const correo = (c.correo || "").toLowerCase();
    const etiqueta = (c.etiqueta || "").toLowerCase();

    // MINI RETO 1:
    // Convertimos el teléfono a texto para poder buscar números
    const telefono = String(c.telefono || "");

    // El contacto se muestra si el término coincide
    // con alguno de los campos
    return (
      nombre.includes(termino) ||
      correo.includes(termino) ||
      etiqueta.includes(termino) ||
      telefono.includes(termino)
    );
  });


  // CLASE 10: ORDENAR CONTACTOS


  // Creamos una copia antes de utilizar sort()
  // para no modificar el estado original
  const contactosOrdenados = [...contactosFiltrados].sort((a, b) => {
    const nombreA = (a.nombre || "").toLowerCase();
    const nombreB = (b.nombre || "").toLowerCase();

    // Si nombreA va antes que nombreB
    if (nombreA < nombreB) {
      return ordenAsc ? -1 : 1;
    }

    // Si nombreA va después que nombreB
    if (nombreA > nombreB) {
      return ordenAsc ? 1 : -1;
    }

    // Si son iguales
    return 0;
  });


  // INTERFAZ


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Contenedor principal */}
      <div className="max-w-4xl mx-auto px-4 py-8">

        {/* Encabezado */}
        <header className="mb-8">
          <p className="text-xs tracking-[0.3em] text-gray-500 uppercase">
            Desarrollo Web ReactJS Ficha {APP_INFO.ficha}
          </p>

          <h1 className="text-4xl font-extrabold text-gray-900 mt-2">
            {APP_INFO.titulo}
          </h1>

          <p className="text-sm text-gray-600 mt-1">
            {APP_INFO.subtitulo}
          </p>
        </header>

        {/* Mensaje de error */}
        {error && (
          <div className="mb-4 rounded-xl bg-red-50 border border-red-200 px-4 py-3">
            <p className="text-sm font-medium text-red-700">
              {error}
            </p>
          </div>
        )}

        {/* Mensaje mientras cargan los contactos */}
        {cargando ? (
          <p className="text-sm text-gray-500">
            Cargando contactos...
          </p>
        ) : (
          <>
            {/* Formulario para agregar contactos */}
            <FormularioContacto onAgregar={onAgregarContacto} />

         
            {/* BUSCADOR Y BOTÓN DE ORDENAMIENTO  */}
           

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-2">

              {/* Campo de búsqueda */}
              <input
                type="text"
                className="w-full md:flex-1 rounded-xl border border-gray-300 px-4 py-2 text-sm focus:ring-purple-500 focus:border-purple-500"
                placeholder="Buscar por nombre, correo, etiqueta o teléfono..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />

              {/* Botón para cambiar entre A-Z y Z-A */}
              <button
                type="button"
                onClick={() => setOrdenAsc((prev) => !prev)}
                className="bg-gray-100 text-gray-700 text-sm px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-200"
              >
                {ordenAsc ? "Ordenar Z-A" : "Ordenar A-Z"}
              </button>
            </div>


            {/* MINI RETO 2: CONTADOR DE RESULTADOS */}


            <p className="text-sm text-gray-500 mb-4">
              Mostrando {contactosOrdenados.length}{" "}
              {contactosOrdenados.length === 1
                ? "contacto"
                : "contactos"}
            </p>


            {/* LISTA DE CONTACTOS */}

            <section className="space-y-4">

              {/* Si no existen contactos registrados */}
              {contactos.length === 0 ? (
                <p className="text-sm text-gray-500">
                  Aún no tienes contactos registrados. Agrega el primero usando
                  el formulario superior.
                </p>

              /* Si existen contactos, pero la búsqueda no encuentra resultados */
              ) : contactosOrdenados.length === 0 ? (
                <p className="text-sm text-gray-500">
                  No se encontraron contactos que coincidan con la búsqueda.
                </p>

              /* Si existen resultados, mostramos los contactos */
              ) : (
                contactosOrdenados.map((c) => (
                  <ContactoCard
                    key={c.id}
                    nombre={c.nombre}
                    telefono={c.telefono}
                    correo={c.correo}
                    etiqueta={c.etiqueta}
                    onEliminar={() => onEliminarContacto(c.id)}
                  />
                ))
              )}
            </section>
          </>
        )}

        {/* Pie de página */}
        <footer className="mt-8 text-xs text-gray-400">
          <p>Desarrollo Web – ReactJS | Proyecto Agenda ADSO</p>
          <p>Instructor: Gustavo Adolfo Bolaños Dorado</p>
        </footer>
      </div>
    </div>
  );
}

// Exportamos el componente principal
export default App;