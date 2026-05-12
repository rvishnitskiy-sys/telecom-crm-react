# Telecom CRM — React Frontend Baseline

## Visual Style
The CRM uses a clean minimal style — white backgrounds, a blue primary colour for actions, simple table layouts for list views, and a detail panel on the right for record views.

## Tech stack

- React 19, Vite 8, no router library (single-page, tab-based navigation)
- Playwright for e2e tests
- API base URL from `VITE_API_URL` env var (production: `https://telecom-crm-server-production.up.railway.app/api`)

---

## Routing / screen structure

There is no React Router. Navigation is entirely state-driven inside `App.jsx`.

| Condition | What is shown |
|---|---|
| `token` absent (not logged in) | `LoginPage` full-screen |
| `loading === true` | Plain "Loading..." text |
| `error !== null` | Red error message text |
| `selectedOppId` is set | `OpportunityDetail` view |
| `selectedOppId` is null, `activeTab === "Pipeline"` | `Pipeline` kanban board |
| `selectedOppId` is null, `activeTab === "Prospects"` | `ProspectsTable` |
| `selectedOppId` is null, `activeTab === "Contacts"` | `ContactsTable` |

Modal overlays (`AddProspectForm`, `AddContactForm`, `AddOpportunityForm`) render on top of whatever view is active.

---

## Components

### `LoginPage` (`src/components/LoginPage.jsx`)
Full-screen centered login card. Calls `POST /auth/login` directly (does not go through `src/data/api.js`). On success stores token + username in `localStorage` via `AuthContext.login()`. Shows inline error on failure. Enter key triggers submit.

**Fields:** Username (text), Password (password)
**Validation:** Both fields must be non-empty (client-side guard only)

---

### `Metrics` (`src/components/Metrics.jsx`)
Read-only summary bar at the top of the authenticated view. Displays four metric cards:
- **Total pipeline** — sum of all opportunity values + count
- **Won** — sum of values for stage `"Won"` + count closed
- **Active** — count of opportunities not in `"Won"`
- **Prospects** — count of all opportunities (note: label says "Prospects" but shows opportunity count)

No interactivity.

---

### `Tabs` (`src/components/Tabs.jsx`)
Three-tab switcher: **Pipeline**, **Prospects**, **Contacts**. Active tab highlighted. Calls `onSwitch` with the tab name string.

---

### `Pipeline` (`src/components/Pipeline.jsx`)
Kanban board with one column per stage (`Lead → Qualified → Proposal → Negotiation → Won`). Each opportunity renders as a clickable `OpportunityCard` showing name, prospect name, contact name + role, and value. Clicking a card calls `onSelectOpportunity(id)` which navigates to `OpportunityDetail`.

---

### `OpportunityDetail` (`src/components/OpportunityDetail.jsx`)
Full detail view for one opportunity. Contains:
- **Back** button → clears `selectedOppId`
- Opportunity name, prospect name + segment
- Value display
- **Stage progress bar** — clicking any step calls `onStageChange(id, stage)` → `PUT /opportunities/:id`
- **Notes textarea** + "Save notes" button → `PUT /opportunities/:id`
- **ActivityLog** sub-component (see below)
- Sidebar: key contact card (name, role, email, phone) + prospect card (name, segment, country, website)

**Validation:** none on notes (saves empty string)

---

### `ActivityLog` (`src/components/ActivityLog.jsx`)
Embedded inside `OpportunityDetail`. On mount fetches `GET /activities?opportunity_id=:id`. Displays activities sorted newest-first with type badge and formatted timestamp.

Add-activity form:
- Type selector: `call | email | meeting | note`
- Description textarea (Ctrl/Cmd+Enter to submit)
- "Log activity" button → `POST /activities`

**Validation:** description must be non-empty (trimmed)

---

### `ProspectsTable` (`src/components/ProspectsTable.jsx`)
Read-only table. Columns: Prospect (name + segment), Country, Website (external link), Contacts count, Opportunities count, Best stage (badge showing furthest stage reached), Total value. "Best stage" uses `STAGES` array order to pick the highest stage across all opportunities for that prospect. No edit/delete actions.

---

### `ContactsTable` (`src/components/ContactsTable.jsx`)
Read-only table. Columns: Contact (name + role), Prospect name, Email (mailto link), Phone. No edit/delete actions.

---

### `AddProspectForm` (`src/components/AddProspectForm.jsx`)
Modal form. Calls `onSave(data)` → `POST /prospects`.

| Field | Type | Required | Validation |
|---|---|---|---|
| Company name | text | yes | non-empty trim |
| Segment | select (`SEGMENTS` list) | no | — |
| Country | text | no | — |
| Website | text | no | — |

---

### `AddContactForm` (`src/components/AddContactForm.jsx`)
Modal form. Calls `onSave(data)` → `POST /contacts`.

| Field | Type | Required | Validation |
|---|---|---|---|
| Full name | text | yes | non-empty trim |
| Role / Title | text | no | — |
| Prospect | select (from loaded prospects) | yes | must select |
| Email | text | no | — |
| Phone | text | no | — |

---

### `AddOpportunityForm` (`src/components/AddOpportunityForm.jsx`)
Modal form. Key contact dropdown is filtered to contacts belonging to the selected prospect; resets when prospect changes. Calls `onSave(data)` → `POST /opportunities`.

