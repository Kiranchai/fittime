import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Exercises.css";

const Exercises = () => {
  const [exercises, setExercises] = useState([]);
  const [popupShown, setPopupShown] = useState(false);

  useEffect(() => {
    const fetchExercises = async () => {
      fetch("http://localhost:3001/getExercises", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
        .then((res) => res.json())
        .then((data) => setExercises(data));
    };

    fetchExercises();
  }, []);

  const handleClick = () => {
    setPopupShown(true);
  };

  return (
    <>
      <div className={popupShown ? "popup shown" : "popup"}>
        <form className="popup-form">
          <label>Nazwa ćwiczenia:</label>
          <input type={"text"}></input>
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
          </div>
        </div>
      </section>
    </>
  );
};

export default Exercises;
