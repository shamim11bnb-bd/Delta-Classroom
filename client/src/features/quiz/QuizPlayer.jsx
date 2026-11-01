import { useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import Loader from "../../components/common/Loader";
import Empty from "../../components/common/Empty";
import Alert from "../../components/ui/Alert";
import Button from "../../components/ui/Button";
import Modal from "../../components/ui/Modal";
import { listAttempts, listMyAttempts, listQuestions, listQuizzes, submitQuiz } from "./api";
import QuizForm from "./QuizForm";

function Player({ quiz, onDone }) {
  const { data: questions, loading, error } = useFetch(() => listQuestions(quiz.id), [quiz.id]);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  if (loading) return <Loader />;
  if (result)
    return (
      <div className="stack">
        <Alert type="ok">আপনার ফলাফল: {result.score} / {result.total}</Alert>
        <Button onClick={onDone}>বন্ধ করুন</Button>
      </div>
    );

  async function send() {
    setBusy(true);
    setErr("");
    try {
      setResult(await submitQuiz(quiz.id, answers));
    } catch (e) {
      setErr(e.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <Alert>{error || err}</Alert>
      <p className="muted">সময়: {quiz.duration_minutes} মিনিট। শুধু একবার দেওয়া যাবে।</p>
      {questions.map((q, i) => (
        <fieldset key={q.id} style={{ border: 0, padding: 0, marginBottom: "1.25rem" }}>
          <legend style={{ fontWeight: 600, marginBottom: ".5rem" }}>{i + 1}. {q.question}</legend>
          {q.options.map((o, j) => (
            <label key={j} className="opt">
              <input type="radio" name={q.id} checked={answers[q.id] === j} onChange={() => setAnswers({ ...answers, [q.id]: j })} />
              {o}
            </label>
          ))}
        </fieldset>
      ))}
      <Button onClick={send} loading={busy} disabled={Object.keys(answers).length < questions.length}>উত্তর জমা দিন</Button>
    </div>
  );
}

function Results({ quiz }) {
  const { data, loading } = useFetch(() => listAttempts(quiz.id), [quiz.id]);
  if (loading) return <Loader />;
  if (!data?.length) return <Empty>এখনো কেউ কুইজ দেয়নি।</Empty>;
  return (
    <table>
      <thead><tr><th>শিক্ষার্থী</th><th>স্কোর</th></tr></thead>
      <tbody>{data.map((a) => <tr key={a.id}><td>{a.student?.full_name}</td><td>{a.score} / {a.total}</td></tr>)}</tbody>
    </table>
  );
}

export default function QuizPlayer({ courseId, isTeacher, userId }) {
  const quizzes = useFetch(() => listQuizzes(courseId), [courseId]);
  const attempts = useFetch(() => (isTeacher ? [] : listMyAttempts(userId)), [isTeacher, userId]);
  const [open, setOpen] = useState(null);

  if (quizzes.loading || attempts.loading) return <Loader />;
  const attemptOf = (id) => attempts.data?.find((a) => a.quiz_id === id);

  return (
    <div className="stack">
      <Alert>{quizzes.error || attempts.error}</Alert>
      {quizzes.data?.length === 0 && <Empty>এখনো কোনো কুইজ নেই।</Empty>}
      <ul className="list">
        {quizzes.data?.map((q) => {
          const a = attemptOf(q.id);
          return (
            <li key={q.id} className="row between">
              <div>
                <h3 style={{ margin: 0 }}>{q.title}</h3>
                <span className="muted">{q.duration_minutes} মিনিট</span>
              </div>
              {isTeacher ? (
                <Button size="sm" variant="ghost" onClick={() => setOpen(q)}>ফলাফল দেখুন</Button>
              ) : a ? (
                <span className="tag">স্কোর {a.score}/{a.total}</span>
              ) : (
                <Button size="sm" onClick={() => setOpen(q)}>কুইজ দিন</Button>
              )}
            </li>
          );
        })}
      </ul>

      <Modal open={!!open} title={open?.title} onClose={() => setOpen(null)}>
        {open && (isTeacher ? <Results quiz={open} /> : <Player quiz={open} onDone={() => { setOpen(null); attempts.reload(); }} />)}
      </Modal>

      {isTeacher && <QuizForm courseId={courseId} onSaved={quizzes.reload} />}
    </div>
  );
}
