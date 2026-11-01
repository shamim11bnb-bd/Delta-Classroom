export default function Input({ label, as = "input", children, ...rest }) {
  const Tag = as;
  return (
    <label className="field">
      <span>{label}</span>
      <Tag className="input" {...rest}>
        {children}
      </Tag>
    </label>
  );
}