| Field | Type | Required | Validation |
|---|---|---|---|
| Opportunity name | text | yes | non-empty trim |
| Prospect | select | yes | must select |
| Key contact | select (filtered) | no | — |
| Value (€) | number | no | defaults to 0 |
| Stage | select (`STAGES` list) | yes | must select |

---

### `Modal` (`src/components/Modal.jsx`)
Generic wrapper: overlay + centered dialog box. Clicking the overlay calls `onClose`. Accepts `title` and `children`.

---

## Auth context (`src/auth/AuthContext.jsx`)

`AuthProvider` wraps the whole app. Persists `crm_token` and `crm_username` in `localStorage`. Exposes `{ token, username, login, logout }` via `useAuth()` hook.

Session check: `App.jsx` renders `LoginPage` if `token` is falsy. The `api.js` request helper auto-redirects to `/` on `401` and clears `localStorage`.

---

## Custom hook: `useCRM` (`src/hooks/useCRM.js`)

Loads all data in parallel on mount. Exposes:

| Export | Description |
|---|---|
| `prospects`, `contacts`, `opportunities` | arrays of loaded records |
| `loading`, `error` | async state |
| `addProspect(data)` | POST + optimistic append |
| `addContact(data)` | POST + optimistic append (maps `prospectId` → `prospect_id`) |
| `addOpportunity(data)` | POST + optimistic append (maps camelCase → snake_case) |
| `setOpportunityStage(id, stage)` | PUT with full payload, updates list |
| `saveNotes(id, notes)` | PUT with full payload, updates list |

---

## API calls (`src/data/api.js`)

Base URL: `VITE_API_URL` env var, default `http://localhost:3001/api`.
All requests attach `Authorization: Bearer <token>` from `localStorage`.
`401` response triggers redirect to `/` and clears stored credentials.

### Normalization helpers
- `normalizeOpportunity`: maps `prospect_id` → `prospectId`, `key_contact_id` → `keyContactId`
- `normalizeContact`: maps `prospect_id` → `prospectId`
- `normalizeActivity`: maps `opportunity_id` → `opportunityId`, `created_at` → `createdAt`

### All API calls

| Call site | Method | Endpoint | Notes |
|---|---|---|---|
| `LoginPage` | POST | `/auth/login` | Body: `{username, password}`. Returns `{token, username}` |
| `api.prospects.getAll` | GET | `/prospects` | Called on mount via `useCRM` |
| `api.prospects.create` | POST | `/prospects` | Called from `addProspect` |
| `api.prospects.update` | PUT | `/prospects/:id` | Available but not called from UI currently |
| `api.prospects.delete` | DELETE | `/prospects/:id` | Available but not called from UI currently |
| `api.contacts.getAll` | GET | `/contacts` | Called on mount via `useCRM` |
| `api.contacts.create` | POST | `/contacts` | Called from `addContact` |
| `api.contacts.update` | PUT | `/contacts/:id` | Available but not called from UI currently |
| `api.contacts.delete` | DELETE | `/contacts/:id` | Available but not called from UI currently |
| `api.opportunities.getAll` | GET | `/opportunities` | Called on mount via `useCRM` |
| `api.opportunities.create` | POST | `/opportunities` | Called from `addOpportunity` |
| `api.opportunities.update` | PUT | `/opportunities/:id` | Called from `setOpportunityStage` and `saveNotes` |
| `api.opportunities.delete` | DELETE | `/opportunities/:id` | Available but not called from UI currently |
| `api.activities.getByOpportunity` | GET | `/activities?opportunity_id=:id` | Called by `ActivityLog` on mount |
| `api.activities.create` | POST | `/activities` | Called from `ActivityLog` add form |

---

## Shared data constants (`src/data/defaultData.js`)

| Export | Value |
|---|---|
| `STAGES` | `["Lead", "Qualified", "Proposal", "Negotiation", "Won"]` |
| `SEGMENTS` | `["Mobile Operator", "Fixed Line", "MVNO", "ISP", "Other"]` |
| `DEFAULT_PROSPECTS` | 4 Russian mobile operators (MTS, Beeline, Megafon, Tele2 Russia) |
| `DEFAULT_CONTACTS` | 5 contacts tied to the default prospects |
| `DEFAULT_OPPORTUNITIES` | 5 sample opportunities across all stages |

---

## localStorage utility (`src/data/storage.js`)

`loadData()` / `saveData()` — read/write all CRM data under keys `crm_prospects`, `crm_contacts`, `crm_opportunities`, `crm_nextIds`. Bootstraps from `DEFAULT_*` constants on first load. **These functions are not currently used by the app** — `useCRM` goes directly to the API; `storage.js` is a leftover from a pre-API localStorage-only version.

---

## Missing / not yet implemented

- No `data-testid` attributes on any element (required by CLAUDE.md)
- No e2e tests exist yet (`./e2e` directory is empty)
- No edit or delete UI for prospects, contacts, or opportunities (API methods exist)
- No pagination, search, or filtering on any table
- Stage change in `OpportunityDetail` does not show a loading/saving state
- No confirmation dialog before any destructive action
