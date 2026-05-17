import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

function App() {
  const [mode, setMode] = useState(null);

  if (!mode) {
    return (
      <div>
        <h1>TKTeK Practice</h1>

        <button onClick={() => setMode("student")}>
          Student Practice
        </button>
        <button onClick={() => setMode("teacher")}>
          Teacher Question Creator
        </button>
        <button onClick={() => setMode("generator")}>
          Test Question Generator
        </button>
      </div>
    );
  }

  return (
    <div>
      {mode === "student" && <Student />}
      {mode === "teacher" && <Teacher />}
      {mode === "generator" && <Generator />}
    </div>
  );
}

function Teacher() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSave = async () => {
    await addDoc(collection(db, "questions"), {
      questionText: question,
      answer: Number(answer),
      createdAt: Date.now()
    });

    alert("Saved!");
  };

  return (
    <div>
      <h2>Teacher</h2>

      <input
        placeholder="Question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      <input
        placeholder="Answer"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />

      <button onClick={handleSave}>Save Question</button>
    </div>
  );
}

function Student() {
  const [answer, setAnswer] = useState("");
  const [questionData, setQuestionData] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await getDocs(collection(db, "questions"));

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));

      setQuestionData(data);
    };

    fetchData();
  }, []);

  const correctAnswer = questionData?.[index]?.answer;

  const checkAnswer = () => {
    const num = Number(answer);

    if (num === correctAnswer) {
      alert("Correct");
    } else if (num < correctAnswer) {
      alert("Too low");
    } else {
      alert("Too high");
    }
  };

  return (
    <div>
      <h2>Student</h2>

      <p>{questionData?.[index]?.questionText || "Loading..."}</p>

      <input
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />

      <button onClick={checkAnswer}>Submit</button>

      <button
        onClick={() => {
          if (index < questionData.length - 1) {
            setIndex(index + 1);
          }
        }}
      >
        Next Question
      </button>
    </div>
  );
}

function Generator() {
  const [questions, setQuestions] = useState([]);

  const generateQuestions = () => {
    let generated = [];

    for (let i = 0; i < 10; i++) {
      const a = Math.floor(Math.random() * 20) + 1;
      const b = Math.floor(Math.random() * 20) + 1;

      generated.push({
        question: `${a} + ${b}`,
        answer: a + b,
      });
    }

    setQuestions(generated);
  };

  return (
    <div>
      <h2>Teacher Test Generator</h2>

      <button onClick={generateQuestions}>Generate Test</button>

      {questions.map((q, index) => (
        <div key={index}>
          <p>
            {index + 1}. {q.question} = ___
          </p>
          <small>Answer: {q.answer}</small>
        </div>
      ))}
    </div>
  );
}

export default App;