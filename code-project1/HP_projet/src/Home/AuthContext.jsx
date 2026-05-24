import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [client, setClient] = useState(() => {
    const saved = localStorage.getItem("client");
    return saved ? JSON.parse(saved) : null;
  });

  const login = (clientData) => {
    localStorage.setItem("client", JSON.stringify(clientData));
    setClient(clientData);
  };

  const logout = () => {
    localStorage.removeItem("client");
    setClient(null);
  };

  return (
    <AuthContext.Provider value={{ client, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
