// import { createContext, useContext, useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Check localStorage on initial load
//     const userEmail = localStorage.getItem('userEmail');
//     if (userEmail) {
//       setIsAuthenticated(true);
//     }
//   }, []);

//   const login = (email) => {
//     localStorage.setItem('userEmail', email);
//     setIsAuthenticated(true);
//     navigate('/AdminDashboard');
//   };

//   const logout = () => {
//     localStorage.removeItem('userEmail');
//     setIsAuthenticated(false);
//     navigate('/');
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);