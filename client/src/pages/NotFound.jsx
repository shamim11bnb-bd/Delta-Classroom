import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container">
      <h1>পেজটি খুঁজে পাওয়া যায়নি</h1>
      <p>লিংকটি ভুল হতে পারে অথবা পেজটি সরিয়ে ফেলা হয়েছে।</p>
      <Link className="btn" to="/">হোমে ফিরুন</Link>
    </div>
  );
}
