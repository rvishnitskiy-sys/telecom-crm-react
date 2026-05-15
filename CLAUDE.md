# Telecom CRM — React Frontend

## Sprint 1 implementation guide

Read SPRINT1_GUIDE.md before implementing any Sprint 1 story.
It contains all cross-story architectural decisions, migration scripts,
data-testid conventions, and the correct implementation order.

## Baseline documentation

Read baseline-react.md before making any changes. It describes all
existing components, routing, API calls, and UI patterns.

## Project overview

B2B telecom CRM frontend. React app consuming the Express REST API.
Manages Prospects, Contacts, and Opportunities.

## File structure

- Components in /src/components — one directory per feature
- API calls in /src/data/api.js
- Entry point: src/main.jsx and src/App.jsx

## Coding standards

- Use data-testid attributes on ALL interactive elements
- data-testid naming: kebab-case with feature-scoped prefix
  (e.g. prospect-notes-input, prospect-notes-add, contact-edit-button)
- Full data-testid reference in SPRINT1_GUIDE.md
- Never hardcode API URLs — always use VITE_API_URL environment variable
- Use async/await for all API calls
- Show loading state while API calls are in progress
- Handle API errors explicitly — never silently swallow them

## Test requirements

- Playwright e2e tests in /e2e directory
- All tests annotated with @REQ-XXX matching the requirement
- Use data-testid selectors only — never CSS classes or element types
- Each test file named after the feature it covers
