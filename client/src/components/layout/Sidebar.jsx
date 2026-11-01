// ড্যাশবোর্ডের ভেতরের সেকশন বদলানোর পাশের মেনু (tabs-এর বিকল্প)
export default function Sidebar({ items, active, onChange }) {
  return (
    <div className="tabs" role="tablist">
      {items.map((it) => (
        <button key={it.key} role="tab" className="tab" aria-selected={active === it.key} onClick={() => onChange(it.key)}>
          {it.label}
        </button>
      ))}
    </div>
  );
}
