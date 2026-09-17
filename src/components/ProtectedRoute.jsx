// Archivo: src/components/ProtectedRoute.jsx
// Componente encargado de proteger las rutas privadas.

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  // Consultamos si existe una sesión activa
const { autenticado } = useAuth();

if (!autenticado) {
  return <Navigate to="/login" replace />;
}
  // Si existe sesión, permitimos mostrar el contenido
  return children;
}

export default ProtectedRoute;



