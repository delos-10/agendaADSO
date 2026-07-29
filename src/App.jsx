import "./App.css"; // Importamos estilos de la app
import ContactoCard from "./components/ContactoCard"; // Importamos el componente hijo

export default function App() {
  // Esta es nuestra "base de datos" inicial quemada en el código
  const contactos = [
    {
      id: 1,
      nombre: "Carolina Pérez",
      telefono: "300 123 4567",
      correo: "carolina@sena.edu.co",
      etiqueta: "Compañera",
    },
    {
      id: 2,
      nombre: "Juan Díaz",
      telefono: "301 987 6543",
      correo: "juan@sena.edu.co",
      etiqueta: "Instructor",
    },
    {
      id: 3,
      nombre: "Luisa Martínez",
      telefono: "320 555 7788",
      correo: "luisa@sena.edu.co",
      etiqueta: "Cliente",
    },
    {
      id: 4,
      nombre: "Kleyder Lopez",
      telefono: "310 545 1234",
      correo: "kley@sena.edu.co",
      etiqueta: "Socio",
    },
    {
      id: 5,
      nombre: "Pedro Porro",
      telefono: "323 505 9876",
      correo: "pedrito@sena.edu.co",
      etiqueta: "Gerente",
    },
    {
      id: 6,
      nombre: "Victor Lugo",
      telefono: "325 205 7532",
      correo: "victor@sena.edu.co",
      etiqueta: "Primo",
    },
  ];

  return (
    <main className="app-container">
      <h1 className="app-title">Agenda ADSO 📒</h1>

      <p className="app-subtitle">Contactos guardados</p>

      {/* Recorremos el arreglo contactos y pintamos una tarjeta por cada uno */}
      {contactos.map((c) => (
        <ContactoCard
          key={c.id}            // key única para React
          nombre={c.nombre}     // prop nombre
          telefono={c.telefono} // prop telefono
          correo={c.correo}     // prop correo
          etiqueta={c.etiqueta} // prop etiqueta (Cliente, Instructor, etc.)
        />
      ))}

      <p className="app-nota">
        (Versión 0.1 - solo lectura, sin agregar ni editar todavía)
      </p>
    </main>
  );
}
