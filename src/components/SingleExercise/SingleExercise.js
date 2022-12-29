import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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

  return <div>Nazwa: {exercise.name}</div>;
};

export default SingleExercise;
