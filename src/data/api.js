const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

function getToken() {
  return localStorage.getItem("crm_token");
}

async function request(path, options = {}) {
  const token = getToken();
  const response = await fetch(BASE_URL + path, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: "Bearer " + token } : {}),
    },
    ...options,
  });
  if (response.status === 401) {
    localStorage.removeItem("crm_token");
    localStorage.removeItem("crm_username");
    window.location.href = "/";
    return;
  }
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Request failed");
  }
  return response.json();
}

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
