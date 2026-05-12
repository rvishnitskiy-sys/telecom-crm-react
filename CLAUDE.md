\# Telecom CRM — React Frontend



\## Project overview

B2B telecom CRM frontend. React app consuming the Express REST API.

Manages Prospects, Contacts, and Opportunities.



\## File structure

\- Components in /src/components — one directory per feature

\- API calls in /src/api directory

\- Entry point: src/index.js or src/App.js



\## Coding standards

\- Use data-testid attributes on ALL interactive elements

\- data-testid naming: kebab-case descriptive names

&#x20; (e.g. note-input, add-note-button, notes-list)

\- Never hardcode API URLs — always use REACT\_APP\_API\_URL

&#x20; environment variable

\- Use async/await for all API calls

\- Show loading state while API calls are in progress

\- Handle API errors explicitly — never silently swallow them



\## Test requirements

\- Playwright e2e tests in /e2e directory

\- All tests annotated with @REQ-XXX matching the requirement

\- Use data-testid selectors only — never CSS classes or element types

\- Each test file named after the feature it covers

