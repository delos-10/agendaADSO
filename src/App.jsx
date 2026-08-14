// App.jsx
import { useEffect, useState } from "react";
import { listarContactos, crearContacto, eliminarContactoPorId } from "./api.js";
import FormularioContacto from "./components/FormularioContacto";
import ContactoCard from "./components/ContactoCard";

export default function App() {
  // 1) Estado con la lista de contactos (inicia como arreglo vacío)
  const [contactos, setContactos] = useState([]);

  // 2) useEffect — Carga inicial desde la API (reemplaza localStorage)
  useEffect(() => {
    listarContactos()
      .then((data) => setContactos(data))
      .catch((err) => console.error(err));
  }, []);

  // 3) Agregar contacto consumiendo la API (POST)
 const agregarContacto = async (form) => {
  try {
    const nuevo = await crearContacto(form);
    setContactos((prevContactos) => [...prevContactos, nuevo]);
  } catch (error) {
    console.error(error);
  }
};

  // 4) Eliminar contacto consumiendo la API por id (DELETE)
 const eliminarContacto = async (id) => {
  try {
    await eliminarContactoPorId(id);
    setContactos((prevContactos) => prevContactos.filter((c) => c.id !== id));
  } catch (error) {
    console.error(error);
  }
};

  return (
    <main className="min-h-screen py-10 px-4">
      {/* Título centrado con color morado */}
      <h1 className="text-4xl font-bold text-center text-purple-600 mb-8">
        Agenda ADSO v5
      </h1>

      <div className="max-w-4xl mx-auto">
        {/* Tarjeta del formulario */}
        <section className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 mb-6">
          <FormularioContacto onAgregar={agregarContacto} />
        </section>

        {/* Lista de contactos */}
        <section className="space-y-4">
          {contactos.map((c) => (
            <ContactoCard
              key={c.id}
              {...c}
              onEliminar={eliminarContacto}
            />
          ))}
        </section>
      </div>
    </main>
  );
}

