import { useCRM } from "./hooks/useCRM";
import { Metrics } from "./components/Metrics";
import { Pipeline } from "./components/Pipeline";

function App() {
  const { prospects, contacts, opportunities, setOpportunityStage } = useCRM();

  function handleSelectOpportunity(id) {
    console.log("Selected opportunity:", id);
  }

  return (
    <div className="app">
      <div className="header">
        <h1>Telecom CRM</h1>
      </div>
      <Metrics opportunities={opportunities} />
      <Pipeline
        opportunities={opportunities}
        prospects={prospects}
        contacts={contacts}
        onSelectOpportunity={handleSelectOpportunity}
      />
    </div>
  );
}

export default App;
