import { useState } from "react";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Alert from "../../components/ui/Alert";
import { createQuiz } from "./api";

const blankQuestion = () => ({ question: "", options: ["", "", "", ""], correct_index: 0 });

export default function QuizForm({ courseId, onSaved }) {
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState(10);
  const [questions, setQuestions] = useState([blankQuestion()]);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const patchQ = (i, patch) => setQuestions(questions.map((q, idx) => (idx === i ? { ...q, ...patch } : q)));
  const patchOpt = (i, j, val) => patchQ(i, { options: questions[i].options.map((o, k) => (k === j ? val : o)) });

  async function onSubmit(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const cleaned = questions.map((q) => {
        // ফাঁকা অপশন বাদ দিলে সঠিক উত্তরের ক্রম ঠিক রাখতে ম্যাপ করা হয়
        const kept = q.options.map((text, idx) => ({ text: text.trim(), idx })).filter((o) => o.text);
        const correct = kept.findIndex((o) => o.idx === q.correct_index);
        if (correct < 0) throw new Error("প্রতিটি প্রশ্নের সঠিক উত্তরের অপশনটি পূরণ করুন");
        return { question: q.question, options: kept.map((o) => o.text), correct_index: correct };
      });
      await createQuiz({ course_id: courseId, title, duration_minutes: duration, questions: cleaned });
      setTitle("");
      setQuestions([blankQuestion()]);
      onSaved?.();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="card" onSubmit={onSubmit}>
      <h3>নতুন কুইজ</h3>
      <Alert>{error}</Alert>
      <Input label="কুইজের নাম" required value={title} onChange={(e) => setTitle(e.target.value)} />
      <Input label="সময় (মিনিট)" type="number" min="1" value={duration} onChange={(e) => setDuration(e.target.value)} />

      {questions.map((q, i) => (
        <fieldset key={i} className="card" style={{ marginBottom: "1rem" }}>
          <legend>প্রশ্ন {i + 1}</legend>
          <Input label="প্রশ্ন" required value={q.question} onChange={(e) => patchQ(i, { question: e.target.value })} />
          {q.options.map((o, j) => (
            <div className="row" key={j} style={{ marginBottom: ".5rem" }}>
              <input type="radio" name={`correct-${i}`} checked={q.correct_index === j}
                onChange={() => patchQ(i, { correct_index: j })} aria-label={`অপশন ${j + 1} সঠিক উত্তর`} />
              <input className="input" style={{ flex: 1 }} placeholder={`অপশন ${j + 1}`} value={o} onChange={(e) => patchOpt(i, j, e.target.value)} />
            </div>
          ))}
          <p className="muted" style={{ fontSize: ".9rem" }}>রেডিও বাটন দিয়ে সঠিক উত্তর বেছে নিন।</p>
          {questions.length > 1 && (
            <Button type="button" size="sm" variant="ghost" onClick={() => setQuestions(questions.filter((_, idx) => idx !== i))}>
              প্রশ্নটি বাদ দিন
            </Button>
          )}
        </fieldset>
      ))}

      <div className="row">
        <Button type="button" variant="ghost" onClick={() => setQuestions([...questions, blankQuestion()])}>আরেকটি প্রশ্ন যোগ করুন</Button>
        <Button type="submit" loading={busy}>কুইজ প্রকাশ করুন</Button>
      </div>
    </form>
  );
}
