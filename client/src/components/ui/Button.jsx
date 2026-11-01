export default function Button({ variant = "", size = "", loading = false, children, ...rest }) {
  const cls = ["btn", variant && `btn-${variant}`, size && `btn-${size}`].filter(Boolean).join(" ");
  return (
    <button className={cls} disabled={loading || rest.disabled} {...rest}>
      {loading ? "অপেক্ষা করুন…" : children}
    </button>
  );
}
