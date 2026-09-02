// src/components/ContactoCard.jsx

export default function ContactoCard({
  id,
  nombre,
  telefono,
  correo,
  empresa,
  etiqueta,
  onEditar,
  onEliminar,
}) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
      
      {/* Encabezado de la tarjeta */}
      <div className="flex justify-between items-start gap-4">
        
        {/* Nombre y etiqueta */}
        <div>
          <h3 className="text-xl font-bold text-gray-800">
            {nombre}
          </h3>

          {etiqueta && (
            <span className="inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm mt-2 font-medium">
              {etiqueta}
            </span>
          )}
        </div>

        {/* Botones de editar y eliminar */}
        <div className="flex gap-2">
          
          {/* Botón para iniciar la edición */}
          <button
            onClick={onEditar}
            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors"
          >
            Editar
          </button>

          {/* Botón para eliminar el contacto */}
          <button
            onClick={() => onEliminar(id)}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors"
          >
            Eliminar
          </button>
        </div>
      </div>

      {/* Detalles del contacto */}
      <div className="mt-4 space-y-2">
        
        <p className="text-gray-600 flex items-center gap-2">
          📞 <span>{telefono}</span>
        </p>

        <p className="text-gray-600 flex items-center gap-2">
          📧 <span>{correo}</span>
        </p>

        {empresa && (
          <p className="text-gray-500 text-sm flex items-center gap-2">
            🏢 <span>{empresa}</span>
          </p>
        )}
      </div>
    </div>
  );
}