import { STAGES } from "../data/defaultData";

function OpportunityCard({ opportunity, prospect, contact, onClick }) {
  return (
    <div className="opp-card" onClick={() => onClick(opportunity.id)}>
      <div className="opp-name">{opportunity.name}</div>
      <div className="opp-prospect">{prospect ? prospect.name : "—"}</div>
      {contact && (
        <div className="opp-contact">
          {contact.name} · {contact.role}
        </div>
      )}
      <div className="opp-footer">
        <span className="opp-value">€{opportunity.value.toLocaleString()}</span>
        <span className="opp-hint">View →</span>
      </div>
    </div>
  );
}

export function Pipeline({
  opportunities,
  prospects,
  contacts,
  onSelectOpportunity,
}) {
  function getProspect(id) {
    return prospects.find((p) => p.id === id);
  }
  function getContact(id) {
    return contacts.find((c) => c.id === id);
  }

  return (
    <div className="pipeline">
      {STAGES.map((stage) => {
        const stageOpps = opportunities.filter((o) => o.stage === stage);
        return (
          <div key={stage} className="stage-col">
            <div className="stage-header">
              {stage}
              <span className="stage-count">{stageOpps.length}</span>
            </div>
            {stageOpps.length === 0 && (
              <div className="empty">No opportunities</div>
            )}
            {stageOpps.map((o) => (
              <OpportunityCard
                key={o.id}
                opportunity={o}
                prospect={getProspect(o.prospectId)}
                contact={getContact(o.keyContactId)}
                onClick={onSelectOpportunity}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}
