import { useState } from "react";
import { loadData, saveData } from "../data/storage";

export function useCRM() {
  const initial = loadData();

  const [prospects, setProspects] = useState(initial.prospects);
  const [contacts, setContacts] = useState(initial.contacts);
  const [opportunities, setOpportunities] = useState(initial.opportunities);
  const [nextIds, setNextIds] = useState(initial.nextIds);

  function save(newProspects, newContacts, newOpportunities, newNextIds) {
    saveData(newProspects, newContacts, newOpportunities, newNextIds);
  }

  function addProspect({ name, segment, country, website }) {
    const newProspect = {
      id: nextIds.nextProspectId,
      name,
      segment,
      country,
      website,
    };
    const newProspects = [...prospects, newProspect];
    const newNextIds = {
      ...nextIds,
      nextProspectId: nextIds.nextProspectId + 1,
    };
    setProspects(newProspects);
    setNextIds(newNextIds);
    save(newProspects, contacts, opportunities, newNextIds);
  }

  function addContact({ name, role, prospectId, email, phone }) {
    const newContact = {
      id: nextIds.nextContactId,
      name,
      role,
      prospectId,
      email,
      phone,
    };
    const newContacts = [...contacts, newContact];
    const newNextIds = { ...nextIds, nextContactId: nextIds.nextContactId + 1 };
    setContacts(newContacts);
    setNextIds(newNextIds);
    save(prospects, newContacts, opportunities, newNextIds);
  }

  function addOpportunity({ name, prospectId, keyContactId, value, stage }) {
    const newOpp = {
      id: nextIds.nextOppId,
      name,
      prospectId,
      keyContactId,
      value,
      stage,
      notes: "",
    };
    const newOpportunities = [...opportunities, newOpp];
    const newNextIds = { ...nextIds, nextOppId: nextIds.nextOppId + 1 };
    setOpportunities(newOpportunities);
    setNextIds(newNextIds);
    save(prospects, contacts, newOpportunities, newNextIds);
  }

  function setOpportunityStage(id, stage) {
    const newOpportunities = opportunities.map((o) =>
      o.id === id ? { ...o, stage } : o,
    );
    setOpportunities(newOpportunities);
    save(prospects, contacts, newOpportunities, nextIds);
  }

  function saveNotes(id, notes) {
    const newOpportunities = opportunities.map((o) =>
      o.id === id ? { ...o, notes } : o,
    );
    setOpportunities(newOpportunities);
    save(prospects, contacts, newOpportunities, nextIds);
  }

  function resetData() {
    localStorage.clear();
    window.location.reload();
  }

  return {
    prospects,
    contacts,
    opportunities,
    addProspect,
    addContact,
    addOpportunity,
    setOpportunityStage,
    saveNotes,
    resetData,
  };
}
