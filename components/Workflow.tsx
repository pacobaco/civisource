export function Workflow() {
  const steps = ["Signal", "Match", "Rank", "Draft", "Execute"];
  return (
    <div className="workflow">
      {steps.map((s, i) => (
        <span key={s} style={{ display: "contents" }}>
          <span className="node">{s}</span>
          {i < steps.length - 1 && <span className="arrow">→</span>}
        </span>
      ))}
    </div>
  );
}
