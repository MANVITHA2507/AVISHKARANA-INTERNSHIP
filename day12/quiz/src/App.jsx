import { useState, useEffect } from "react";

const questions = [
  { q: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Rome"], answer: "Paris" },
  { q: "Which planet is closest to the Sun?", options: ["Venus", "Mercury", "Earth", "Mars"], answer: "Mercury" },
  { q: "How many continents are there?", options: ["5", "6", "7", "8"], answer: "7" },
  { q: "What is the largest ocean?", options: ["Atlantic", "Indian", "Arctic", "Pacific"], answer: "Pacific" },
  { q: "Who invented the telephone?", options: ["Edison", "Tesla", "Bell", "Newton"], answer: "Bell" },
  { q: "What is the chemical symbol for water?", options: ["O2", "H2O", "CO2", "HO"], answer: "H2O" },
  { q: "How many sides does a hexagon have?", options: ["5", "6", "7", "8"], answer: "6" },
  { q: "Which country has the most population?", options: ["USA", "Russia", "India", "China"], answer: "India" },
  { q: "What is the speed of light (approx)?", options: ["300 km/s", "3000 km/s", "300,000 km/s", "3,000,000 km/s"], answer: "300,000 km/s" },
  { q: "Which gas do plants absorb?", options: ["Oxygen", "Nitrogen", "CO2", "Hydrogen"], answer: "CO2" },
];

const s = {
  app: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Segoe UI', sans-serif",
    padding: "20px",
  },
  card: {
    background: "#fff",
    borderRadius: "24px",
    padding: "36px 32px",
    width: "100%",
    maxWidth: "580px",
    boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "8px",
  },
  progress: { fontSize: "13px", color: "#888", fontWeight: "600" },
  timer: (t) => ({
    fontSize: "14px",
    fontWeight: "800",
    color: t <= 10 ? "#f44336" : "#764ba2",
    background: t <= 10 ? "#ffebee" : "#f0edff",
    padding: "4px 12px",
    borderRadius: "20px",
  }),
  bar: { height: "6px", background: "#eee", borderRadius: "10px", marginBottom: "28px" },
  fill: (pct) => ({
    height: "100%",
    width: `${pct}%`,
    background: "linear-gradient(90deg, #667eea, #764ba2)",
    borderRadius: "10px",
    transition: "width 0.4s ease",
  }),
  question: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#222",
    marginBottom: "24px",
    lineHeight: "1.5",
  },
  optBtn: (state) => ({
    display: "block",
    width: "100%",
    padding: "14px 18px",
    marginBottom: "12px",
    borderRadius: "12px",
    border: "2px solid",
    borderColor: state === "correct" ? "#4caf50" : state === "wrong" ? "#f44336" : "#e0e0e0",
    background: state === "correct" ? "#e8f5e9" : state === "wrong" ? "#ffebee" : "#fafafa",
    color: "#333",
    fontSize: "15px",
    fontWeight: "500",
    textAlign: "left",
    cursor: state ? "default" : "pointer",
  }),
  nextBtn: {
    marginTop: "8px",
    width: "100%",
    padding: "14px",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
  },
  resultCard: { textAlign: "center" },
  emoji: { fontSize: "64px", marginBottom: "12px" },
  resultTitle: { fontSize: "26px", fontWeight: "900", color: "#222", marginBottom: "8px" },
  resultMsg: { color: "#666", fontSize: "15px", marginBottom: "16px" },
  timeTaken: { color: "#764ba2", fontSize: "14px", fontWeight: "600", marginBottom: "24px" },
  circle: {
    width: "110px",
    height: "110px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 24px",
  },
  circleNum: { fontSize: "34px", fontWeight: "900", color: "#fff" },
  circleLbl: { fontSize: "12px", color: "rgba(255,255,255,0.8)", fontWeight: "600" },
  restartBtn: {
    padding: "14px 40px",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    color: "#fff",
    border: "none",
    borderRadius: "25px",
    fontSize: "16px",
    fontWeight: "800",
    cursor: "pointer",
  },
};

export default function App() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [timeTaken, setTimeTaken] = useState(0);

  const q = questions[current];

  useEffect(() => {
    if (finished) return;
    if (timeLeft === 0) {
      setTimeTaken(60);
      setFinished(true);
      return;
    }
    const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, finished]);

  const handleSelect = (opt) => {
    if (selected) return;
    setSelected(opt);
    if (opt === q.answer) setScore((s) => s + 1);
  };

  const handleNext = () => {
    if (current + 1 >= questions.length) {
      setTimeTaken(60 - timeLeft);
      setFinished(true);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
    }
  };

  const restart = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
    setTimeLeft(60);
    setTimeTaken(0);
  };

  const getEmoji = () => {
    if (score >= 9) return "🏆";
    if (score >= 7) return "🎉";
    if (score >= 5) return "👍";
    return "📚";
  };

  const getMessage = () => {
    if (score >= 9) return "Outstanding! You're a genius!";
    if (score >= 7) return "Great job! Almost perfect!";
    if (score >= 5) return "Good effort! Keep learning!";
    return "Keep practicing, you'll get better!";
  };

  const getOptState = (opt) => {
    if (!selected) return null;
    if (opt === q.answer) return "correct";
    if (opt === selected) return "wrong";
    return null;
  };

  return (
    <div style={s.app}>
      <div style={s.card}>
        {finished ? (
          <div style={s.resultCard}>
            <div style={s.emoji}>{getEmoji()}</div>
            <div style={s.resultTitle}>Quiz Complete!</div>
            <div style={s.resultMsg}>{getMessage()}</div>
            <div style={s.timeTaken}>⏱ Time taken: {timeTaken} seconds</div>
            <div style={s.circle}>
              <span style={s.circleNum}>{score}</span>
              <span style={s.circleLbl}>/ {questions.length}</span>
            </div>
            <button style={s.restartBtn} onClick={restart}>Play Again 🔄</button>
          </div>
        ) : (
          <div>
            <div style={s.header}>
              <span style={s.progress}>Question {current + 1} / {questions.length}</span>
              <span style={s.timer(timeLeft)}>⏱ {timeLeft}s</span>
            </div>
            <div style={s.bar}>
              <div style={s.fill((current / questions.length) * 100)}></div>
            </div>
            <div style={s.question}>{q.q}</div>
            {q.options.map((opt) => (
              <button key={opt} style={s.optBtn(getOptState(opt))} onClick={() => handleSelect(opt)}>
                {opt}
              </button>
            ))}
            {selected && (
              <button style={s.nextBtn} onClick={handleNext}>
                {current + 1 >= questions.length ? "See Results 🎯" : "Next →"}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}