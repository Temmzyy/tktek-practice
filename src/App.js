import { useState } from "react";

function App() {
  const [role, setRole] = useState(null);

  if (!role) {
    return (
      <div>
        <h1>TKTeK Practice</h1>
        <button onClick={() => setRole("student")}>I'm a Student</button>
        <button onClick={() => setRole("teacher")}>I'm a Teacher</button>
      </div>
    );
  }

  return (
    <div>
      {role === "teacher" ? <Teacher /> : <Student />}
    </div>
  );
}
function Teacher() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSave = () => {
    console.log({ question, answer });
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
  const correctAnswer = 5; // TEMP

  const checkAnswer = () => {
    const num = Number(answer);

    if (num === correctAnswer) {
      alert("Correct ✅");
    } else if (num < correctAnswer) {
      alert("Too low 📉");
    } else {
      alert("Too high 📈");
    }
  };

  return (
    <div>
      <h2>Student</h2>
      <p>Solve: 2 + 3</p>

      <input
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />

      <button onClick={checkAnswer}>Submit</button>
    </div>
  );
}
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  // paste your config here
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";

const handleSave = async () => {
  await addDoc(collection(db, "questions"), {
    questionText: question,
    answer: Number(answer),
  });

  alert("Saved!");
};
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

const [questionData, setQuestionData] = useState(null);

useEffect(() => {
  const fetchData = async () => {
    const snapshot = await getDocs(collection(db, "questions"));
    const data = snapshot.docs.map(doc => doc.data());
    setQuestionData(data[0]); // just first for now
  };

  fetchData();
}, []);