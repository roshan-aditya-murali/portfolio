// All site content lives here. Edit this file to update the site.
// Search for "EDIT" to find the spots that still need your real details.

export const profile = {
  name: "Roshan Aditya Murali",
  short: "RM",
  handle: "roshan",
  host: "corvallis",
  location: "Corvallis, OR",
  workAuth: "Authorized to work in the US",
  roles: ["Full-stack engineer", "AI agent builder", "Software engineering researcher"],
  pitch:
    "I build full-stack web software and LLM agents, and research how to check that programs, and the models writing them, do what they claim.",
  education: "M.Eng. CS, Oregon State (Dec 2026)",
  status: "Open to new-grad SWE roles",
  email: "roshanaditya23@gmail.com", // EDIT
  github: "https://github.com/roshan-aditya-murali",
  linkedin: "https://www.linkedin.com/in/roshan-aditya-murali-577a831b3/", // EDIT
  resume: "Resume.pdf", // put resume.pdf in /public
  photo: "profile.jpg", // EDIT: e.g. "profile.jpg" in /public. Empty shows initials.
};

export const stats = [
  { value: "1 yr", label: "shipping production code" },
  { value: "2", label: "research papers, 1 under review" },
  { value: "19 / 312", label: "flagged LLM failures that held up under human review" },
  { value: "Dec '26", label: "M.Eng. graduation" },
];

export type Study = { question: string; title: string; body: string; stack: string[]; status: string };

export const research: Study[] = [
  {
    question: "Do LLMs actually behave the way their system cards say they do?",
    title: "LEST: specification-based testing of LLM safety claims",
    body:
      "LEST treats the safety claims in published system cards as behavioral specifications. It extracts claims, decides which can be tested through black-box prompting, maps each one to the benchmark prompts that actually exercise it, then mutates those prompts with seven operators (lexical substitution, paraphrase, identity substitution, and more) behind automated validity checks. Every failure flagged by a three-judge classifier ensemble is validated by hand and traced back to the claim it contradicts. On Claude Opus 4.8 and GPT-5.5, only 29 of 56 documented claims were prompt-testable, and only 17 of those were covered by SORRY-Bench. Both models refused over 95% of the original prompts, yet across 1,836 mutated prompts, 19 human-validated failures contradicted 6 of the 9 covered refusal claims. Automated judges alone would have reported 312.",
    stack: ["Python", "spaCy", "Hugging Face", "MiniLM", "T5 paraphrasing", "WildGuard", "SORRY-Bench", "LLM APIs"],
    status: "Under review at FSE 2027",
  },
  {
    question: "Can invariants inferred by an LLM tell a correct patch from one that only passes the tests?",
    title: "LLM-inferred program invariants for patch correctness",
    body:
      "Has a language model infer program invariants, checks them for logical consistency with an SMT solver, and validates them against dynamically detected invariants from Daikon. Evaluated on real bugs and fixes from the Defects4J benchmark.",
    stack: ["Python", "Java", "Daikon", "SMT", "Defects4J"],
    status: "Manuscript in preparation",
  },
];

export type Project = { title: string; tag: string; body: string; stack: string[]; link?: string };

export const projects: Project[] = [
  {
    title: "Agentic computer-use automation",
    tag: "Take-home assessment",
    body:
      "An agent that explores a mock bank-teller web app on its own, records what it can do as structured capability artifacts, and replays those workflows deterministically. Risky steps pause for approval through a human-in-the-loop state machine, and the whole flow is covered by integration tests.",
    stack: ["Claude API", "Computer use", "State machines", "Integration tests"],
  },
  {
    title: "AI coding agent",
    tag: "Agents",
    body:
      "A command-line agent that plans and calls tools in a loop: list, read, and write files and run Python scripts inside a fixed working directory. Each tool has its own pytest suite. Built on the architecture from Boot.dev's AI agents course.",
    stack: ["Python", "Gemini 2.5 Flash", "Function calling", "pytest"],
    link: "https://github.com/roshan-aditya-murali/coding-agent",
  },
  {
    title: "AI virtual mouse",
    tag: "Computer vision",
    body:
      "Controls the computer's cursor with hand gestures from a webcam. MediaPipe tracks the hand and finger landmarks in each frame, and the finger positions are mapped to cursor movement and clicks.",
    stack: ["Python", "OpenCV", "MediaPipe"],
    // link: "https://github.com/roshan-aditya-murali/REPO", // EDIT if public
  },
  {
    title: "Emotion-aware music recommender",
    tag: "Multimodal ML",
    body:
      "Estimates your mood from two signals at once, a webcam frame classified by a CNN for facial expression and a short voice recording analyzed for vocal emotion, then fuses them into one estimate that drives song recommendations.",
    stack: ["Python", "OpenCV", "CNN", "Audio features"],
  },
];

export type Job = { when: string; role: string; org: string; points: string[] };

export const experience: Job[] = [
  {
    when: "Apr 2026 - Sept 2026", // EDIT: start date
    role: "Website Coordinator",
    org: "ASOSU, Oregon State University",
    points: ["Maintain the student government's public website, with attention to accessible markup and content."],
  },
  {
    when: "Jun 2023 – Jun 2024",
    role: "Software Engineer (freelance)",
    org: "Soreal Inc.",
    points: [
      "Added API pagination so the app's map loads about 30% faster.",
      "Built React front-end features, including the address-lookup map.",
      "Set up CI/CD with GitHub Actions for automated test and deploy.",
    ],
  },
  {
    when: "May 2022 – Aug 2022",
    role: "Data Analytics & Front-End Intern",
    org: "Ford Motor Company",
    points: [
      "Reduced manual reporting effort by 20% by writing SQL queries and building Power BI KPI dashboards on optimized data pipelines, turning cross-functional requirements into shipped reporting.",
    ],
  },
  {
    when: "Sept 2021 - Oct 2021", // EDIT: dates
    role: "Data Science & Business Analytics Intern", // EDIT: real title
    org: "The Sparks Foundation",
    points: [], // EDIT
  },
];

export const education = [
  { when: "Expected Dec 2026", degree: "M.Eng., Computer Science", school: "Oregon State University" },
  { when: "July 2019 - June 2023", degree: "B.Tech., Computer Science", school: "Vellore Institute of Technology" }, // EDIT: year
];

export type SkillGroup = { name: string; icon: "code" | "layers" | "cloud" | "bot" | "flask"; items: string[] };

export const skills: SkillGroup[] = [
  { name: "Languages", icon: "code", items: ["Java", "TypeScript", "JavaScript", "Python", "SQL"] },
  { name: "Web & backend", icon: "layers", items: ["React", "Next.js", "Node.js", "Spring Boot", "REST APIs", "PostgreSQL", "MySQL"] },
  { name: "Cloud & DevOps", icon: "cloud", items: ["AWS Lambda", "EC2", "RDS", "DynamoDB", "S3", "API Gateway", "CDK", "CloudFormation", "Docker", "Kubernetes", "GitHub Actions"] },
  { name: "AI & agents", icon: "bot", items: ["Claude API", "OpenAI API", "Gemini API", "Tool calling", "Computer use", "Human-in-the-loop", "Hugging Face", "spaCy", "Safety classifiers", "scikit-learn", "OpenCV", "MediaPipe"] },
  { name: "Testing & analysis", icon: "flask", items: ["Mutation testing", "Fuzzing", "Specification-based testing", "Daikon", "SMT solving", "Defects4J", "pytest", "Integration testing"] },
];
