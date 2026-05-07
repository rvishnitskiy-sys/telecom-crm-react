import { useState, useEffect } from "react";
import { api } from "../data/api";

const TYPE_LABELS = { call: "Call", email: "Email", meeting: "Meeting", note: "Note" };

function formatDate(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function ActivityLog({ opportunityId }) {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState("call");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    api.activities.getByOpportunity(opportunityId).then((data) => {
      setActivities(data.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      setLoading(false);
    });
  }, [opportunityId]);

  async function handleAdd() {
    if (!description.trim()) return;
    setSubmitting(true);
    try {
      const activity = await api.activities.create({
        opportunity_id: opportunityId,
        type,
        description: description.trim(),
      });
      setActivities((prev) => [activity, ...prev]);
      setDescription("");
    } finally {
      setSubmitting(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleAdd();
  }

  return (
    <div className="activity-log">
      <div className="activity-add">
        <div className="activity-add-row">
          <select
            className="activity-type-select"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="call">Call</option>
            <option value="email">Email</option>
            <option value="meeting">Meeting</option>
            <option value="note">Note</option>
          </select>
          <textarea
            className="activity-description"
            placeholder="Describe the activity… (Ctrl+Enter to save)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={2}
          />
        </div>
        <div className="activity-add-footer">
          <button
            className="btn btn-primary"
            onClick={handleAdd}
            disabled={submitting || !description.trim()}
          >
            {submitting ? "Saving…" : "Log activity"}
          </button>
        </div>
      </div>

      {loading ? (
        <div className="empty">Loading…</div>
      ) : activities.length === 0 ? (
        <div className="empty">No activities logged yet.</div>
      ) : (
        <div className="activity-list">
          {activities.map((a) => (
            <div key={a.id} className="activity-item">
              <div className="activity-item-header">
                <span className={`badge badge-activity-${a.type}`}>
                  {TYPE_LABELS[a.type] ?? a.type}
                </span>
                <span className="activity-date">{formatDate(a.createdAt)}</span>
              </div>
              <p className="activity-description-text">{a.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
