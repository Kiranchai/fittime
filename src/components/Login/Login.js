import React, { useState } from "react";
import { Navigate, NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { CircularProgress } from "@mui/material";
import "./Login.css";

const Login = () => {
  const { currentUser } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setButtonDisabled(true);

    const user = {
      username,
      password,
    };

    fetch("http://localhost:3001/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message && data.message !== "Success") {
          setError(data.message);
        }

        if (data.token) {
          localStorage.setItem("token", data.token);
          window.location.reload(false);
        }
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => {
        setButtonDisabled(false);
      });
  };

  return (
    <>
      {currentUser.pending ? (
        <CircularProgress />
      ) : (
        <>
          {currentUser.isLoggedIn ? (
            <Navigate to="/" />
          ) : (
            <div className="login-section">
              <h1 className="login-logo">
                <span className="logo-left">FIT</span>
                TIME
              </h1>

              <form className="login-form">
                {error && (
                  <div className="error-container">
                    <span className="error-span">{error}</span>
                  </div>
                )}

                <label htmlFor="username-input" className="login-label">
                  Nazwa użytkownika
                </label>
                <input
                  name="username-input"
                  type={"text"}
                  className="form-input"
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
                <label htmlFor="password-input" className="login-label">
                  Hasło
                </label>
                <input
                  name="password-input"
                  type={"password"}
                  className="form-input"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <button
                  className="submit-btn"
                  onClick={handleSubmit}
                  type="submit"
                  disabled={buttonDisabled}
                >
                  Zaloguj
                </button>
              </form>

              <div className="bottom-container">
                <span>Nie posiadasz konta?</span>
                <NavLink
                  style={{
                    color: "rgb(93, 185, 93)",
                    textShadow: "1px 1px 2px black",
                  }}
                  to="/register"
                >
                  Zarejestruj się
                </NavLink>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Login;
