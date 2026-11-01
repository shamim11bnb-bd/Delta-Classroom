export default function Loader({ full = false }) {
  return <div className={`loader${full ? " full" : ""}`} role="status" aria-label="লোড হচ্ছে" />;
}
