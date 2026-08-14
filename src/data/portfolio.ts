export interface Project {
  id: string;
  title: string;
  category: "AI / ML" | "Full-Stack" | "Systems";
  description: string;
  fullDescription: string;
  architecture: string[];
  problem: string;
  solution: string;
  technologies: string[];
  githubUrl: string;
  demoUrl?: string;
  featured: boolean;
  metrics?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  current: boolean;
  summary: string;
  highlights: string[];
  techStack: string[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date?: string;
  credentialUrl?: string;
}

export interface Patent {
  title: string;
  designNumber: string;
  government: string;
  registrationDate: string;
  summary: string;
}

export interface SkillCategory {
  category: string;
  skills: { name: string; icon?: string; priority?: boolean }[];
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "Kurapati Venkata Sai Jathin",
    shortName: "Jathin Kurapati",
    brandLogo: "[ / > ] Kurapati.dev",
    role: "Software Engineering Intern @ Klinn AI",
    tagline: "Building high-throughput backend architecture, resilient web platforms, and intelligent systems.",
    bioShort: "Computer Science engineer focused on data, backend systems, and scalable software.",
    education: {
      degree: "B.Tech in Computer Science & Engineering",
      institution: "KLH University",
      period: "2023 — 2027",
      location: "Hyderabad, India"
    },
    location: "Hyderabad, India",
    availability: "Available for Software Engineering Roles & Select Client Projects",
    statusBadge: "Available for Roles & Select Projects",
    resumeUrl: "/Kurapati_Venkat_Jathin_Resume.pdf",
    avatarUrl: "/profile.jpg",
    googleMeetUrl: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Meeting+with+Kurapati+Venkata+Sai+Jathin&add=kurapativenkatajathin%40gmail.com",
    calendlyFallbackUrl: "https://calendly.com/kurapativenkatajathin",
    socials: {
      github: "https://github.com/jathin-75",
      linkedin: "https://www.linkedin.com/in/jathin-kurapati-venkata-sai-b108672a6/", // placeholder standard
      email: "mailto:kurapativenkatajathin@gmail.com",
      directEmail: "kurapativenkatajathin@gmail.com"
    }
  },

  experience: [
    {
      id: "klinn-ai",
      role: "Software Engineering Intern",
      company: "Klinn AI",
      period: "Jun 2026 — Present",
      location: "Hyderabad, India",
      current: true,
      summary: "Engineered scalable AI workflows and microservice infrastructure for high-concurrency client applications.",
      highlights: [
        "Architected asynchronous event processing pipelines handling thousands of requests/min with sub-100ms latency.",
        "Optimized database indexing and caching layers using PostgreSQL and Redis, cutting API p95 response time by 42%.",
        "Integrated robust JWT auth, rate-limiting, and error-resilient middleware across internal backend services."
      ],
      techStack: ["Python", "FastAPI", "TypeScript", "Next.js", "Redis", "PostgreSQL", "Docker"]
    }
  ] as ExperienceItem[],

  projects: [
    {
      id: "sonicsense-ai",
      title: "SonicSense AI",
      category: "AI / ML",
      description: "Real-time environmental sound detection using deep neural networks and Web Audio API.",
      fullDescription: "SonicSense AI processes live acoustic streams directly from edge clients or server pipelines to detect, classify, and alert on ambient sound events in real time with high confidence.",
      problem: "Traditional acoustic monitoring platforms suffer from high latency, heavy bandwidth utilization, and false positives in noisy urban environments.",
      solution: "Engineered a low-latency pipeline using YAMNet audio embeddings served via a optimized FastAPI microservice and real-time Web Audio API streaming.",
      architecture: [
        "Browser Audio Worklet / Stream Ingestion via Web Audio API",
        "FastAPI Asynchronous Gateway with WebSockets",
        "YAMNet / TensorFlow model serving tuned for sound event classification",
        "SQLAlchemy + PostgreSQL event logging with real-time WebSocket broadcasting"
      ],
      technologies: ["Python", "FastAPI", "TensorFlow", "YAMNet", "SQLAlchemy", "Web Audio API"],
      githubUrl: "https://github.com/jathin-75/Sonicsence",
      featured: true,
      metrics: "< 80ms classification latency"
    },
    {
      id: "enterprise-crm",
      title: "Enterprise CRM",
      category: "Full-Stack",
      description: "Comprehensive CRM platform for sales pipelines, client interactions, analytics, and automation.",
      fullDescription: "A modern full-stack CRM built for high-throughput sales teams, featuring interactive kanban deal boards, automated lead scoring, granular role-based access controls, and custom webhooks.",
      problem: "Existing enterprise CRM platforms are bloated, slow to render heavy pipeline states, and lack real-time reactivity without expensive custom addons.",
      solution: "Designed a lightweight, highly reactive Next.js 15 App Router architecture backed by Node.js, Prisma ORM, and PostgreSQL with optimistic UI updates.",
      architecture: [
        "Next.js App Router frontend with Tailwind CSS and dynamic server components",
        "Node.js / Express API gateway with role-based JWT security",
        "PostgreSQL database managed with Prisma ORM and automated migrations",
        "Background task queues for automated email notifications and sales reporting"
      ],
      technologies: ["Next.js", "React", "Node.js", "PostgreSQL", "Prisma", "Tailwind CSS"],
      githubUrl: "https://github.com/jathin-75/CRM",
      featured: true,
      metrics: "99.9% uptime architecture"
    },
    {
      id: "notification-engine-v2",
      title: "Notification Engine v2",
      category: "Systems",
      description: "High-throughput multi-channel event notification system designed for zero message loss.",
      fullDescription: "A fault-tolerant distribution engine that processes transactional notifications across Email, SMS, Push, and Webhooks with automatic retry backoffs and dead-letter queues.",
      problem: "High-volume transactional systems frequently experience notification bottlenecks, duplicate deliveries, and provider rate-limiting during surge loads.",
      solution: "Architected a decoupled producer-consumer pipeline using Redis and BullMQ distributed queues with exponential backoff retries and FastAPI monitoring dashboards.",
      architecture: [
        "TypeScript Producer service ingesting system telemetry and user events",
        "Redis cluster backed BullMQ queue orchestrator",
        "Multi-worker execution engine with dynamic provider fallback strategy",
        "FastAPI metrics dashboard for queue depth monitoring and DLQ recovery"
      ],
      technologies: ["TypeScript", "Node.js", "Redis", "BullMQ", "FastAPI", "PostgreSQL", "Docker"],
      githubUrl: "https://github.com/jathin-75/notification-engine-v2",
      featured: true,
      metrics: "50,000+ msg/sec capacity"
    }
  ] as Project[],

  patent: {
    title: "SMART NECKBAND FOR POSTURE MONITORING AND THERAPEUTIC MASSAGE",
    designNumber: "463448-001",
    government: "The Patent Office, Government of India",
    registrationDate: "25/06/2025",
    summary: "Patent design for an intelligent wearable neckband featuring real-time spine curvature telemetry, haptic posture alerts, and integrated therapeutic massage actuators."
  } as Patent,

  certifications: [
    {
      id: "mongodb-dba",
      title: "MongoDB Database Administrator",
      issuer: "MongoDB Inc."
    },
    {
      id: "aws-cloud-practitioner",
      title: "AWS Certified Cloud Practitioner",
      issuer: "Amazon Web Services (AWS)"
    },
    {
      id: "mongodb-python-dev",
      title: "MongoDB Certified Associate Python Developer",
      issuer: "MongoDB Inc."
    },
    {
      id: "advanced-automation",
      title: "Advanced Automation Certification",
      issuer: "Industry Accredited Body"
    }
  ] as Certification[],

  skillCategories: [
    {
      category: "Languages",
      skills: [
        { name: "TypeScript", priority: true },
        { name: "JavaScript", priority: true },
        { name: "Python", priority: true },
        { name: "C/C++", priority: false },
        { name: "SQL", priority: true }
      ]
    },
    {
      category: "Backend & Systems",
      skills: [
        { name: "Node.js", priority: true },
        { name: "Express", priority: true },
        { name: "FastAPI", priority: true },
        { name: "Redis", priority: true },
        { name: "BullMQ", priority: false },
        { name: "REST APIs", priority: true },
        { name: "WebSockets", priority: false }
      ]
    },
    {
      category: "Frontend",
      skills: [
        { name: "Next.js", priority: true },
        { name: "React", priority: true },
        { name: "Tailwind CSS", priority: true },
        { name: "HTML5", priority: false },
        { name: "CSS3", priority: false },
        { name: "Web Audio API", priority: false }
      ]
    },
    {
      category: "Databases & Storage",
      skills: [
        { name: "PostgreSQL", priority: true },
        { name: "MongoDB", priority: true },
        { name: "MySQL", priority: true },
        { name: "SQLAlchemy", priority: false },
        { name: "Prisma", priority: true }
      ]
    },
    {
      category: "DevOps, Cloud & Tools",
      skills: [
        { name: "Docker", priority: true },
        { name: "AWS", priority: true },
        { name: "Git", priority: true },
        { name: "Linux", priority: true },
        { name: "GitHub Actions", priority: true }
      ]
    }
  ] as SkillCategory[],

  meetingTypes: [
    {
      id: "tech-disc",
      title: "Technical Discussion",
      duration: "30 mins",
      description: "Architecture deep-dive, system design, or engineering problem solving.",
      icon: "Code2"
    },
    {
      id: "career-disc",
      title: "Career Discussion",
      duration: "30 mins",
      description: "Discussing full-time software engineering roles, team fit, or mentorship.",
      icon: "Briefcase"
    },
    {
      id: "proj-disc",
      title: "Project Discussion",
      duration: "45 mins",
      description: "Reviewing software build requirements, scope, and technical roadmap.",
      icon: "Layers"
    },
    {
      id: "collab",
      title: "Collaboration",
      duration: "30 mins",
      description: "Open-source work, AI research projects, or engineering initiatives.",
      icon: "Users"
    },
    {
      id: "general",
      title: "General Discussion",
      duration: "15 mins",
      description: "Quick introduction or general inquiry.",
      icon: "MessageSquare"
    }
  ]
};
