import { CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Registration = () => {
  const { currentUser } = useAuth();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [popupShown, setPopupShown] = useState(true);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (password !== confirmPassword) {
      setError("Podane hasła różnią się");
      return;
    }

    const user = {
      email,
      username,
      password,
    };

    fetch("https://fittime.cyclic.app/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Account created") {
          alert("Udało się stworzyć konto");
          navigate("/login");
        } else {
          setError(data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
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
            <>
              {popupShown && (
                <div className="remove-popup">
                  <div className="popup-info">
                    <h3
                      style={{
                        fontSize: "3rem",
                        color: "red",
                        textShadow: "2px 2px 2px black",
                      }}
                    >
                      Uwaga
                    </h3>
                    <span style={{ fontSize: "1.2rem" }}>
                      Proszę nie podawać prawdziwych danych.
                    </span>
                  </div>
                  <div className="button-container">
                    <button
                      className="remove-popup-btn save"
                      onClick={() => {
                        setPopupShown(false);
                      }}
                    >
                      Rozumiem
                    </button>
                  </div>
                </div>
              )}

              <div
                className={
                  popupShown ? "login-section blurred" : "login-section"
                }
              >
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

                  <label htmlFor="email-input" className="login-label">
                    Email
                  </label>
                  <input
                    name="email-input"
                    type={"text"}
                    className="form-input"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />

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

                  <label
                    htmlFor="confirm-password-input"
                    className="login-label"
                  >
                    Potwierdź hasło
                  </label>
                  <input
                    name="confirm-password-input"
                    type={"password"}
                    className="form-input"
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                    }}
                  />

                  <button
                    className="submit-btn"
                    onClick={handleSubmit}
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? <CircularProgress /> : "Stwórz konto"}
                  </button>
                </form>

                <div className="bottom-container">
                  <span>Masz już konto?</span>
                  <NavLink
                    style={{
                      color: "rgb(93, 185, 93)",
                      textShadow: "1px 1px 2px black",
                    }}
                    to="/login"
                  >
                    Zaloguj się
                  </NavLink>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Registration;
