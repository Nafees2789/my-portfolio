export const profile = {
  name: "Shaik Nafees Ahammed",
  shortName: "Nafees Ahammed",
  firstName: "Nafees",
  initials: "NA",
  role: "Full-Stack Developer",
  specialty: "React · Next.js · Node.js · Express",
  location: "Bengaluru, India",
  email: "shaik.nafees.2789@gmail.com",
  github: "https://github.com/Nafees2789",
  githubHandle: "Nafees2789",
  // Paste your LinkedIn profile URL here — it will appear across the site automatically.
  linkedin: "",
  siteUrl: "https://nafees2789.github.io",
  summary:
    "Full-stack developer with 4+ years of experience crafting fast, polished web applications with React and Next.js, backed by Node.js and Express — from enterprise invoicing platforms and real-time data visualisation to AI assistants powered by LLMs, RAG and MCP.",
} as const;

export const navItems = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "work", label: "Work" },
  { id: "stack", label: "Skills" },
  { id: "contact", label: "Contact" },
] as const;

export const heroIntro =
  "I craft fast, polished interfaces with React and Next.js — and back them with clean Node.js and Express APIs, end to end.";

export const heroRoles = [
  "React & Next.js Engineer",
  "Full-Stack Developer",
  "Node.js & Express Developer",
  "AI Interface Builder",
] as const;

export const profileCard = [
  { label: "Currently", value: "Software Engineer @ Softtek" },
  { label: "Location", value: "Bengaluru, India" },
  { label: "Experience", value: "4+ years" },
  { label: "Education", value: "MCA, Andhra University" },
] as const;

export const coreStack = ["React", "Next.js", "Node.js", "Express", "JavaScript", "TypeScript", "MongoDB"] as const;

export const stats = [
  { value: "4+", label: "Years of experience" },
  { value: "2", label: "Industry certifications" },
  { value: "3", label: "Enterprise products" },
  { value: "1st", label: "TCS Hackathon" },
] as const;

export const aboutText = [
  "I'm a full-stack developer with a frontend heart — I craft the interfaces people actually use in React and Next.js, and build the Node.js and Express APIs that power them.",
  "My journey runs from enterprise delivery at Tata Consultancy Services to building invoicing platforms, real-time data visualisation and AI assistants at FirstMile and Softtek.",
] as const;

export const capabilities = [
  {
    icon: "layout",
    title: "Frontend Engineering",
    body: "Responsive, high-performance interfaces with React and Next.js, reusable component systems and predictable state.",
    tags: ["React", "Next.js", "Redux", "Zustand", "Tailwind"],
  },
  {
    icon: "server",
    title: "Backend & APIs",
    body: "Secure REST APIs with Node.js and Express, JWT authentication and MongoDB data models built to scale.",
    tags: ["Node.js", "Express", "MongoDB", "JWT"],
  },
  {
    icon: "sparkles",
    title: "AI & Data",
    body: "AI assistants with LLMs, RAG and MCP, plus interactive D3.js dashboards on Snowflake and ClickHouse data.",
    tags: ["LLMs", "RAG", "MCP", "D3.js", "Snowflake"],
  },
] as const;

export type Experience = {
  company: string;
  monogram: string;
  role: string;
  period: string;
  location: string;
  current?: boolean;
  summary: string;
  points: string[];
  stack: string[];
};

export const experiences: Experience[] = [
  {
    company: "Softtek India",
    monogram: "ST",
    role: "Software Engineer",
    period: "Mar 2025 — Present",
    location: "Bengaluru",
    current: true,
    summary:
      "Building an enterprise invoice management platform and AI-powered tooling for internal teams.",
    points: [
      "Built a scalable invoice management system in React and Next.js with support for bulk invoice generation.",
      "Developed an admin dashboard for real-time invoice tracking, reporting and monitoring.",
      "Designed a reusable component architecture that kept the UI consistent and easy to extend.",
      "Integrated REST APIs with Node.js services, connecting the product to live invoice data.",
    ],
    stack: ["React", "Next.js", "Node.js", "Zustand"],
  },
  {
    company: "FirstMile Global Consultancy",
    monogram: "FM",
    role: "Software Engineer",
    period: "Mar 2024 — Nov 2024",
    location: "Bengaluru",
    summary:
      "Turned warehouse-scale Snowflake data into real-time, interactive insight.",
    points: [
      "Built an interactive data visualisation application in React and Redux delivering real-time insights on Snowflake data.",
      "Automated data synchronisation between Snowflake and the application, ensuring real-time accuracy and consistency.",
    ],
    stack: ["React", "Redux", "D3.js", "Snowflake"],
  },
  {
    company: "IMPG Computer Programming",
    monogram: "IMPG",
    role: "Full-Stack Developer",
    period: "Jan 2023 — Aug 2023",
    location: "Hyderabad",
    summary:
      "Shipped features across the stack and hardened production stability.",
    points: [
      "Engineered responsive React applications with Redux for efficient state and a smoother user experience.",
      "Built and connected Node.js REST APIs secured with JWT authentication, resolving production issues end to end.",
      "Delivered new features, fixed defects and improved stability and performance in an Agile team.",
    ],
    stack: ["React", "Node.js", "Express", "Redux", "JWT"],
  },
  {
    company: "Tata Consultancy Services",
    monogram: "TCS",
    role: "Associate System Engineer",
    period: "Aug 2021 — Jan 2023",
    location: "Hyderabad",
    summary:
      "Where it began — enterprise software, production support, and a hackathon win.",
    points: [
      "Developed and supported enterprise web applications using React, JavaScript, HTML5 and CSS3.",
      "Delivered UI enhancements, bug fixes and production support to keep applications reliable.",
      "Worked in Agile teams with disciplined Git branching, merging and pull-request workflows.",
    ],
    stack: ["React", "JavaScript", "HTML5", "CSS3", "Git"],
  },
];

