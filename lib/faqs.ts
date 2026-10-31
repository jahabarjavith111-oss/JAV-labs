export type Faq = {
  question: string;
  answer: string;
};

/** Frequently asked questions — homepage and contact page. */
export const faqs: Faq[] = [
  {
    question: "Are you a freelancer or an agency?",
    answer:
      "I'm an independent software engineer — the studio is me, Abdul Javid J. You work directly with the person designing and writing the code: no account managers, no handoffs, no outsourced work. For larger scopes I bring in trusted specialists only when the project genuinely needs it, and you always know exactly who is doing what.",
  },
  {
    question: "What types of projects do you accept?",
    answer:
      "Business websites, landing pages, full-stack web applications, SaaS MVPs, AI-powered features, API integrations, and improvements to existing applications. If a project falls outside what I can genuinely deliver well, I will tell you directly instead of taking it on.",
  },
  {
    question: "What technologies do you build with?",
    answer:
      "Modern, proven web technologies — React and TypeScript on the front end; Next.js, Node.js, FastAPI, or Spring Boot on the back end depending on the project; PostgreSQL or MySQL for data; and AI model APIs such as OpenAI and Gemini for AI features. The stack is chosen during scoping around what your product will need to run reliably and extend later — not around whatever is trendy.",
  },
  {
    question: "Do you work with international clients?",
    answer:
      "Yes. I work with clients remotely across the United States, United Kingdom, Canada, Australia, the UAE, and elsewhere. Communication happens over email and messaging, and project milestones are agreed in writing before work begins.",
  },
  {
    question: "Can you build a website from an idea?",
    answer:
      "Yes — most projects start as an idea rather than a specification. We begin by clarifying the problem, the audience, and the essential features, then I propose a scope you can approve before anything is built.",
  },
  {
    question: "How is project pricing determined?",
    answer:
      "Every project is quoted individually — the price depends on the number of pages or features, integrations, design complexity, timeline, and support requirements. You receive a clear, itemized quote based on your actual requirements before any work begins, and no work starts until you approve it.",
  },
  {
    question: "How long does a project take?",
    answer:
      "It depends entirely on scope. A focused landing page can be delivered quickly, while a full-stack application takes longer. Timelines are estimated during scoping and agreed as part of the proposal — and they depend on timely feedback and content from your side as well.",
  },
  {
    question: "Can you build a CRM or internal business tool?",
    answer:
      "Yes — CRM systems, dashboards, admin panels, and internal tools are a core part of the full-stack application work: contact and company records, sales pipelines, activity and task tracking, role-based access for teams, and reports — shaped around the process your team already uses rather than a generic template. Describe how you manage customers today at /contact and the first version will be scoped around it.",
  },
  {
    question: "Can you integrate AI into an existing product?",
    answer:
      "Yes, where there is a concrete use case — such as summarizing documents, extracting structured data, assisting searches, or recommending actions. I first define what success looks like and how outputs are reviewed, then integrate the feature into your existing product.",
  },
  {
    question: "Can you maintain or improve an existing application?",
    answer:
      "Yes. I can audit an existing application, fix bugs, improve user flows, add features, and keep dependencies updated. Maintenance is offered as an explicitly agreed arrangement rather than an assumed extra.",
  },
  {
    question: "How do payments and milestones work?",
    answer:
      "The payment schedule and milestones are agreed in the proposal before work starts. Nothing begins without a shared understanding of deliverables, timeline, and payment terms — and those terms are documented in our agreement.",
  },
  {
    question: "Do you provide deployment and handover?",
    answer:
      "Yes — deployment is included where it is part of the agreed scope. You receive the deliverable along with the handover information you need: access, setup notes, and guidance for future changes.",
  },
  {
    question: "How do I hire you for a project?",
    answer:
      "Send a message through /contact describing what you're trying to build. You receive an honest assessment of fit, clarifying questions where needed, and an itemized quote before anything begins. Every project starts with an approved proposal — never before.",
  },
  {
    question: "What information should I include when contacting you?",
    answer:
      "Tell me what you are trying to build, the problem it solves, who will use it, any features you consider essential, your budget range, and your desired timeline. Links to examples you like help enormously. If details are still fuzzy, that is fine — we can clarify them together.",
  },
];
