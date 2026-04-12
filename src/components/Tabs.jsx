export function Tabs({ activeTab, onSwitch }) {
  const tabs = ["Pipeline", "Prospects", "Contacts"];

  return (
    <div className="tabs">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`tab ${activeTab === tab ? "active" : ""}`}
          onClick={() => onSwitch(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
