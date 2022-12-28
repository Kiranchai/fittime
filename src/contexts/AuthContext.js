import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({
    pending: true,
  });

  useEffect(() => {
    const fetchUser = async () => {
      fetch("http://localhost:3001/isLoggedIn", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
        .then((res) => res.json())
        .then((data) => setCurrentUser({ ...data, pending: false }));
    };

    fetchUser();
  }, []);

  const signout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const value = {
    currentUser,
    signout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
