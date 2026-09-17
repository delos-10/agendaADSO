import { useEffect, useState } from "react";

function FormularioContacto({
  onAgregar,
  contactoEnEdicion,
  onActualizar,
  onCancelarEdicion,
}) {
  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    etiqueta: "",
  });

  const [errores, setErrores] = useState({
    nombre: "",
    telefono: "",
    correo: "",
  });

  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    if (contactoEnEdicion) {
      setForm({
        nombre: contactoEnEdicion.nombre ?? "",
        telefono: contactoEnEdicion.telefono ?? "",
        correo: contactoEnEdicion.correo ?? "",
        etiqueta: contactoEnEdicion.etiqueta ?? "",
      });
    } else {
      setForm({
        nombre: "",
        telefono: "",
        correo: "",
        etiqueta: "",
      });
    }

    setErrores({
      nombre: "",
      telefono: "",
      correo: "",
    });
  }, [contactoEnEdicion]);

  const onChange = (e) => {
    const { name, value } = e.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  function validarFormulario() {
    const nuevosErrores = {
      nombre: "",
      telefono: "",
      correo: "",
    };

    if (!form.nombre.trim()) {
      nuevosErrores.nombre = "El nombre es obligatorio.";
    }

    if (!form.telefono.trim()) {
      nuevosErrores.telefono = "El teléfono es obligatorio.";
    }

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

  const onSubmit = async (e) => {
    e.preventDefault();

    const esValido = validarFormulario();

    if (!esValido) return;

    try {
      setEnviando(true);

      if (contactoEnEdicion) {
        await onActualizar({
          ...form,
          id: contactoEnEdicion.id,
        });
      } else {
        await onAgregar(form);

        setForm({
          nombre: "",
          telefono: "",
          correo: "",
          etiqueta: "",
        });
      }

      setErrores({
        nombre: "",
        telefono: "",
        correo: "",
      });
    } finally {
      setEnviando(false);
    }
  };

  const estiloInput =
    "w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-800 placeholder-gray-400 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-200";

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {contactoEnEdicion ? "Editar contacto" : "Nuevo contacto"}
      </h2>

      {/* NOMBRE */}
      <div className="mb-5">
        <label
          htmlFor="nombre"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Nombre *
        </label>

        <input
          id="nombre"
          name="nombre"
          type="text"
          value={form.nombre}
          onChange={onChange}
          placeholder="Ej: Juan Pérez"
          className={estiloInput}
        />

        {errores.nombre && (
          <p className="text-red-500 text-sm mt-2">
            {errores.nombre}
          </p>
        )}
      </div>

      {/* TELÉFONO */}
      <div className="mb-5">
        <label
          htmlFor="telefono"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Teléfono *
        </label>

        <input
          id="telefono"
          name="telefono"
          type="text"
          value={form.telefono}
          onChange={onChange}
          placeholder="Ej: 3001234567"
          className={estiloInput}
        />

        {errores.telefono && (
          <p className="text-red-500 text-sm mt-2">
            {errores.telefono}
          </p>
        )}
      </div>

      {/* CORREO */}
      <div className="mb-5">
        <label
          htmlFor="correo"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Correo *
        </label>

        <input
          id="correo"
          name="correo"
          type="email"
          value={form.correo}
          onChange={onChange}
          placeholder="Ej: correo@gmail.com"
          className={estiloInput}
        />

        {errores.correo && (
          <p className="text-red-500 text-sm mt-2">
            {errores.correo}
          </p>
        )}
      </div>

      {/* ETIQUETA */}
      <div className="mb-7">
        <label
          htmlFor="etiqueta"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Etiqueta (opcional)
        </label>

        <input
          id="etiqueta"
          name="etiqueta"
          type="text"
          value={form.etiqueta}
          onChange={onChange}
          placeholder="Ej: amigo, trabajo, profesor..."
          className={estiloInput}
        />
      </div>

      {/* BOTONES */}
      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={enviando}
          className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300 text-white px-7 py-3 rounded-xl font-semibold transition"
        >
          {enviando
            ? "Guardando..."
            : contactoEnEdicion
            ? "Guardar cambios"
            : "Agregar contacto"}
        </button>

        {contactoEnEdicion && (
          <button
            type="button"
            onClick={onCancelarEdicion}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-7 py-3 rounded-xl font-semibold transition"
          >
            Cancelar edición
          </button>
        )}
      </div>
    </form>
  );
}

export default FormularioContacto;