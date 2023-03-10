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
import { CircularProgress } from "@mui/material";

const SingleExercise = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [exercise, setExercise] = useState("");
  const [trainings, setTrainings] = useState([]);
  const [personalBest, setPersonalBest] = useState(0);
  const [chartData, setChartData] = useState([]);
  const [popupShown, setPopupShown] = useState(false);
  const [removePopupShown, setRemovePopupShown] = useState(false);
  const [removeTrainingId, setRemoveTrainingId] = useState("");
  const [trainingDate, setTrainingDate] = useState(
    new Date().toJSON().slice(0, 10)
  );
  const [series, setSeries] = useState(0);
  const [reps, setReps] = useState(0);
  const [weight, setWeight] = useState(0);

  const fetchTrainings = async () => {
    fetch(`https://fittime.cyclic.app/getTrainings/${id}`, {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.exerciseName) {
          navigate("/");
          return;
        }

        setExercise(data.exerciseName);
        setTrainings(data.trainings);
        setPersonalBest(data.personalBest);
        setChartData([]);
        data.trainings.forEach((training) => {
          setChartData((chartData) => [
            {
              date: training.date.toString().slice(5),
              weight: training.weight,
            },
            ...chartData,
          ]);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSave = (e) => {
    e.preventDefault();

    const training = {
      exerciseId: id,
      date: trainingDate,
      series,
      reps,
      weight,
    };

    fetch("https://fittime.cyclic.app/addTraining", {
      method: "POST",
      headers: {
        "x-access-token": localStorage.getItem("token"),
        "Content-type": "application/json",
      },
      body: JSON.stringify(training),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message);

        if (data.message !== "Wyst??pi?? b????d przy zapisywaniu") {
          fetchTrainings();
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setPopupShown(false);
      });
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setPopupShown(false);
  };

  const handleRemove = (e) => {
    e.preventDefault();

    fetch(`https://fittime.cyclic.app/removeTraining/${removeTrainingId}`, {
      method: "DELETE",
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then(() => {
        fetchTrainings();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setRemovePopupShown(false);
        setRemoveTrainingId("");
      });
  };

  useEffect(() => {
    fetchTrainings();
  }, []);

  return (
    <>
      <div className={popupShown ? "popup shown" : "popup"}>
        <form className="popup-form">
          <label htmlFor="training-date" className="popup-label">
            Data treningu:
          </label>
          <input
            className="popup-input"
            type={"date"}
            name="training-date"
            onChange={(e) => {
              setTrainingDate(e.target.value);
            }}
          />

          <label htmlFor="training-series" className="popup-label">
            Ilo???? serii:
          </label>
          <input
            name="training-series"
            className="popup-input"
            type={"number"}
            placeholder="3"
            onChange={(e) => {
              setSeries(e.target.value);
            }}
          />
          <label htmlFor="training-reps" className="popup-label">
            Ilo???? powt??rze??:
          </label>
          <input
            name="training-reps"
            className="popup-input"
            type={"number"}
            placeholder="8"
            onChange={(e) => {
              setReps(e.target.value);
            }}
          />
          <label htmlFor="training-weight" className="popup-label">
            Ci????ar (kg):
          </label>
          <input
            name="training-weight"
            className="popup-input"
            type={"number"}
            placeholder="120"
            onChange={(e) => {
              setWeight(e.target.value);
            }}
          />

          <div className="button-container">
            <button
              className="popup-button save"
              type="submit"
              onClick={handleSave}
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
              Czy na pewno chcesz usun???? ten trening?
            </h3>
            <span style={{ fontSize: "1.2rem" }}>Zmiany s?? nieodwracalne</span>
          </div>
          <div className="button-container">
            <button className="remove-popup-btn remove" onClick={handleRemove}>
              Usu??
            </button>
            <button
              className="remove-popup-btn remove-cancel"
              onClick={() => {
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
            ? "single-exercise-section blurred"
            : "single-exercise-section"
        }
      >
        <div className="grid-container">
          <div className="details-container">
            <h2 className="details-header">
              {!!exercise ? exercise : <CircularProgress />}
            </h2>
            <span className="details-span">
              Rekord: {!!personalBest ? personalBest : "0"}
              kg
            </span>
            <button
              className="add-training-btn"
              onClick={() => {
                setPopupShown(true);
              }}
            >
              Dodaj trening
            </button>
          </div>
          <div className="chart-container">
            {chartData.length === 0 ? (
              <span
                style={{
                  fontWeight: "700",
                  color: "var(--navbar-bg-color)",
                  fontSize: "1.15",
                }}
              >
                Po dodaniu trening??w wygeneruje si?? wykres
              </span>
            ) : (
              <ResponsiveContainer width="90%" height={250}>
                <LineChart
                  data={
                    chartData.length === 1
                      ? [{ date: "01-01", weight: "0" }, ...chartData]
                      : chartData
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
                <th>Ilo???? serii</th>
                <th>Ilo???? powt??rze??</th>
                <th>Ci????ar (kg)</th>
              </tr>
            </thead>
            <tbody className="trainings-table-body">
              {trainings &&
                trainings.map((training) => {
                  return (
                    <tr
                      className="trainings-table-row"
                      key={training._id}
                      onClick={() => {
                        setRemovePopupShown(true);
                        setRemoveTrainingId(training._id);
                      }}
                    >
                      <td>{training.date}</td>
                      <td>{training.series}</td>
                      <td>{training.reps}</td>
                      <td>{training.weight}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default SingleExercise;
