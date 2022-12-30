import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Exercises.css";

const Exercises = () => {
  const [exercises, setExercises] = useState([]);
  const [popupShown, setPopupShown] = useState(false);
  const [exerciseName, setExerciseName] = useState("");
  const [personalBest, setPersonalBest] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const fetchExercises = async () => {
    fetch("http://localhost:3001/getExercises", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setExercises(data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchExercises();
  }, []);

  const handleClick = () => {
    setPopupShown(true);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setPopupShown(false);
  };

  const handleSave = (e) => {
    e.preventDefault();

    const exercise = {
      name: exerciseName,
      personalBest: personalBest,
    };

    fetch("http://localhost:3001/addExercise", {
      method: "POST",
      headers: {
        "x-access-token": localStorage.getItem("token"),
        "Content-type": "application/json",
      },
      body: JSON.stringify(exercise),
    })
      .then((res) => res.json())
      .then((data) => {
        fetchExercises();
        console.log(data.message);
      });

    setPopupShown(false);
  };

  return (
    <>
      <div className={popupShown ? "popup shown" : "popup"}>
        <form className="popup-form">
          <label className="popup-label" htmlFor="exercise-name">
            Nazwa ćwiczenia:
          </label>
          <input
            className="popup-input"
            name="exercise-name"
            type={"text"}
            placeholder="Martwy Ciąg"
            onChange={(e) => {
              setExerciseName(e.target.value);
            }}
          />
          <label className="popup-label" htmlFor="personal-best">
            Rekord (kg):{" "}
          </label>
          <input
            className="popup-input"
            type={"number"}
            name="personal-best"
            placeholder="150"
            onChange={(e) => {
              setPersonalBest(e.target.value);
            }}
          />
          <label className="popup-label" htmlFor="reps">
            Ilość powtórzeń:{" "}
          </label>
          <input
            className="popup-input"
            type={"number"}
            name="reps"
            placeholder="1"
          />
          <div className="button-container">
            <button
              onClick={handleSave}
              className="popup-button save"
              type="submit"
            >
              Zapisz
            </button>
            <button className="popup-button cancel" onClick={handleCancel}>
              Anuluj
            </button>
          </div>
        </form>
      </div>

      <section
        className={
          popupShown ? "exercises-section blurred" : "exercises-section"
        }
      >
        <div className="list-container">
          <h2 className="exercises-header">
            Moje ćwiczenia
            <span className="header-span" onClick={handleClick}>
              Dodaj
            </span>
          </h2>
          <div className="exercises-list">
            {isLoading ? (
              <div
                style={{
                  width: "100%",
                  backgroundColor: "rgb(21, 131, 36)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderBottomLeftRadius: "1rem",
                  borderBottomRightRadius: "1rem",
                }}
              >
                <CircularProgress
                  style={{
                    color: "white",
                  }}
                />
              </div>
            ) : (
              <>
                {exercises.map((exercise) => {
                  return (
                    <NavLink
                      className="list-element"
                      to={`/exercise/${exercise._id}`}
                      key={exercise._id}
                    >
                      {exercise.name}
                    </NavLink>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Exercises;
