// // ContactoCard.jsx
// // Este componente muestra UN contacto de la agenda.
// // Recibe datos (props): nombre, telefono, correo, etiqueta.

// export default function ContactoCard({ nombre, telefono, correo, etiqueta }) {
//   return (
//     <div className="card-contacto">
//       {/* Nombre del contacto en negrita */}
//       <h3 className="card-nombre">{nombre}</h3>

//       {/* Teléfono */}
//       <p className="card-linea">📞 {telefono}</p>

//       {/* Correo */}
//       <p className="card-linea">📧 {correo}</p>

//       {/* Etiqueta adicional, si existe (por ejemplo: "Instructor", "Cliente", "Compañera") */}
//       {etiqueta && (
//         <p className="card-etiqueta">{etiqueta}</p>
//       )}
//     </div>
//   );
// }

export default function ContactoCard({
  id,
  nombre,
  telefono,
  correo,
  etiqueta,
  onDelete,
}) {
  return (
    <article className="tarjeta-contacto">
      <h3>{nombre} </h3>
      {etiqueta && <p className="tag">{etiqueta}</p>}
      <p>📞 {telefono}</p>
      {correo && <p>✉️ {correo}</p>}
      

      <div className="acciones">
        <button
          type="button"
          className="btn-eliminar"
          onClick={() => onDelete(id)}
        >
          Eliminar
        </button>
      </div>
    </article>
  );
}
