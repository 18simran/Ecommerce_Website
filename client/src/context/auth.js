import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuthState] = useState({
    user: null,
    token: "",
  });

  const setAuth = (authData) => {
    setAuthState(authData);
    if (authData?.token) {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${authData.token}`;
      localStorage.setItem("auth", JSON.stringify(authData));
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("auth");
    }
  };

  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parseData = JSON.parse(data);
      setAuthState({
        user: parseData.user,
        token: parseData.token,
      });
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${parseData.token}`;
    }
  }, []);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

// custom hook
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
