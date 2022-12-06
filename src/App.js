import { useState } from "react";
import "./App.css";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const questions = [
    {
      questionsText: "Türkiye'nin Başkenti nedir?",
      answerOptions: [
        {
          answerText: "NewYork",
          isCorrent: false,
        },
        {
          answerText: "Paris",
          isCorrent: false,
        },
        {
          answerText: "London",
          isCorrent: false,
        },
        {
          answerText: "Ankara",
          isCorrent: true,
        },
      ],
    },
    {
      questionsText: "5 + 3 = ?",
      answerOptions: [
        {
          answerText: "8",
          isCorrent: true,
        },
        {
          answerText: "13",
          isCorrent: false,
        },
        {
          answerText: "2",
          isCorrent: false,
        },
        {
          answerText: "7",
          isCorrent: false,
        },
      ],
    },
    {
      questionsText: "Atatürk'ün doğum yılı nedir?",
      answerOptions: [
        {
          answerText: "1891",
          isCorrent: false,
        },
        {
          answerText: "1981",
          isCorrent: false,
        },
        {
          answerText: "1881",
          isCorrent: true,
        },
        {
          answerText: "1923",
          isCorrent: false,
        },
      ],
    },
    {
      questionsText: "Şuan hangi yıldayız?",
      answerOptions: [
        {
          answerText: "2000",
          isCorrent: false,
        },
        {
          answerText: "2021",
          isCorrent: false,
        },
        {
          answerText: "2022",
          isCorrent: true,
        },
        {
          answerText: "2023",
          isCorrent: false,
        },
      ],
    },
  ];

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleClick = async (e, item, idx) => {
    if (item.isCorrent === true) {
      e.target.classList.add("success");
      setScore((state) => score + 1);
      toast.success("Doğru bildiniz !");
    } else {
      e.target.classList.add("unsuccessful");
      toast.error("Yanlış yaptınız !");
    }
    await delay(500);

    e.target.classList.remove("success");
    e.target.classList.remove("unsuccessful");

    if (currentQuestions + 1 < questions.length) {
      console.log(currentQuestions + " => " + questions.length);
      setCurrentQuestions((state) => currentQuestions + 1);
    } else {
      setShowScore(true);
    }
  };

  const handleRestart = () => {
    setShowScore(false);
    setScore(0);
    setCurrentQuestions(0);
  };

  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [currentQuestions, setCurrentQuestions] = useState(0);

  return (
    <div className="App">
      <Toaster position="top-right" reverseOrder={false} />

      <div className="box">
        {showScore ? (
          <div className="scoreShow">
            <div>
              Your Score = <span>{score}/</span>
              {questions.length}
            </div>
            <br></br>
            <button style={{ padding: "1rem 2rem" }} onClick={handleRestart}>
              {" "}
              Restart{" "}
            </button>
          </div>
        ) : (
          <>
            <div className="question-section">
              <div className="question-count">
                <span>
                  Question {currentQuestions + 1}/{questions.length}
                </span>
              </div>
              <div className="question-text">
                {questions[currentQuestions].questionsText}
              </div>
            </div>
            <div className="answer-section">
              {questions[currentQuestions].answerOptions.map((item, idx) => (
                <button onClick={(e) => handleClick(e, item, idx)}>
                  {item.answerText}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
