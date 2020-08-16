import React, { useState } from "react";

const Question = ({ questions, index, nextQuestion, score, setScore }) => {
  const shuffle = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };
  const allOptions = shuffle([
    questions[index].correct_answer,
    ...questions[index].incorrect_answers,
  ]);
  let userAnswer = "";
  const questionControl = () => {
    if (userAnswer == questions[index].correct_answer) {
      setScore(score + 1);
    }
    nextQuestion();
  };

  console.log(allOptions);
  console.log(questions[index].correct_answer);
  return (
    <div>
      <h3>Question number {index + 1}</h3>
      <p>{questions[index].question}</p>
      {allOptions.map((item) => (
        <>
          <input
            onChange={(e) => (userAnswer = e.target.value)}
            type="radio"
            id={item}
            name="answer"
            value={item}
          />
          <label htmlFor={item}>{item}</label>
        </>
      ))}
      <br />
      <button onClick={questionControl}>
        {index == 9 ? "Finish Quiz" : "Next Question"}
      </button>
      {index > 0 && (
        <h4>
          Score: {score}/{index}
        </h4>
      )}
    </div>
  );
};

export default Question;
