export const student = {
  name: "Ajith",
  initials: "AJ",
  track: "Web Development",
  currentDay: 12,
  totalDays: 60,
  streak: 11,
  xp: 2450,
  builds: 12,
  greetingName: "Ajith",
};

export const weekDays = [
  { label: "M", done: true },
  { label: "T", done: true },
  { label: "W", done: true },
  { label: "T", done: true },
  { label: "F", done: false },
  { label: "S", done: true },
  { label: "S", done: true },
];

export const todayChallenge = {
  day: 12,
  title: "Build a Responsive Student Portfolio",
  description:
    "Create a mobile-first portfolio with a hero section, skills, projects and contact CTA.",
  longDescription:
    "Create a mobile-first portfolio website for a college student. The portfolio should communicate who they are, what they can build, and how someone can contact them.",
  time: "2–3 hours",
  level: "Intermediate",
  stack: "HTML · CSS · Responsive Design",
};

export const checklistItems = [
  "Hero section",
  "About section",
  "Skills section",
  "3 project cards",
  "Contact CTA",
  "Responsive mobile layout",
  "Deploy the website",
];

export const requirements = [
  "Works cleanly at 390px width",
  "Uses semantic HTML structure",
  "Includes at least 3 real project cards",
  "Contact CTA links to email or a form",
  "Deployed on a public URL",
];

export const guidanceByLevel: Record<string, string[]> = {
  Beginner: [
    "Start with a single HTML file and one stylesheet.",
    "Use a simple vertical layout — one section under another.",
    "Skip animations. Focus on readable text and spacing.",
  ],
  Intermediate: [
    "Structure with semantic tags: header, main, section, footer.",
    "Use Flexbox/Grid with a mobile-first media query at 768px.",
    "Add hover and focus states for every interactive element.",
  ],
  Advanced: [
    "Componentize the layout and use CSS custom properties for theming.",
    "Add light/dark support and a small scroll-reveal interaction.",
    "Score 90+ on Lighthouse for performance and accessibility.",
  ],
};

export const mentorResponses: Record<string, string> = {
  "Explain the Task":
    "You're building a one-page portfolio that answers three questions fast: who you are, what you can build, and how to reach you. Everything else is decoration. Start with the content, then style it.",
  "Give Me a Hint":
    "Write the raw text of all sections first, in plain HTML with no CSS. Once the content reads well top to bottom, styling takes half the time.",
  "Break It Into Steps":
    "1) Hero with name + one-line pitch.\n2) About paragraph (3 sentences max).\n3) Skills list.\n4) Three project cards with title, stack and link.\n5) Contact CTA.\n6) Mobile pass at 390px.\n7) Deploy.",
  "What Should I Build First?":
    "The hero. It sets the tone and it's the smallest complete piece — name, one line about you, and a button to your projects.",
  "I'm Stuck":
    "Ship the ugliest working version tonight: plain text, no CSS, deployed. A live ugly page beats a perfect local one. Improve it tomorrow.",
};

export const codeReview = [
  {
    label: "Good",
    tone: "success" as const,
    text: "Your responsive structure is present.",
  },
  {
    label: "Improve",
    tone: "warn" as const,
    text: "Consider using semantic HTML elements.",
  },
  {
    label: "Next Step",
    tone: "info" as const,
    text: "Test the page at 390px width.",
  },
];

export const helpSteps = [
  "Break the task into smaller pieces.",
  "Check documentation.",
  "Ask an AI coding assistant.",
  "Build the simplest working version.",
  "Improve it after it works.",
];

export const achievements = [
  { name: "First Build", icon: "Hammer", earned: true, note: "Day 1" },
  { name: "7-Day Builder", icon: "Flame", earned: true, note: "Day 7" },
  { name: "First Deployment", icon: "Rocket", earned: true, note: "Day 5" },
  { name: "Build in Public", icon: "Megaphone", earned: true, note: "Day 9" },
  { name: "10 Builds", icon: "Layers", earned: true, note: "Day 10" },
  { name: "30-Day Builder", icon: "Trophy", earned: false, note: "Day 30" },
  { name: "Halfway Hero", icon: "Medal", earned: false, note: "Day 30" },
  { name: "Showcase Ready", icon: "Star", earned: false, note: "Day 60" },
];

export const leaderboard = [
  { rank: 1, name: "Aarav", xp: 3240 },
  { rank: 2, name: "Ananya", xp: 3050 },
  { rank: 3, name: "Rahul", xp: 2900 },
  { rank: 4, name: "Meera", xp: 2810 },
  { rank: 5, name: "Kabir", xp: 2720 },
  { rank: 18, name: "Ajith", xp: 2450, isYou: true },
];

export const community = [
  {
    name: "Riya",
    initials: "RY",
    day: "Day 12 — Responsive Portfolio",
    text: "Completed my portfolio challenge today.",
  },
  {
    name: "Aarav",
    initials: "AA",
    day: "Day 18 — Weather App",
    text: "Built and deployed a weather application.",
  },
  {
    name: "Ananya",
    initials: "AN",
    day: "Day 27 — AI Chatbot",
    text: "Built my first AI-powered project.",
  },
];

export const portfolioBuilds = [
  { day: 12, title: "Responsive Portfolio", stack: "HTML · CSS" },
  { day: 18, title: "Weather App", stack: "JS · API" },
  { day: 27, title: "Data Dashboard", stack: "React · Charts" },
  { day: 40, title: "AI Chatbot", stack: "React · LLM" },
];

export const tracks = [
  "Web Development",
  "AI & Machine Learning",
  "Data Science",
  "App Development",
  "UI/UX",
];

export const journey = [
  { day: 1, label: "Start" },
  { day: 15, label: "Habit" },
  { day: 30, label: "Halfway" },
  { day: 45, label: "Momentum" },
  { day: 60, label: "Showcase" },
];

export const weeklyReview = {
  completed: 6,
  total: 7,
  strongestSkill: "Responsive Design",
  skills: [
    { name: "Responsive Design", value: 86 },
    { name: "HTML Semantics", value: 72 },
    { name: "CSS Layout", value: 68 },
    { name: "Deployment", value: 54 },
  ],
};

export const linkedInPost = `Day 12 of my 60-day coding challenge with ABTalks.

Today I built and deployed a fully responsive student portfolio — hero, about, skills, three project cards and a contact CTA. Mobile-first, tested down to 390px.

The hardest part wasn't the CSS. It was cutting content until every section earned its place.

11 days straight. 48 to go.

#60DayChallenge #WebDevelopment #BuildInPublic`;

export const resumeBullet =
  "Built and deployed a responsive student portfolio using HTML, CSS and JavaScript.";
