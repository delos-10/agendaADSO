// src/components/FormularioContacto.jsx
import { useState } from "react";

export default function FormularioContacto({ onAgregar }) {
  // Estado único del formulario (según la guía)
  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    empresa: "",
    etiqueta: "",
  });

  // Manejar cambios en las entradas
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  // Función de envío con validación e indicación de campos obligatorios
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.nombre || !form.telefono) {
      alert("Nombre y teléfono son obligatorios");
      return;
    }

    onAgregar(form);

    // Limpiar el estado del formulario
    setForm({
      nombre: "",
      telefono: "",
      correo: "",
      empresa: "",
      etiqueta: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Nombre + Teléfono (grid responsive) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nombre *
          </label>
          <input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            placeholder="Ej: Ana Pérez"
            className="mt-1 w-full rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none px-4 py-3"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Teléfono *
          </label>
          <input
            type="text"
            name="telefono"
            value={form.telefono}
            onChange={handleChange}
            placeholder="Ej: 3001234567"
            className="mt-1 w-full rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none px-4 py-3"
          />
        </div>
      </div>

      {/* Correo */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Correo *
        </label>
        <input
          type="email"
          name="correo"
          value={form.correo}
          onChange={handleChange}
          placeholder="Ej: ana@sena.edu.co"
          className="mt-1 w-full rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none px-4 py-3"
        />
      </div>

      {/* Empresa (opcional) */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Empresa (opcional)
        </label>
        <input
          type="text"
          name="empresa"
          value={form.empresa}
          onChange={handleChange}
          placeholder="Ej: Bancolombia"
          className="mt-1 w-full rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none px-4 py-3"
        />
      </div>

      {/* Etiqueta (opcional) */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Etiqueta (opcional)
        </label>
        <input
          type="text"
          name="etiqueta"
          value={form.etiqueta}
          onChange={handleChange}
          placeholder="Ej: Trabajo"
          className="mt-1 w-full rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none px-4 py-3"
        />
      </div>

      {/* Botón principal morado */}
      <button
        type="submit"
        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors shadow-md"
      >
        Agregar contacto
      </button>
    </form>
  );
}