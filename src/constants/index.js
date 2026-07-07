export const navLinks = [
  { id: "hero", title: "Home", icon: "home" },
  { id: "about", title: "About", icon: "user" },
  { id: "skills", title: "Skills", icon: "code" },
  { id: "experience", title: "Experience", icon: "briefcase" },
  { id: "projects", title: "Projects", icon: "layers" },
  { id: "certificates", title: "Certificates", icon: "award" },
  { id: "contact", title: "Contact", icon: "mail" },
];

export const heroData = {
  name: "Hechem Klai",
  roles: [
    "Full Stack Developer",
    "Software Engineer",
    "Creative Technologist",
    "Problem Solver",
  ],
  tagline:
    "crafting elegant digital solutions with clean code and modern technologies. Passionate about building applications that make a difference",
};

export const aboutData = {
  bio: "I'm Hechem Klai, a dedicated software developer from Tunisia with a passion for crafting robust, user-centric web applications. I specialize in the full JavaScript ecosystem — from React and Next.js on the frontend to Node.js and Express on the backend. I thrive on solving complex challenges and continuously learning new technologies to stay at the cutting edge of web development.",
  stats: [
    { label: "Projects Completed", value: "4" },
    { label: "Technologies", value: "30+" },
    { label: "Hackathons Won", value: "1" },
    { label: "Certificates", value: "7" },
  ],
  location: "Tunisia",
  availability: "Open to opportunities",
  currentlyWorking: "Building scalable full-stack applications",
};

export const skillCategories = {
  Frontend: [
    { name: "React.js", level: 90, color: "#61DAFB" },
    { name: "JavaScript", level: 90, color: "#F7DF1E" },
    { name: "Tailwind CSS", level: 95, color: "#06B6D4" },
    { name: "HTML5 & CSS", level: 95, color: "#E34F26" },
    { name: "Web Design", level: 80, color: "#FF61F6" },
  ],
  Backend: [
    { name: "Java", level: 85, color: "#f89820" },
    { name: "Python", level: 85, color: "#3776AB" },
    { name: "PHP", level: 75, color: "#777BB4" },
    { name: "SQL", level: 80, color: "#4479A1" },
    { name: "REST APIs", level: 90, color: "#FF6C37" },
    { name: "Microservices", level: 85, color: "#00d4ff" },
  ],
  "Cloud & DevOps": [
    { name: "Cloud Computing", level: 80, color: "#FF9900" },
    { name: "DevOps", level: 75, color: "#2496ED" },
    { name: "Cloud Security", level: 80, color: "#4285F4" },
    { name: "BeyondCorp", level: 70, color: "#FBBC05" },
  ],
  "AI & Networking": [
    { name: "Artificial Intelligence", level: 85, color: "#915EFF" },
    { name: "Machine Learning", level: 80, color: "#FF006E" },
    { name: "Generative AI", level: 85, color: "#00E5FF" },
    { name: "Networking", level: 90, color: "#339933" },
  ],
};

export const certificates = [
  {
    title: "EF SET English Certificate 78/100 (C2 Proficient)",
    issuer: "EF SET",
    date: "Jul 2026",
    description: "Demonstrates C2 Proficient level of English reading and listening comprehension.",
    credential: "https://cert.efset.org/en/62ZkyS",
  },
  {
    title: "Mitigate Threats & Vulnerabilities with Security Command Center",
    issuer: "Google",
    date: "Jul 2026",
    description: "Skills earned: Beyondcorp Enterprise Security, Cloud Security, Security Command Center.",
    credential: "https://www.credly.com/badges/1033df27-5133-469a-a6e8-19d55a5c3bc4/linked_in_profile",
  },
  {
    title: "Secure Software Delivery",
    issuer: "Google",
    date: "Jul 2026",
    description: "Demonstrated knowledge in securing the software supply chain and CI/CD pipelines.",
    credential: "https://www.credly.com/badges/05791ed2-603a-4c9a-8db0-8aef8ce7f68f/linked_in_profile",
  },
  {
    title: "Software Engineer",
    issuer: "HackerRank",
    date: "Jul 2026",
    description: "Verified problem-solving and algorithmic thinking using SQL, Python, and Java.",
    credential: "https://www.hackerrank.com/certificates/74aedabea52d",
  },
  {
    title: "Python (Basic)",
    issuer: "HackerRank",
    date: "Jul 2026",
    description: "Verified proficiency in Python programming language basics.",
    credential: "https://www.hackerrank.com/certificates/2d26adeefed8",
  },
  {
    title: "Google AI Essentials",
    issuer: "Google",
    date: "Jul 2026",
    description: "Skills earned: Generative AI, Machine Learning, and prompt engineering fundamentals.",
    credential: "https://www.credly.com/badges/1dda2d89-3270-461b-b6e4-0f457535af95/linked_in_profile",
  },
  {
    title: "AWS Academy Graduate - Cloud Foundations",
    issuer: "Amazon Web Services",
    date: "Nov 2025",
    description: "Foundational understanding of AWS cloud computing concepts and security.",
    credential: "https://www.credly.com/badges/5e55e91f-722a-452d-93b6-20b88311db2e/linked_in_profile",
  },
];

