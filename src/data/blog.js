export const blogPostsData = [
  {
    id: "first-ai-application",
    title: "How I Built My First AI-Powered Application",
    slug: "how-i-built-my-first-ai-powered-application",
    category: "AI & Machine Learning",
    date: "Feb 2026",
    readTime: "5 min read",
    excerpt: "A deep dive into moving beyond generic OpenAI wrappers to build TrialGuard AI — a domain-specific clinical trial monitoring system with real-time anomaly detection.",
    content: `
### Moving Beyond Generic Wrappers

When developers first approach Artificial Intelligence, the temptation is to simply slap a prompt onto a generic chat interface and call it a day. But building software that industry professionals actually trust requires domain specificity, rigorous deterministic guardrails, and deterministic fallbacks.

When I started engineering **TrialGuard AI**, my objective was specific: clinical trial managers don't need a conversational bot; they need an instant, low-latency anomaly scanner that ingests thousands of operational protocol logs and flags non-compliance before an audit failure happens.

\`\`\`python
# Fast, asynchronous protocol deviation scoring
@app.post("/api/v1/analyze-protocol")
async def analyze_protocol(payload: TrialLogPayload):
    deviation_vector = await ml_engine.compute_deviation(payload.logs)
    audit_flag = compliance_evaluator.evaluate(deviation_vector)
    return {
        "trial_id": payload.trial_id,
        "risk_index": deviation_vector.score,
        "action_required": audit_flag.is_critical
    }
\`\`\`

### 3 Key Architectural Lessons

1. **Multimodal Grounding:** Standard LLMs hallucinate medical codes. By combining rule-based ICH-GCP ontology trees with vector embeddings, we achieved 98.4% precision.
2. **Asynchronous Processing:** Heavy model inference must never block user interactions. We moved heavy PDF parsing and batch log analysis to asynchronous background workers.
3. **Actionable UI Over Raw Output:** Instead of outputting raw JSON blobs, we designed interactive risk matrices and heatmaps that highlight urgency at a glance.

Building AI applications isn't just about the model—it's about the interface and the confidence you give to the person making decisions with it.
    `
  },
  {
    id: "full-stack-lessons",
    title: "Lessons From Building Full-Stack Projects Under Pressure",
    slug: "lessons-from-building-full-stack-projects",
    category: "Engineering Architecture",
    date: "Jan 2026",
    readTime: "4 min read",
    excerpt: "Architectural choices, state management pitfalls, and why database indexing is the most overlooked superpower when building systems for scale.",
    content: `
### What Separates a Toy Project From a Production System?

Anyone can follow a tutorial to create a CRUD app in an afternoon. But real-world systems fail when concurrent users arrive, when queries take 12 seconds instead of 40ms, and when database state drifts out of sync.

While architecting the **Hospital ERP System**, here were the fundamental shifts I made in my engineering mindset:

### 1. Queues Are Non-Negotiable
When generating medical diagnostic reports and calculating pharmacy ledgers, doing it synchronously inside an HTTP request lifecycle will cause timeouts under load. Introducing Redis with BullMQ queues kept HTTP response times consistently under 45ms.

### 2. Schema Rigor Saves Weeks of Debugging
Using Prisma ORM with strict PostgreSQL relations forced data integrity upfront. When dealing with hospital bed assignments and student tuition ledgers, data consistency is paramount.

### 3. Build For the User on a 3G Connection
Performance isn't an afterthought. Splitting bundles with Vite and optimizing asset delivery through Cloudinary transformed sluggish load times into sub-second page loads.
    `
  },
  {
    id: "hackathon-learnings",
    title: "What I Learned Leading a Team at Smart India Hackathon",
    slug: "what-i-learned-from-hackathons",
    category: "Leadership & Strategy",
    date: "Dec 2025",
    readTime: "6 min read",
    excerpt: "How scoping MVP boundaries, delegating across strengths, and pitching with clarity turned 36 continuous hours of intense coding into a winning solution.",
    content: `
### The Reality of 36-Hour Sprints

At **Smart India Hackathon (SIH 2026)**, the pressure is palpable from hour zero. Six developers, a national jury, complex problem statements, and a ticking clock.

As Team Leader, my biggest revelation was that hackathons are rarely won by the team that writes the most lines of code. They are won by the team that best understands the **problem statement**, scopes an airtight MVP, and delivers a flawless live demonstration.

### The Team Leader Playbook

- **Hour 0 to 2 (Architect Before You Code):** Agree on API contracts, database schemas, and Figma component layouts before anyone touches a terminal. This prevented 80% of merge conflicts.
- **Hour 12 (The Scope Slash):** When features start falling behind schedule, ruthlessly cut secondary nice-to-haves and double down on the core "wow" feature that directly solves the jury's scoring metric.
- **Hour 30 (Pitch Polish):** A brilliant codebase with a confusing pitch will lose to a clean prototype with an unforgettable story. We spent 4 hours rehearsing our live demo and handling edge-case questions.

Leadership under pressure isn't about doing everything yourself; it's about providing the technical clarity and psychological safety that empowers everyone to execute at their highest level.
    `
  },
  {
    id: "student-to-builder",
    title: "From Student to Product Builder: The Entrepreneur's Mindset",
    slug: "from-student-to-product-builder",
    category: "Product & Entrepreneurship",
    date: "Nov 2025",
    readTime: "5 min read",
    excerpt: "Why understanding user psychology, distribution channels, and commercial value elevates an engineer from a syntax writer to an impactful builder.",
    content: `
### "I don't just want to write code. I want to build products people remember."

This philosophy guides everything I create. As a Computer Science Engineering student, it is easy to get caught up in the bubble of clean syntax, design patterns, and algorithmic puzzles.

While those technical foundations are critical, software only creates real value when it solves genuine friction for human beings.

### The Shift from 'Coding' to 'Product Building'

1. **Start With the Problem, Not the Tech Stack:** Don't build something just because a new JavaScript framework came out. Find someone spending 4 hours a day on a tedious manual task, and build software that reduces it to 4 seconds.
2. **Obsess Over First-Impression Aesthetics:** In consumer and enterprise software alike, perceived quality drives adoption. Clean typography, thoughtful whitespace, and micro-interactions communicate reliability.
3. **Distribution Matters as Much as Engineering:** If nobody knows your product exists, your code is useless. Building with the user's workflow in mind creates natural word-of-mouth adoption.

My mission as an aspiring software entrepreneur is to create digital tools that bridge computational intelligence with unforgettable human experiences.
    `
  }
];
