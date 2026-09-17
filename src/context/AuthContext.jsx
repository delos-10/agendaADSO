import { createContext, useContext, useState } from "react";

// Creamos el contexto de autenticación
const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Revisamos si existe una sesión guardada
  const [autenticado, setAutenticado] = useState(
    localStorage.getItem("auth") === "true"
  );

  // Iniciar sesión
  const login = () => {
    localStorage.setItem("auth", "true");
    setAutenticado(true);
  };

  // Cerrar sesión
  const logout = () => {
    localStorage.removeItem("auth");
    setAutenticado(false);
  };

  return (
    <AuthContext.Provider value={{ autenticado, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook para utilizar la autenticación en otros componentes
export function useAuth() {
  return useContext(AuthContext);
}