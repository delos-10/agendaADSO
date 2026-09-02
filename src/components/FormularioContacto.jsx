// Importamos useEffect y useState para manejar estados y efectos
import { useEffect, useState } from "react";

// Componente FormularioContacto
function FormularioContacto({
  onAgregar,
  contactoEnEdicion,
  onActualizar,
  onCancelarEdicion,
}) {
  // Estado principal del formulario
  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    etiqueta: "",
  });

  // Estado para almacenar los mensajes de error
  const [errores, setErrores] = useState({
    nombre: "",
    telefono: "",
    correo: "",
  });

  // Estado que indica si el formulario está enviando información
  const [enviando, setEnviando] = useState(false);

  // Cuando cambia el contacto en edición, cargamos sus datos en el formulario
  useEffect(() => {
    if (contactoEnEdicion) {
      setForm({
        nombre: contactoEnEdicion.nombre || "",
        telefono: contactoEnEdicion.telefono || "",
        correo: contactoEnEdicion.correo || "",
        etiqueta: contactoEnEdicion.etiqueta || "",
      });
    } else {
      setForm({
        nombre: "",
        telefono: "",
        correo: "",
        etiqueta: "",
      });
    }

    // Limpiamos los errores al cambiar de modo
    setErrores({
      nombre: "",
      telefono: "",
      correo: "",
    });
  }, [contactoEnEdicion]);

  // Función manejadora del cambio de los inputs
  const onChange = (e) => {
    const { name, value } = e.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  // Función encargada de validar todos los campos
  function validarFormulario() {
    const nuevosErrores = {
      nombre: "",
      telefono: "",
      correo: "",
    };

    // Validación del nombre
    if (!form.nombre.trim()) {
      nuevosErrores.nombre = "El nombre es obligatorio.";
    }

    // Validación del teléfono
    if (!form.telefono.trim()) {
      nuevosErrores.telefono = "El teléfono es obligatorio.";
    }

    // Validación del correo
    if (!form.correo.trim()) {
      nuevosErrores.correo = "El correo es obligatorio.";
    } else if (!form.correo.includes("@")) {
      nuevosErrores.correo = "El correo debe contener @.";
    }

    setErrores(nuevosErrores);

    return (
      !nuevosErrores.nombre &&
      !nuevosErrores.telefono &&
      !nuevosErrores.correo
    );
  }

  // Función manejadora del envío del formulario
  const onSubmit = async (e) => {
    e.preventDefault();

    const esValido = validarFormulario();

    if (!esValido) return;

    try {
      setEnviando(true);

      // Si estamos editando
      if (contactoEnEdicion) {
        await onActualizar({
          ...form,
          id: contactoEnEdicion.id,
        });
      } else {
        // Si estamos creando
        await onAgregar(form);

        // Limpiamos el formulario después de crear
        setForm({
          nombre: "",
          telefono: "",
          correo: "",
          etiqueta: "",
        });
      }

      // Limpiamos los errores
      setErrores({
        nombre: "",
        telefono: "",
        correo: "",
      });
    } finally {
      setEnviando(false);
    }
  };

  // JSX del formulario
  return (
    <form
      className="bg-white shadow-sm rounded-2xl p-6 space-y-4 mb-8"
      onSubmit={onSubmit}
    >
      {/* Título del formulario */}
      <h2 className="text-lg font-semibold text-gray-900 mb-2">
        {contactoEnEdicion ? "Editar contacto" : "Nuevo contacto"}
      </h2>

      {/* Campo Nombre */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nombre *
        </label>

        <input
          className="w-full rounded-xl border-gray-300 focus:ring-purple-500 focus:border-purple-500"
          name="nombre"
          placeholder="Ej: Camila Pérez"
          value={form.nombre}
          onChange={onChange}
        />

        {errores.nombre && (
          <p className="mt-1 text-xs text-red-600">{errores.nombre}</p>
        )}
      </div>

      {/* Campo Teléfono */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Teléfono *
        </label>

        <input
          className="w-full rounded-xl border-gray-300 focus:ring-purple-500 focus:border-purple-500"
          name="telefono"
          placeholder="Ej: 300 123 4567"
          value={form.telefono}
          onChange={onChange}
        />

        {errores.telefono && (
          <p className="mt-1 text-xs text-red-600">{errores.telefono}</p>
        )}
      </div>

      {/* Campo Correo */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Correo *
        </label>

        <input
          className="w-full rounded-xl border-gray-300 focus:ring-purple-500 focus:border-purple-500"
          name="correo"
          placeholder="Ej: camila@sena.edu.co"
          value={form.correo}
          onChange={onChange}
        />

        {errores.correo && (
          <p className="mt-1 text-xs text-red-600">{errores.correo}</p>
        )}
      </div>

      {/* Campo Etiqueta */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Etiqueta (opcional)
        </label>

        <input
          className="w-full rounded-xl border-gray-300 focus:ring-purple-500 focus:border-purple-500"
          name="etiqueta"
          placeholder="Ej: Trabajo"
          value={form.etiqueta}
          onChange={onChange}
        />
      </div>

      {/* Botones */}
      <div className="pt-2 flex gap-3 flex-wrap">
        {/* Botón principal */}
        <button
          type="submit"
          disabled={enviando}
          className="w-full md:w-auto bg-purple-600 hover:bg-purple-700
                     disabled:bg-purple-300 disabled:cursor-not-allowed
                     text-white px-6 py-3 rounded-xl font-semibold shadow-sm"
        >
          {enviando
            ? "Guardando..."
            : contactoEnEdicion
              ? "Guardar cambios"
              : "Agregar contacto"}
        </button>

        {/* Botón cancelar, solo aparece al editar */}
        {contactoEnEdicion && (
          <button
            type="button"
            onClick={onCancelarEdicion}
            disabled={enviando}
            className="w-full md:w-auto bg-gray-100 hover:bg-gray-200
                       disabled:opacity-50 disabled:cursor-not-allowed
                       text-gray-700 px-6 py-3 rounded-xl font-semibold"
          >
            Cancelar edición
          </button>
        )}
      </div>
    </form>
  );
}

// Exportamos el componente
export default FormularioContacto;