import { useState } from "react";
import { STAGES } from "../data/defaultData";

export function OpportunityDetail({
  opportunity,
  prospect,
  contact,
  onBack,
  onStageChange,
  onSaveNotes,
}) {
  const [notes, setNotes] = useState(opportunity.notes || "");
  const [saved, setSaved] = useState(false);
  const currentStageIdx = STAGES.indexOf(opportunity.stage);

  function handleSaveNotes() {
    onSaveNotes(opportunity.id, notes);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function prospectUrl() {
    return "https://" + prospect.website;
  }

  return (
    <div>
      <button className="detail-back-btn" onClick={onBack}>
        Back to pipeline
      </button>

      <div className="detail-grid">
        <div className="detail-main">
          <div className="detail-title">{opportunity.name}</div>
          <div className="detail-subtitle">
            {prospect ? prospect.name : "Unknown"} ·{" "}
            {prospect ? prospect.segment : ""}
          </div>

          <div className="detail-section-label">Value</div>
          <div className="detail-value">
            €{opportunity.value.toLocaleString()}
          </div>

          <div className="detail-section-label">Stage</div>
          <div className="stage-progress">
            {STAGES.map((stage, i) => {
              let cls = "stage-step";
              if (i < currentStageIdx) cls += " completed";
              else if (i === currentStageIdx) cls += " active";
              return (
                <div
                  key={stage}
                  className={cls}
                  onClick={() => onStageChange(opportunity.id, stage)}
                >
                  {stage}
                </div>
              );
            })}
          </div>

          <div className="detail-section-label">Notes</div>
          <textarea
            className="notes-area"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add notes about this opportunity..."
          />
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "8px",
              alignItems: "center",
              gap: "12px",
            }}
          >
            {saved && (
              <span style={{ fontSize: "12px", color: "#3B6D11" }}>
                Notes saved
              </span>
            )}
            <button className="btn btn-primary" onClick={handleSaveNotes}>
              Save notes
            </button>
          </div>
        </div>

        <div className="detail-sidebar">
          {contact && (
            <div className="detail-card">
              <div className="detail-section-label">Key contact</div>
              <div style={{ fontWeight: 500, marginBottom: "4px" }}>
                {contact.name}
              </div>
              <div
                style={{ fontSize: "12px", color: "#888", marginBottom: "4px" }}
              >
                {contact.role}
              </div>
              <div className="contact-detail">
                <a href={"mailto:" + contact.email}>{contact.email}</a>
                <span>{contact.phone}</span>
              </div>
            </div>
          )}

          {prospect && (
            <div className="detail-card">
              <div className="detail-section-label">Prospect</div>
              <div style={{ fontWeight: 500, marginBottom: "4px" }}>
                {prospect.name}
              </div>
              <div
                style={{ fontSize: "12px", color: "#888", marginBottom: "6px" }}
              >
                {prospect.segment} · {prospect.country}
              </div>
              {prospect.website && (
                <a
                  href={prospectUrl()}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    fontSize: "12px",
                    color: "#185FA5",
                    textDecoration: "none",
                  }}
                >
                  {prospect.website}
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
