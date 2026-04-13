import { useState, useEffect } from "react";
import { api } from "../data/api";

export function useCRM() {
  const [prospects, setProspects] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [prospects, contacts, opportunities] = await Promise.all([
          api.prospects.getAll(),
          api.contacts.getAll(),
          api.opportunities.getAll(),
        ]);
        setProspects(prospects);
        setContacts(contacts);
        setOpportunities(opportunities);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  async function addProspect(data) {
    const prospect = await api.prospects.create(data);
    setProspects((prev) => [...prev, prospect]);
  }

  async function addContact(data) {
    const contact = await api.contacts.create({
      ...data,
      prospect_id: data.prospectId,
    });
    setContacts((prev) => [...prev, contact]);
  }

  async function addOpportunity(data) {
    const opportunity = await api.opportunities.create({
      ...data,
      prospect_id: data.prospectId,
      key_contact_id: data.keyContactId,
    });
    setOpportunities((prev) => [...prev, opportunity]);
  }

  async function setOpportunityStage(id, stage) {
    const opp = opportunities.find((o) => o.id === id);
    if (!opp) return;
    const updated = await api.opportunities.update(id, { ...opp, stage });
    setOpportunities((prev) => prev.map((o) => (o.id === id ? updated : o)));
  }

  async function saveNotes(id, notes) {
    const opp = opportunities.find((o) => o.id === id);
    if (!opp) return;
    const updated = await api.opportunities.update(id, { ...opp, notes });
    setOpportunities((prev) => prev.map((o) => (o.id === id ? updated : o)));
  }

  return {
    prospects,
    contacts,
    opportunities,
    loading,
    error,
    addProspect,
    addContact,
    addOpportunity,
    setOpportunityStage,
    saveNotes,
  };
}
