// Central content source for mhdesign4u services.
// Used by /app/services/[slug]/page.js, the homepage services grid,
// and the calculator's tier logic.

export const services = [
  {
    slug: "website-design-development",
    name: "Website Design & Development",
    short: "Full-stack marketing & product sites",
    summary:
      "High-performance websites engineered for Core Web Vitals and built to convert — from marketing sites to complex product dashboards.",
    heroStat: { value: "60+", label: "sites shipped since 2018" },
    deliverables: [
      "Information architecture & sitemap",
      "Responsive design system in Figma",
      "Next.js / React front-end build",
      "CMS integration (headless or custom)",
      "Performance tuning to 90+ Lighthouse",
      "QA across devices & browsers",
    ],
    process: [
      { step: "Discover", detail: "Stakeholder workshops, competitor teardown, content audit." },
      { step: "Architect", detail: "Sitemap, wireframes, and interaction flows signed off before pixels." },
      { step: "Design", detail: "High-fidelity UI in our glass/kinetic visual language, tuned to your brand." },
      { step: "Build", detail: "Next.js front-end, CMS wiring, animation pass, cross-device QA." },
      { step: "Launch", detail: "Deployment, analytics, and a 30-day post-launch support window." },
    ],
    tiers: [
      { name: "Launch", price: 45000, unit: "one-time", desc: "Up to 6 pages, CMS-ready, responsive." },
      { name: "Scale", price: 120000, unit: "one-time", desc: "Up to 15 pages, custom components, integrations." },
      { name: "Platform", price: 280000, unit: "one-time", desc: "Product-grade build, dashboards, auth, API work." },
    ],
    color: "violet",
  },
  {
    slug: "uiux-architecture",
    name: "UI/UX Architecture",
    short: "Research-led product design systems",
    summary:
      "We architect the underlying system — flows, states, and components — so your product scales without redesigning from scratch every quarter.",
    heroStat: { value: "40+", label: "design systems shipped" },
    deliverables: [
      "User research & journey mapping",
      "Information architecture",
      "Wireframes & interactive prototypes",
      "Component-based design system",
      "Accessibility (WCAG 2.1 AA) pass",
      "Developer handoff documentation",
    ],
    process: [
      { step: "Research", detail: "User interviews, analytics review, and flow audits." },
      { step: "Structure", detail: "IA, task flows, and low-fidelity wireframes." },
      { step: "Systemize", detail: "Component library covering every state and breakpoint." },
      { step: "Prototype", detail: "Interactive Figma prototypes tested with real users." },
      { step: "Handoff", detail: "Dev-ready specs, tokens, and annotated flows." },
    ],
    tiers: [
      { name: "Audit", price: 35000, unit: "one-time", desc: "UX audit + recommendations on an existing product." },
      { name: "System", price: 95000, unit: "one-time", desc: "Full design system + core flows." },
      { name: "Product", price: 220000, unit: "one-time", desc: "End-to-end product design across multiple modules." },
    ],
    color: "cyan",
  },
  {
    slug: "graphic-design",
    name: "Graphic Design",
    short: "Visual assets that hold a system together",
    summary:
      "From pitch decks to campaign creative, our graphic design work stays inside your brand system while still feeling considered per-asset.",
    heroStat: { value: "1,200+", label: "assets produced" },
    deliverables: [
      "Marketing collateral & social templates",
      "Pitch deck & sales enablement design",
      "Print-ready packaging & signage",
      "Iconography & illustration sets",
      "Ad creative for paid campaigns",
    ],
    process: [
      { step: "Brief", detail: "Scope the asset list, formats, and channels." },
      { step: "Concept", detail: "Direction options grounded in your existing brand system." },
      { step: "Produce", detail: "Full asset production across required sizes/formats." },
      { step: "Package", detail: "Organized, labelled delivery ready for your team to use." },
    ],
    tiers: [
      { name: "Asset Pack", price: 18000, unit: "one-time", desc: "Up to 20 assets, one campaign." },
      { name: "Campaign", price: 55000, unit: "one-time", desc: "Multi-channel creative set + templates." },
      { name: "Retainer", price: 40000, unit: "per month", desc: "Ongoing design support, monthly asset volume." },
    ],
    color: "magenta",
  },
  {
    slug: "branding",
    name: "Branding",
    short: "Identity systems built to travel",
    summary:
      "We build brand systems — not just logos — designed to hold up across a website, a pitch deck, and a product UI without falling apart.",
    heroStat: { value: "25+", label: "identities launched" },
    deliverables: [
      "Brand strategy & positioning",
      "Logo, wordmark & symbol system",
      "Color, type & motion guidelines",
      "Brand guideline documentation",
      "Launch collateral kit",
    ],
    process: [
      { step: "Position", detail: "Clarify who you're for and what you stand against." },
      { step: "Explore", detail: "Divergent identity directions, reviewed in a working session." },
      { step: "Refine", detail: "One direction developed into a full system." },
      { step: "Document", detail: "Guidelines covering usage, tone, and edge cases." },
    ],
    tiers: [
      { name: "Refresh", price: 60000, unit: "one-time", desc: "Logo + core guideline refresh." },
      { name: "Full Identity", price: 150000, unit: "one-time", desc: "Strategy, full system, guidelines." },
      { name: "Enterprise", price: 320000, unit: "one-time", desc: "Multi-brand or sub-brand architecture." },
    ],
    color: "amber",
  },
  {
    slug: "video-motion-graphics",
    name: "Video & Motion Graphics",
    short: "Product films, explainers & motion systems",
    summary:
      "Motion that explains, not just decorates — product walkthroughs, launch films, and the motion tokens that carry into your UI.",
    heroStat: { value: "80+", label: "videos delivered" },
    deliverables: [
      "Script & storyboard",
      "2D/3D motion design",
      "Product explainer & demo videos",
      "Social-cut variants",
      "Motion design tokens for product UI",
    ],
    process: [
      { step: "Script", detail: "Narrative and messaging locked before any frame is made." },
      { step: "Storyboard", detail: "Shot-by-shot plan reviewed with stakeholders." },
      { step: "Animate", detail: "Full motion production with iterative review passes." },
      { step: "Deliver", detail: "Master file plus channel-specific cuts." },
    ],
    tiers: [
      { name: "Explainer", price: 70000, unit: "one-time", desc: "60–90s explainer video." },
      { name: "Launch Film", price: 160000, unit: "one-time", desc: "Hero launch film + social cuts." },
      { name: "Motion System", price: 240000, unit: "one-time", desc: "Ongoing motion design token system + films." },
    ],
    color: "violet",
  },
];

