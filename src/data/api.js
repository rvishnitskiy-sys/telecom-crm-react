const BASE_URL = "http://localhost:3001/api";

async function request(path, options = {}) {
  const response = await fetch(BASE_URL + path, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Request failed");
  }
  return response.json();
}

export const api = {
  prospects: {
    getAll: () => request("/prospects"),
    create: (data) =>
      request("/prospects", { method: "POST", body: JSON.stringify(data) }),
    update: (id, data) =>
      request("/prospects/" + id, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    delete: (id) => request("/prospects/" + id, { method: "DELETE" }),
  },
  contacts: {
    getAll: () => request("/contacts").then((cs) => cs.map(normalizeContact)),
    create: (data) =>
      request("/contacts", { method: "POST", body: JSON.stringify(data) }).then(
        normalizeContact,
      ),
    update: (id, data) =>
      request("/contacts/" + id, {
        method: "PUT",
        body: JSON.stringify(data),
      }).then(normalizeContact),
    delete: (id) => request("/contacts/" + id, { method: "DELETE" }),
  },
  opportunities: {
    getAll: () =>
      request("/opportunities").then((os) => os.map(normalizeOpportunity)),
    create: (data) =>
      request("/opportunities", {
        method: "POST",
        body: JSON.stringify(data),
      }).then(normalizeOpportunity),
    update: (id, data) =>
      request("/opportunities/" + id, {
        method: "PUT",
        body: JSON.stringify(data),
      }).then(normalizeOpportunity),
    delete: (id) => request("/opportunities/" + id, { method: "DELETE" }),
  },
};

function normalizeOpportunity(o) {
  return {
    ...o,
    prospectId: o.prospect_id,
    keyContactId: o.key_contact_id,
  };
}

function normalizeContact(c) {
  return {
    ...c,
    prospectId: c.prospect_id,
  };
}
