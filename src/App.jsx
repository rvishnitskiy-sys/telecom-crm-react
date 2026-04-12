import { useState } from "react";
import { useCRM } from "./hooks/useCRM";
import { Metrics } from "./components/Metrics";
import { Pipeline } from "./components/Pipeline";
import { Tabs } from "./components/Tabs";
import { OpportunityDetail } from "./components/OpportunityDetail";

function App() {
  const { prospects, contacts, opportunities, setOpportunityStage, saveNotes } =
    useCRM();

  const [activeTab, setActiveTab] = useState("Pipeline");
  const [selectedOppId, setSelectedOppId] = useState(null);

  const selectedOpp = opportunities.find((o) => o.id === selectedOppId);
  const selectedProspect = selectedOpp
    ? prospects.find((p) => p.id === selectedOpp.prospectId)
    : null;
  const selectedContact = selectedOpp
    ? contacts.find((c) => c.id === selectedOpp.keyContactId)
    : null;

  return (
    <div className="app">
      <div className="header">
        <h1>Telecom CRM</h1>
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
            <div className="empty" style={{ padding: "3rem" }}>
              Prospects view coming soon
            </div>
          )}
          {activeTab === "Contacts" && (
            <div className="empty" style={{ padding: "3rem" }}>
              Contacts view coming soon
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
