import React from "react";
import { useState, useEffect } from "react";
import { db } from "./firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

function App() {
    const [ role, setRole] = useState("null");

if (!role) { 
    return (
        <div>
            <h1>TKTeK Practice</h1>
            <button onClick={() => setRole("student")}>I'm a Student</button>
            <button onClick={() => setRole("teacher")}>I'm a Teacher</button>
    
        </div>

    );
}

return(
  <div>
    {role === "teacher" ? <Teacher /> : <Student />}
    </div>
    
  );
}

function Teacher() {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");

    const handleSave = async () => {
        await addDoc(collection(db, "questions"), {
            questiontext : question,
            answer: Number(answer)
        });

        alert("Saved!");
    };

    return (
        <div>
            <h2>Teacher</h2>
            <input 
              placeholder = "Question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
            <input
                placeholder = "Answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
            />
            <button onClick={handleSave}>Save Question</button>
        </div>
    );
}
function Student() { 
    const [answer, setAnswer] = useState("");
    const [questionData, setquestionData] = useState(null);
    
    useEffect(() => {
        const fetchData = async () => {
            const snapshot = await getDocs(collection(db, "questions"));
            const data = snapshot.docs.map((doc) => doc.data());
            setquestionData(data[0]);
        };

        fetchData();
    }, []);

    const correctAnswer = questionData?.answer;

    const checkAnswer = () => {
        const num = Number(answer);
        if (num === correctAnswer) {
            alert("Correct!");
        } else {
            if(num < correctAnswer) {
                alert("Too low!");
            } else {
                alert("Too high!");
            }
            }
    };

    return (
        <div> 
            <h2>Student</h2>

            <p>{questionData?.questiontext || "Loading..." }</p>

            <input 
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
            />
            <button onClick={checkAnswer}>Submit</button>

        </div>
    );
}
export default App;