export type CaseStudy = {
  slug: "salma" | "invoice" | "opwi";
  title: string;
  kicker: string;
  description: string;
  highlights: string[];
  stack: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "invoice",
    title: "Electronic Invoice Generation System",
    kicker: "Enterprise Platform",
    description:
      "A high-throughput invoicing platform for single and bulk invoice generation, with a real-time admin dashboard for tracking and reporting.",
    highlights: [
      "Next.js rendering optimised for fast page loads",
      "Complex invoice data flows managed with Zustand",
      "Component system built on Tailwind CSS and shadcn/ui",
      "Seamless REST API integration with backend services",
    ],
    stack: ["React", "Next.js", "Zustand", "Tailwind CSS", "shadcn/ui"],
  },  {
    slug: "opwi",
    title: "Optical Wafer Inspection",
    kicker: "Data Visualisation",
    description:
      "An interactive visualisation application for semiconductor inspection, rendering ClickHouse-powered defect data with speed and precision.",
    highlights: [
      "Interactive D3.js wafer and defect visualisations",
      "Strictly typed React + Redux architecture",
      "Front-end performance tuning for large datasets",
    ],
    stack: ["React", "TypeScript", "Redux", "D3.js", "ClickHouse"],
  },  {
    slug: "salma",
    title: "SALMA — Enterprise AI Assistant",
    kicker: "AI · Full-Stack",
    description:
      "An AI-powered enterprise assistant that automates ticket management across Jira, ServiceNow and PPM through a natural-language chat interface.",
    highlights: [
      "React chat interface backed by Node.js services",
      "LLMs, knowledge bases and RAG for contextual answers",
      "MCP connecting the assistant to enterprise tools",
      "Prompt and workflow design for intelligent tool selection",
    ],
    stack: ["React", "Node.js", "OpenAI", "MCP", "RAG"],
  },];

export type Build = {
  title: string;
  kicker: string;
  description: string;
  stack: string[];
  repo: string;
};

export const builds: Build[] = [
  {
    title: "Tailor-Made Commerce",
    kicker: "Full-Stack · E-commerce",
    description:
      "A tailoring marketplace with custom orders, seller inventory, ratings, JWT auth and checkout via online payment or cash on delivery.",
    stack: ["React", "Node.js", "Express", "MongoDB", "JWT"],
    repo: "https://github.com/Nafees2789/Online_Tailoring_Management_System",
  },  {
    title: "Showtime Tickets",
    kicker: "Full-Stack · Booking",
    description:
      "Browse films and local events, choose dates, and receive a QR-coded ticket the moment a booking is confirmed.",
    stack: ["React", "Node.js", "Express", "MongoDB"],
    repo: "https://github.com/Nafees2789/MovieBooking",
  },  {
    title: "Live Markdown Studio",
    kicker: "React · Node.js",
    description:
      "A real-time Markdown editor with instant HTML preview, syntax highlighting and synchronised scrolling.",
    stack: ["React", "Node.js", "Express"],
    repo: "https://github.com/Nafees2789/Real-time-Markdown-Editor-with-Live-Preview",
  },  {
    title: "Jira MCP Server",
    kicker: "Node.js · AI Tooling",
    description:
      "A Model Context Protocol server exposing Jira search, create, update and delete as schema-validated tools for AI agents.",
    stack: ["Node.js", "Express", "MCP SDK", "Zod"],
    repo: "https://github.com/Nafees2789/JIRA-MCP",
  },];

export const stack = [
  {
    group: "Frontend",
    items: ["React", "Next.js", "TypeScript", "JavaScript (ES6+)", "Redux", "Zustand", "Tailwind CSS", "shadcn/ui"],
  },
  {
    group: "Backend",
    items: ["Node.js", "Express", "REST APIs", "MongoDB", "JWT Auth"],
  },
  {
    group: "Data & AI",
    items: ["D3.js", "Snowflake", "ClickHouse", "LLM Integration", "RAG", "MCP"],
  },
  {
    group: "Workflow",
    items: ["Git · GitHub · Bitbucket", "GitHub Copilot", "Claude", "Amazon Q", "Agile / Scrum", "Production Support"],
  },
] as const;

export const recognition = [
  { icon: "badge", title: "Certified", detail: "React Frontend Developer" },
  { icon: "trophy", title: "Winner", detail: "TCS Hackathon" },
  { icon: "medal", title: "Merit Rank", detail: "Google Hash Code" },
  { icon: "badge", title: "Certified", detail: "Amazon Q" },
] as const;

export const education = [
  {
    degree: "Master of Computer Applications",
    school: "Andhra University, Visakhapatnam",
    period: "2018 — 2021",
  },
  {
    degree: "Bachelor's in Computer Science",
    school: "Alpha Degree College, Kanigiri",
    period: "2015 — 2018",
  },
] as const;

export const emailjsConfig = {
  serviceId: "service_jekk8lh",
  templateId: "template_z1ulab8",
  publicKey: "Ab0FZKQb4YwL1CByW",
} as const;
