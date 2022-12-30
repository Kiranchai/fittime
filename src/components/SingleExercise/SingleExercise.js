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

    fetchData();
  }, []);

  const data = [
    { date: "24.12", personalBest: "20" },
    { date: "26.12", personalBest: "25" },
    { date: "28.12", personalBest: "32.5" },
    { date: "30.12", personalBest: "40" },
    { date: "01.01", personalBest: "45" },
    { date: "04.01", personalBest: "55" },
    { date: "07.01", personalBest: "80" },
    { date: "10.01", personalBest: "95" },
  ];

  return (
    <section className="single-exercise-section">
      <div className="grid-container">
        <div className="details-container">
          <h2 className="details-header">{exercise.name}</h2>
          <span className="details-span">
            Rekord: {exercise.personalBest} kg
          </span>
        </div>
        <div className="chart-container">
          <ResponsiveContainer width="90%" height={250}>
            <LineChart data={data} margin={{ left: -25 }}>
              <Line
                type={"monotone"}
                dataKey={"personalBest"}
                stroke="#8884d8"
              />
              <CartesianGrid stroke="#ddd" />
              <XAxis dataKey={"date"} />
              <YAxis />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="trainings-container">blbalbal</div>
    </section>
  );
};

export default SingleExercise;
