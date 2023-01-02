import "./SingleExercise.css";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const SingleExercise = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [exercise, setExercise] = useState({});
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      fetch(`http://localhost:3001/exercise/${id}`, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data._id) {
            navigate("/");
          } else {
            setExercise(data);
          }
        });
    };

    const fetchTrainings = async () => {
      fetch(`http://localhost:3001/getTrainings/${id}`, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
        .then((res) => res.json())
        .then((data) => setTrainings(data));
    };

    fetchData();
    fetchTrainings();
  }, []);

  const data = [
    { date: "24.12", weight: "20" },
    // { date: "26.12", personalBest: "25" },
    // { date: "28.12", personalBest: "32.5" },
    // { date: "30.12", personalBest: "40" },
    // { date: "01.01", personalBest: "45" },
    // { date: "04.01", personalBest: "55" },
    // { date: "07.01", personalBest: "80" },
    // { date: "10.01", personalBest: "95" },
  ];

  return (
    <section className="single-exercise-section">
      <div className="grid-container">
        <div className="details-container">
          <h2 className="details-header">{exercise.name}</h2>
          <span className="details-span">Rekord: 0 kg</span>
        </div>
        <div className="chart-container">
          {data.length === 0 ? (
            <span
              style={{
                fontWeight: "700",
                color: "var(--navbar-bg-color)",
                fontSize: "1.15",
              }}
            >
              Po dodaniu treningów wygeneruje się wykres
            </span>
          ) : (
            <ResponsiveContainer width="90%" height={250}>
              <LineChart
                data={
                  data.length === 1
                    ? [{ date: "01.01", weight: "0" }, ...data]
                    : data
                }
                margin={{ left: -25 }}
              >
                <Line type={"monotone"} dataKey={"weight"} stroke="#8884d8" />
                <CartesianGrid stroke="#ddd" />
                <XAxis dataKey={"date"} />
                <YAxis />
                <Tooltip />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
      <div className="trainings-container">
        <header className="trainings-header">Ostatnie treningi</header>
        <table className="trainings-table">
          <thead
            style={{
              borderBottom: "1px dashed rgb(56, 107, 26)",
              borderTop: "1px dashed rgb(56, 107, 26)",
            }}
          >
            <tr>
              <th>Data</th>
              <th>Ilość serii</th>
              <th>Ilość powtórzeń</th>
              <th>Ciężar (kg)</th>
            </tr>
          </thead>
          <tbody className="trainings-table-body">
            {trainings.map((training) => {
              return (
                <tr className="trainings-table-row">
                  <th>{training.date}</th>
                  <th>{training.series}</th>
                  <th>{training.reps}</th>
                  <th>{training.weight}</th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default SingleExercise;
