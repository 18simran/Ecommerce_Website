// import { useState, useEffect, useContext, createContext } from "react";
// import axios from "axios";

// const AuthContext = createContext();
// const AuthProvider = ({ children }) => {
//   const [auth, setAuth] = useState({
//     user: null,
//     token: "",
//   });

//   //default axios
//   axios.defaults.headers.common["Authorization"] = auth?.token;

//   useEffect(() => {
//     const data = localStorage.getItem("auth");
//     if (data) {
//       const parseData = JSON.parse(data);
//       setAuth({
//         ...auth,
//         user: parseData.user,
//         token: parseData.token,
//       });
//     }
//     //eslint-disable-next-line
//   }, []);
//   return (
//     <AuthContext.Provider value={[auth, setAuth]}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // custom hook
// const useAuth = () => useContext(AuthContext);

// export { useAuth, AuthProvider };

// 🌼🌼🌼🌼🌼🌼🌼🌼
// import { useState, useEffect, useContext, createContext } from "react";
// import axios from "axios";

// const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//   const [auth, setAuth] = useState({
//     user: null,
//     token: "",
//   });

//   useEffect(() => {
//     const data = localStorage.getItem("auth");
//     if (data) {
//       const parseData = JSON.parse(data);
//       setAuth({
//         user: parseData.user,
//         token: parseData.token,
//       });
//     }
//   }, []);

//   useEffect(() => {
//     if (auth?.token) {
//       axios.defaults.headers.common["Authorization"] = `Bearer ${auth.token}`;
//     } else {
//       delete axios.defaults.headers.common["Authorization"];
//     }
//   }, [auth?.token]);

//   return (
//     <AuthContext.Provider value={[auth, setAuth]}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// const useAuth = () => useContext(AuthContext);

// export { useAuth, AuthProvider };
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
    //eslint-disable-next-line
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
