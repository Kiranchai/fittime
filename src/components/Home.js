import React from "react";
import { useAuth } from "../contexts/AuthContext";

const Home = () => {
  const { currentUser } = useAuth();

  return (
    <>
      <div>
        <h1>{currentUser && currentUser.username}</h1>
        <span>{currentUser.email}</span>
      </div>
    </>
  );
};

export default Home;
