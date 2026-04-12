import { useState } from "react";

function Header() {
  return (
    <div>
      <h1>Telecom CRM</h1>
      <p>Welcome to your sales pipeline</p>
    </div>
  );
}

function Metrics({ opportunities }) {
  const total = opportunities.reduce((s, o) => s + o.value, 0);
  const won = opportunities
    .filter((o) => o.stage === "Won")
    .reduce((s, o) => s + o.value, 0);
  const active = opportunities.filter((o) => o.stage !== "Won").length;

  return (
    <div>
      <p>Total pipeline: €{total.toLocaleString()}</p>
      <p>Won: €{won.toLocaleString()}</p>
      <p>Active opportunities: {active}</p>
    </div>
  );
}

function OpportunityCard({ opportunity, onAdvance }) {
  return (
    <div>
      <strong>{opportunity.name}</strong> — €
      {opportunity.value.toLocaleString()}
      <span> [{opportunity.stage}]</span>
      {opportunity.stage !== "Won" && (
        <button onClick={() => onAdvance(opportunity.id)}>Advance →</button>
      )}
    </div>
  );
}

function App() {
  const STAGES = ["Lead", "Qualified", "Proposal", "Negotiation", "Won"];

  const [opportunities, setOpportunities] = useState([
    { id: 1, name: "BSS Modernization", value: 250000, stage: "Qualified" },
    { id: 2, name: "OSS Platform Upgrade", value: 180000, stage: "Proposal" },
    { id: 3, name: "Billing System", value: 320000, stage: "Won" },
  ]);

  function advanceStage(id) {
    setOpportunities(
      opportunities.map((o) => {
        if (o.id !== id) return o;
        const nextStage = STAGES[STAGES.indexOf(o.stage) + 1];
        return { ...o, stage: nextStage };
      }),
    );
  }

  return (
    <div>
      <Header />
      <Metrics opportunities={opportunities} />
      {opportunities.map((o) => (
        <OpportunityCard key={o.id} opportunity={o} onAdvance={advanceStage} />
      ))}
    </div>
  );
}

export default App;