export const sectors = [
  {
    slug: "banking-fintech",
    name: "Banking / Fintech",
    blurb: "Trust-first interfaces for money that behave predictably under pressure.",
    color: "violet",
  },
  {
    slug: "healthcare-systems",
    name: "Healthcare Systems",
    blurb: "Clinical-grade clarity for platforms where a confusing screen has real cost.",
    color: "cyan",
  },
  {
    slug: "hr-platforms",
    name: "HR Platforms",
    blurb: "Workflow-dense products made humane for people managing people.",
    color: "magenta",
  },
  {
    slug: "ecommerce",
    name: "E-Commerce",
    blurb: "Conversion-tuned storefronts that still feel like a considered brand.",
    color: "amber",
  },
  {
    slug: "b2b",
    name: "B2B",
    blurb: "Long sales cycles need interfaces that build credibility on sight.",
    color: "violet",
  },
  {
    slug: "b2c",
    name: "B2C",
    blurb: "Consumer products designed for the first five seconds of attention.",
    color: "cyan",
  },
  {
    slug: "b2d",
    name: "B2D",
    blurb: "Developer-facing tools where docs and UI are treated as one product.",
    color: "magenta",
  },
];

export function getServiceBySlug(slug) {
  return services.find((s) => s.slug === slug);
}
