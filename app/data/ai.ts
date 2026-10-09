export type AiHighlightType = {
  _id: string;
  kind: "Speaking" | "Teaching" | "Award" | "Built";
  icon: "microphone" | "chalkboard" | "trophy" | "bot" | "brain" | "data";
  title: string;
  context: string;
  description: string;
  tags: string[];
};

export const aiHighlightsData: AiHighlightType[] = [
  {
    _id: "ai-speaking",
    kind: "Speaking",
    icon: "microphone",
    title: "Speaker on AI-Native Engineering",
    context: "Zalando internal engineering events · 2026",
    description:
      "Talk on working with AI agents across the software lifecycle: planning, durable project memory, MCP-connected tools, specialist agents, isolated worktrees, verification, and keeping key decisions with humans.",
    tags: ["Agentic workflows", "MCP", "Verification"],
  },
  {
    _id: "gen-ai-labs-trainer",
    kind: "Teaching",
    icon: "chalkboard",
    title: "Agentic AI Labs Trainer",
    context: "Zalando Tech Academy · 2026",
    description:
      "Selected as a trainer for Zalando's Agentic AI Labs, teaching engineers how to build with AI agents and the Model Context Protocol (MCP).",
    tags: ["AI agents", "MCP", "Enablement"],
  },
  {
    _id: "agentic-workshop",
    kind: "Teaching",
    icon: "chalkboard",
    title: "Hands-on Agentic Engineering Workshop",
    context: "Workshop designer · ~20 engineers across 3 teams",
    description:
      "Designing a practical workshop covering repository grounding, reusable agent skills, MCP, typed agent outputs, guardrails, and orchestrated multi-agent delivery.",
    tags: ["Context engineering", "Agent skills", "Guardrails"],
  },
  {
    _id: "shipping-notice-copilot",
    kind: "Award",
    icon: "trophy",
    title: "Shipping Notice Copilot",
    context: "Best AI Usage · Procure-to-Pay HackWeek 2026",
    description:
      "Built an AI prototype that pre-fills supplier delivery notices from shipment and purchase-order history. The team won the HackWeek award for Best AI Usage.",
    tags: ["LLMs", "Prototyping", "Supply chain"],
  },
  {
    _id: "noaat-chatbot",
    kind: "Built",
    icon: "bot",
    title: "Arabic AI Sales & Support Agent",
    context: "Noaat",
    description:
      "Built a Facebook Messenger agent that answers customers in Arabic, opens Jira tickets for issues, and routes sales leads to the CRM and Slack.",
    tags: ["n8n", "GPT-4o-mini", "Pinecone"],
  },
  {
    _id: "rag-compliance-assistant",
    kind: "Built",
    icon: "brain",
    title: "RAG Compliance Assistant",
    context: "Cynopsis Solutions",
    description:
      "Built a retrieval-augmented assistant for AML/KYC analysts that cut investigation time by 60% and made regulations searchable in natural language.",
    tags: ["RAG", "LangChain", "Vector databases"],
  },
  {
    _id: "receipt-verification",
    kind: "Built",
    icon: "bot",
    title: "Automatic Receipt Verification",
    context: "Noaat",
    description:
      "Automated approval of customer receipt claims for the cashback program by combining document OCR with an LLM check, routing only unclear cases to a human.",
    tags: ["AWS Textract", "OpenAI", "Human-in-the-loop"],
  },
  {
    _id: "cicd-embeddings",
    kind: "Built",
    icon: "data",
    title: "Mining CI/CD Patterns with Embeddings",
    context: "Zalando HackWeek 2023",
    description:
      "Used sentence embeddings, UMAP, and clustering to discover common patterns in CI/CD scripts across Zalando's repositories, and presented the findings.",
    tags: ["Embeddings", "Clustering", "NLP"],
  },
];

export const agenticPracticesData: string[] = [
  "Context engineering (AGENTS.md / CLAUDE.md)",
  "Reusable agent skills",
  "MCP-connected tooling",
  "Specialist agents: researcher, implementer, verifier",
  "Multi-agent orchestration in isolated worktrees",
  "Verification through tests and architecture checks",
  "Typed, schema-validated agent outputs",
  "Human-owned decisions",
  "AI code review in CI",
];
