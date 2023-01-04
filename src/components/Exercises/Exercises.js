import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Exercises.css";
import { AiTwotoneDelete } from "react-icons/ai";

const Exercises = () => {
  const [exercises, setExercises] = useState([]);
  const [popupShown, setPopupShown] = useState(false);
  const [exerciseName, setExerciseName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [removePopupShown, setRemovePopupShown] = useState(false);
  const [removeExerciseId, setRemoveExerciseId] = useState("");

  const fetchExercises = async () => {
    fetch("https://fittime.cyclic.app/getExercises", {
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

  const handlePopupShown = (e, exerciseId) => {
    e.preventDefault();
    setRemovePopupShown(true);
    setRemoveExerciseId(exerciseId);
  };

  const handleRemove = (e) => {
    e.preventDefault();

    fetch(`https://fittime.cyclic.app/removeExercise/${removeExerciseId}`, {
      method: "DELETE",
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then(() => {
        console.log("removed" + removeExerciseId);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setRemoveExerciseId("");
        setRemovePopupShown(false);
        fetchExercises();
      });
  };

  const handleSave = (e) => {
    e.preventDefault();

    const exercise = {
      name: exerciseName,
    };

    fetch("https://fittime.cyclic.app/addExercise", {
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

      {removePopupShown && (
        <div className="remove-popup">
          <div className="popup-info">
            <h3 style={{ fontSize: "1.8rem" }}>
              Czy na pewno chcesz usunąć te ćwiczenie?
            </h3>
            <span style={{ fontSize: "1.2rem" }}>Zmiany są nieodwracalne</span>
          </div>
          <div className="button-container">
            <button className="remove-popup-btn remove" onClick={handleRemove}>
              Usuń
            </button>
            <button
              className="remove-popup-btn remove-cancel"
              onClick={(e) => {
                setRemovePopupShown(false);
              }}
            >
              Anuluj
            </button>
          </div>
        </div>
      )}

      <section
        className={
          popupShown || removePopupShown
            ? "exercises-section blurred"
            : "exercises-section"
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
                    <div className="list-element" key={exercise._id}>
                      <NavLink
                        className={"list-link"}
                        to={`/exercise/${exercise._id}`}
                      >
                        {exercise.name}
                      </NavLink>
                      <button
                        className="delete-button"
                        onClick={(e) => {
                          handlePopupShown(e, exercise._id);
                        }}
                      >
                        <AiTwotoneDelete />
                      </button>
                    </div>
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
