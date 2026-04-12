export function Metrics({ opportunities }) {
  const total = opportunities.reduce((s, o) => s + o.value, 0);
  const won = opportunities
    .filter((o) => o.stage === "Won")
    .reduce((s, o) => s + o.value, 0);
  const active = opportunities.filter((o) => o.stage !== "Won").length;
  const wonCount = opportunities.filter((o) => o.stage === "Won").length;

  return (
    <div className="metrics">
      <div className="metric">
        <div className="metric-label">Total pipeline</div>
        <div className="metric-value">€{total.toLocaleString()}</div>
        <div className="metric-sub">{opportunities.length} opportunities</div>
      </div>
      <div className="metric">
        <div className="metric-label">Won</div>
        <div className="metric-value">€{won.toLocaleString()}</div>
        <div className="metric-sub">{wonCount} closed</div>
      </div>
      <div className="metric">
        <div className="metric-label">Active</div>
        <div className="metric-value">{active}</div>
        <div className="metric-sub">in progress</div>
      </div>
      <div className="metric">
        <div className="metric-label">Prospects</div>
        <div className="metric-value">{opportunities.length}</div>
        <div className="metric-sub">in pipeline</div>
      </div>
    </div>
  );
}
