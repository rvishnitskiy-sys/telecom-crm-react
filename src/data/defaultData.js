export const STAGES = ["Lead", "Qualified", "Proposal", "Negotiation", "Won"];

export const SEGMENTS = [
  "Mobile Operator",
  "Fixed Line",
  "MVNO",
  "ISP",
  "Other",
];

export const DEFAULT_PROSPECTS = [
  {
    id: 1,
    name: "MTS",
    segment: "Mobile Operator",
    country: "Russia",
    website: "mts.ru",
  },
  {
    id: 2,
    name: "Beeline",
    segment: "Mobile Operator",
    country: "Russia",
    website: "beeline.ru",
  },
  {
    id: 3,
    name: "Megafon",
    segment: "Mobile Operator",
    country: "Russia",
    website: "megafon.ru",
  },
  {
    id: 4,
    name: "Tele2 Russia",
    segment: "Mobile Operator",
    country: "Russia",
    website: "tele2.ru",
  },
];

export const DEFAULT_CONTACTS = [
  {
    id: 1,
    name: "Andrei Volkov",
    prospectId: 1,
    role: "CTO",
    email: "a.volkov@mts.ru",
    phone: "+7 495 111 2233",
  },
  {
    id: 2,
    name: "Elena Petrova",
    prospectId: 2,
    role: "IT Director",
    email: "e.petrova@beeline.ru",
    phone: "+7 495 222 3344",
  },
  {
    id: 3,
    name: "Dmitri Smirnov",
    prospectId: 3,
    role: "Procurement Manager",
    email: "d.smirnov@megafon.ru",
    phone: "+7 495 333 4455",
  },
  {
    id: 4,
    name: "Irina Kozlova",
    prospectId: 4,
    role: "VP Technology",
    email: "i.kozlova@tele2.ru",
    phone: "+7 495 444 5566",
  },
  {
    id: 5,
    name: "Sergei Morozov",
    prospectId: 1,
    role: "Head of BSS",
    email: "s.morozov@mts.ru",
    phone: "+7 495 111 3344",
  },
];

export const DEFAULT_OPPORTUNITIES = [
  {
    id: 1,
    name: "BSS Modernization",
    prospectId: 1,
    keyContactId: 1,
    value: 250000,
    stage: "Qualified",
    notes: "",
  },
  {
    id: 2,
    name: "OSS Platform Upgrade",
    prospectId: 2,
    keyContactId: 2,
    value: 180000,
    stage: "Proposal",
    notes: "",
  },
  {
    id: 3,
    name: "CRM Implementation",
    prospectId: 3,
    keyContactId: 3,
    value: 95000,
    stage: "Lead",
    notes: "",
  },
  {
    id: 4,
    name: "Billing System",
    prospectId: 4,
    keyContactId: 4,
    value: 320000,
    stage: "Won",
    notes: "Contract signed Q1 2025.",
  },
  {
    id: 5,
    name: "Network Analytics",
    prospectId: 1,
    keyContactId: 5,
    value: 140000,
    stage: "Negotiation",
    notes: "Follow up on pricing proposal sent last week.",
  },
];
