import { CircularProgress } from "@mui/material";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const PrivateRoute = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      {currentUser.pending ? (
        <CircularProgress />
      ) : (
        <>{currentUser.isLoggedIn ? <Outlet /> : navigate("/login")}</>
      )}
    </>
  );
};

export default PrivateRoute;