export const experiences = [
  {
    title: "Internship Trainee",
    company: "Pixel pulsar",
    date: "Feb 2026 — May 2026",
    points: [
      "Worked in a remote environment utilizing React.js, Tailwind CSS, and Java.",
      "Developed secure and scalable web applications leveraging JSON Web Token (JWT).",
      "Built and maintained REST APIs and modern Microservices architectures.",
      "Gained hands-on experience applying Python and other web technologies.",
    ],
    color: "#915EFF",
  },
  {
    title: "Internship Trainee",
    company: "Tunisie Telecom",
    date: "Jul 2025 — Sep 2025",
    points: [
      "Worked in a hybrid setting at Al Kaf, Tunisia focusing on telecommunications infrastructure.",
      "Gained practical experience with Computer Information Systems.",
      "Learned and applied advanced concepts in Networking and Computer Networking.",
      "Assisted in maintaining and deploying internal networking solutions.",
    ],
    color: "#00d4ff",
  },
  {
    title: "Bachelor's Degree in Software Engineering",
    company: "Université de Jendouba",
    date: "Sep 2023 — Jul 2026",
    points: [
      "Graduated with honors, completing a rigorous 3-year program.",
      "Focused on software engineering, algorithmic problem solving, and modern application architecture.",
      "Developed expertise in Artificial Intelligence (AI), Machine Learning, and Cloud Computing.",
      "Mastered a wide array of languages including Java, Python, HTML5, CSS, PHP, and JavaScript.",
    ],
    color: "#ff006e",
  },
];

export const projects = [
  {
    name: "PixelHR",
    description:
      "A comprehensive, full-stack HR management platform built for enterprise use. Engineered using a modern microservices architecture to ensure massive scalability and strict separation of concerns. (Final Year Project - ISI Kef)",
    tags: [
      { name: "React", color: "#61DAFB" },
      { name: "TypeScript", color: "#3178C6" },
      { name: "Spring Boot", color: "#6DB33F" },
      { name: "AWS", color: "#FF9900" },
    ],
    source_code_link: "https://github.com/hechem5",
    live_link: "#",
  },
  {
    name: "Tickety",
    description:
      "An end-to-end e-commerce ticketing ecosystem for gaming events, concerts, and movies. Built to handle high-concurrency ticket drops using an enterprise-grade microservices backend and cloud architecture.",
    tags: [
      { name: "React", color: "#61DAFB" },
      { name: "Django", color: "#092E20" },
      { name: "FastAPI", color: "#009688" },
      { name: "Spring Boot", color: "#6DB33F" },
    ],
    source_code_link: "https://github.com/hechem5",
    live_link: "#",
  },
  {
    name: "MyTel.tn",
    description:
      "A responsive telecommunications web platform streamlining online subscriptions and client account management. Features a smart front-end session workflow, dynamic CRUD operations, and a SIM card management dashboard. (Tunisie Telecom)",
    tags: [
      { name: "PHP", color: "#777BB4" },
      { name: "MySQL", color: "#4479A1" },
      { name: "JavaScript", color: "#F7DF1E" },
      { name: "HTML/CSS", color: "#E34F26" },
    ],
    source_code_link: "https://github.com/hechem5",
    live_link: "#",
  },
  {
    name: "Frostbyte Winner",
    description:
      "A competitive game development project that secured 1st place overall at the Frostbyte Game Dev Hackathon. Demonstrates the ability to rapidly prototype, design, and execute a functional software project under extreme time constraints and pressure.",
    tags: [
      { name: "Unity", color: "#ffffff" },
      { name: "Game Design", color: "#ff006e" },
      { name: "Hackathon", color: "#915EFF" },
      { name: "Prototyping", color: "#00d4ff" },
    ],
    source_code_link: "https://github.com/hechem5",
    live_link: "#",
  },
];

export const socialLinks = [
  { name: "GitHub", url: "https://github.com/hechem5", icon: "github" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/hechem-klai/", icon: "linkedin" },
  { name: "Twitter", url: "https://twitter.com", icon: "twitter" },
  { name: "Email", url: "mailto:Hechem.klai@gmail.com", icon: "mail" },
];
