import React, { useState, useEffect } from "react";
import axios from "axios";
import Question from "./Components/Question";

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizEnded, setQuizEnded] = useState(false);
  const nextQuestion = () => {
    if (index == 9) {
      setQuizEnded(true);
    } else {
      setIndex(index + 1);
    }
  };

  useEffect(() => {
    axios(
      "https://opentdb.com/api.php?amount=10&category=12&difficulty=medium&type=multiple"
    ).then((response) => setQuestions(response.data.results));
  }, []);
  return (
    <div>
      {quizEnded ? (
        <div>
          <h2>
            Quiz finished! Your score is {score}/{index + 1}
          </h2>
          <form action="/">
            <input type="submit" value="Try Again" />
          </form>
        </div>
      ) : started ? (
        <>
          <Question
            questions={questions}
            index={index}
            score={score}
            setScore={setScore}
            nextQuestion={nextQuestion}
          />
        </>
      ) : (
        <button onClick={() => setStarted(true)}>Start Quiz</button>
      )}
    </div>
  );
};

export default App;
