import {
  DEFAULT_PROSPECTS,
  DEFAULT_CONTACTS,
  DEFAULT_OPPORTUNITIES,
} from "./defaultData";

const KEYS = {
  prospects: "crm_prospects",
  contacts: "crm_contacts",
  opportunities: "crm_opportunities",
  nextIds: "crm_nextIds",
};

export function loadData() {
  const saved = localStorage.getItem(KEYS.prospects);

  if (saved) {
    return {
      prospects: JSON.parse(localStorage.getItem(KEYS.prospects)),
      contacts: JSON.parse(localStorage.getItem(KEYS.contacts)),
      opportunities: JSON.parse(localStorage.getItem(KEYS.opportunities)),
      nextIds: JSON.parse(localStorage.getItem(KEYS.nextIds)),
    };
  }

  // First ever load — use defaults
  const defaultIds = { nextProspectId: 5, nextContactId: 6, nextOppId: 6 };
  saveData(
    DEFAULT_PROSPECTS,
    DEFAULT_CONTACTS,
    DEFAULT_OPPORTUNITIES,
    defaultIds,
  );

  return {
    prospects: DEFAULT_PROSPECTS,
    contacts: DEFAULT_CONTACTS,
    opportunities: DEFAULT_OPPORTUNITIES,
    nextIds: defaultIds,
  };
}

export function saveData(prospects, contacts, opportunities, nextIds) {
  localStorage.setItem(KEYS.prospects, JSON.stringify(prospects));
  localStorage.setItem(KEYS.contacts, JSON.stringify(contacts));
  localStorage.setItem(KEYS.opportunities, JSON.stringify(opportunities));
  localStorage.setItem(KEYS.nextIds, JSON.stringify(nextIds));
}
