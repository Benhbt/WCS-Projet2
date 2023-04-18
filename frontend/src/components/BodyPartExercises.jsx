import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function BodyPartExercises({ exercise }) {
  const [filteredArr, setFilteredArr] = useState([]);
  const [uniqueEx, setUniqueEx] = useState([]);
  const splitPath = window.location.pathname.slice(1).split("b").join(" b");
  console.info(splitPath.includes("back"));

  useEffect(() => {
    console.warn(exercise);
    if (exercise.length === 0) {
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": import.meta.env.VITE_APP_KEY,
          "X-RapidAPI-Host": "musclewiki.p.rapidapi.com",
        },
      };
      fetch("https://musclewiki.p.rapidapi.com/exercises", options)
        .then((response) => response.json())
        .then((response) => {
          setFilteredArr(
            response.filter((ex) =>
              ex.target?.Primary?.includes(
                window.location.pathname.slice(1).includes("back")
                  ? splitPath
                  : window.location.pathname.slice(1)
              )
            )
          );
        })
        .catch((err) => console.error(err));
    } else {
      setFilteredArr(
        exercise.filter((ex) =>
          ex.target?.Primary?.includes(
            window.location.pathname.slice(1).includes("back")
              ? splitPath
              : window.location.pathname.slice(1)
          )
        )
      );
    }
  }, []);

  useEffect(() => {
    setUniqueEx([
      ...new Map(filteredArr.map((v) => [v.exercise_name, v])).values(),
    ]);
  }, [filteredArr]);

  return (
    <div>
      <button type="button">
        <Link to="/">RETOUR</Link>
      </button>
      {uniqueEx.map((e) => {
        return <p key={e.id}>{e.exercise_name}</p>;
      })}
    </div>
  );
}

BodyPartExercises.propTypes = {
  exercise: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

export default BodyPartExercises;
