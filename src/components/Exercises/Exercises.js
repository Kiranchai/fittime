import React, { useEffect, useState } from "react";
import "./Exercises.css";

const Exercises = () => {
  const [exercises, setExercises] = useState([]);

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

  return (
    <section className="exercises-section">
      <div className="list-container">
        <h2 className="exercises-header">
          Moje ćwiczenia
          <span className="header-span">Dodaj</span>
        </h2>
        <ul className="exercises-list">
          {exercises.map((exercise) => {
            return (
              <li key={exercise._id} className="list-element">
                {exercise.name}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default Exercises;
