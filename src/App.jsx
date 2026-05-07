import { useState } from "react";
import { useCRM } from "./hooks/useCRM";
import { Metrics } from "./components/Metrics";
import { Pipeline } from "./components/Pipeline";
import { Tabs } from "./components/Tabs";
import { OpportunityDetail } from "./components/OpportunityDetail";
import { ProspectsTable } from "./components/ProspectsTable";
import { ContactsTable } from "./components/ContactsTable";
import { AddProspectForm } from "./components/AddProspectForm";
import { AddContactForm } from "./components/AddContactForm";
import { AddOpportunityForm } from "./components/AddOpportunityForm";
import { useAuth } from "./auth/AuthContext";
import { LoginPage } from "./components/LoginPage";

function App() {
  const { token, username, logout } = useAuth();

  if (!token) return <LoginPage />;

  const {
    prospects,
    contacts,
    opportunities,
    loading,
    error,
    setOpportunityStage,
    saveNotes,
    addProspect,
    addContact,
    addOpportunity,
  } = useCRM();

  const [activeTab, setActiveTab] = useState("Pipeline");
  const [selectedOppId, setSelectedOppId] = useState(null);
  const [showAddProspect, setShowAddProspect] = useState(false);
  const [showAddContact, setShowAddContact] = useState(false);
  const [showAddOpportunity, setShowAddOpportunity] = useState(false);

  const selectedOpp = opportunities.find((o) => o.id === selectedOppId);
  const selectedProspect = selectedOpp
    ? prospects.find((p) => p.id === selectedOpp.prospectId)
    : null;
  const selectedContact = selectedOpp
    ? contacts.find((c) => c.id === selectedOpp.keyContactId)
    : null;

  if (loading) return <div style={{ padding: "2rem" }}>Loading...</div>;
  if (error)
    return <div style={{ padding: "2rem", color: "red" }}>Error: {error}</div>;

  return (
    <div className="app">
      <div className="header">
        <h1>Telecom CRM</h1>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {!selectedOpp && (
            <div className="header-actions">
              <button className="btn" onClick={() => setShowAddProspect(true)}>
                + Add prospect
              </button>
              <button className="btn" onClick={() => setShowAddContact(true)}>
                + Add contact
              </button>
              <button
                className="btn"
                onClick={() => setShowAddOpportunity(true)}
              >
                + Add opportunity
              </button>
            </div>
          )}
          <span style={{ fontSize: "13px", color: "#888" }}>{username}</span>
          <button className="btn" onClick={logout}>
            Sign out
          </button>
        </div>
      </div>

      <Metrics opportunities={opportunities} />

      {selectedOpp ? (
        <OpportunityDetail
          opportunity={selectedOpp}
          prospect={selectedProspect}
          contact={selectedContact}
          onBack={() => setSelectedOppId(null)}
          onStageChange={setOpportunityStage}
          onSaveNotes={saveNotes}
        />
      ) : (
        <>
          <Tabs activeTab={activeTab} onSwitch={setActiveTab} />
          {activeTab === "Pipeline" && (
            <Pipeline
              opportunities={opportunities}
              prospects={prospects}
              contacts={contacts}
              onSelectOpportunity={setSelectedOppId}
            />
          )}
          {activeTab === "Prospects" && (
            <ProspectsTable
              prospects={prospects}
              contacts={contacts}
              opportunities={opportunities}
            />
          )}
          {activeTab === "Contacts" && (
            <ContactsTable contacts={contacts} prospects={prospects} />
          )}
        </>
      )}

      {showAddProspect && (
        <AddProspectForm
          onSave={addProspect}
          onClose={() => setShowAddProspect(false)}
        />
      )}
      {showAddContact && (
        <AddContactForm
          prospects={prospects}
          onSave={addContact}
          onClose={() => setShowAddContact(false)}
        />
      )}
      {showAddOpportunity && (
        <AddOpportunityForm
          prospects={prospects}
          contacts={contacts}
          onSave={addOpportunity}
          onClose={() => setShowAddOpportunity(false)}
        />
      )}
    </div>
  );
}

export default App;
