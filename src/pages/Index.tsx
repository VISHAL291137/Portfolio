import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Mail, Linkedin, Github, MapPin, Briefcase, GraduationCap,
  Code2, BookOpen, Moon, Sun, Menu, X, ChevronDown, ExternalLink,
  Award, CheckCircle2, Shield
} from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import profilePhoto from "@/assets/profile-photo.jpg";

// ─── Scroll Animation Hook ───────────────────────────────────────────────────
function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

// ─── Typewriter Hook ──────────────────────────────────────────────────────────
function useTypewriter(words: string[], speed = 80, pause = 1800) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let timeout: ReturnType<typeof setTimeout>;
    if (!deleting && display === current) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && display === "") {
      setDeleting(false);
      setWordIdx((i) => (i + 1) % words.length);
    } else {
      timeout = setTimeout(() => {
        setDisplay(deleting ? current.slice(0, display.length - 1) : current.slice(0, display.length + 1));
      }, deleting ? speed / 2 : speed);
    }
    return () => clearTimeout(timeout);
  }, [display, deleting, wordIdx, words, speed, pause]);

  return display;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const skillCategories = {
  All: [
    "Python", "React.js", "Cybersecurity", "OWASP Top 10", "Docker", "Git",
    "SHA256 Encryption", "HTML5", "CSS", "JavaScript", "Responsive Design",
    "Front-End Development", "Full-Stack Development", "Cloud Computing",
    "Data Analysis", "pandas", "Matplotlib", "CLI Development", "MySQL",
    "PHP", "Java", "C++", "Bootstrap", "WordPress", "Django", "Linux",
    "Security Analysis", "Ethical Hacking", "SEO", "Digital Marketing"
  ],
  Frontend: ["React.js", "HTML5", "CSS", "JavaScript", "Responsive Design", "Bootstrap", "WordPress"],
  Security: ["Cybersecurity", "OWASP Top 10", "SHA256 Encryption", "Security Analysis", "Ethical Hacking", "Linux"],
  Backend: ["Python", "Django", "PHP", "Java", "C++", "MySQL", "Data Analysis", "pandas", "Matplotlib", "CLI Development"],
  Tools: ["Docker", "Git", "Cloud Computing", "SEO", "Digital Marketing", "Full-Stack Development", "Front-End Development"],
};

const experiences = [
  {
    title: "Admin Executive",
    company: "PaperMe",
    period: "Nov 2024 – Present",
    location: "India",
    description: "Working on professional development projects, contributing to secure and scalable web applications with focus on modern frontend technologies and best practices.",
    tags: ["React.js", "Security", "Web Dev"]
  },
  {
    title: "Career Break – Professional Development",
    company: "Self-directed Learning",
    period: "Jan 2023 – Present",
    location: "Jaipur, Rajasthan",
    description: "Took intentional time to upskill and specialize in cybersecurity protocols (OWASP, Nmap, SHA256), frontend mastery with React.js, secure deployment using Docker, and Cloud Computing (GCP Certified). Developed 5+ real-world projects on GitHub.",
    tags: ["React.js", "Docker", "GCP", "OWASP"]
  },
  {
    title: "Developer + Security Integrator",
    company: "Independent Project · Self-employed",
    period: "Jan – Mar 2024",
    location: "Jaipur, Rajasthan · Remote",
    description: "Built a custom password vault using Python with SHA256 encryption. Deployed via Docker in an offline-first, zero-trust environment. Applied OWASP Top 10 compliance. Rated 4.8/5 by GitHub community.",
    tags: ["Python", "Docker", "OWASP", "SHA256"]
  },
  {
    title: "NAAC College Accreditation Website",
    company: "University Project · Trainee",
    period: "Sep – Nov 2023",
    location: "Jaipur, Rajasthan · On-site",
    description: "Built from scratch using HTML, CSS, JavaScript. Mobile-responsive, optimized for sub-1s load time on 4G. Used as the official accreditation portal, traffic tested for 500+ concurrent users.",
    tags: ["HTML5", "CSS", "JavaScript"]
  },
  {
    title: "Sales Data Analyzer",
    company: "Personal Build · Self-employed",
    period: "Aug – Oct 2023",
    location: "Jaipur, Rajasthan · Remote",
    description: "Engineered with Python (pandas, matplotlib). Loaded product-wise sales data, applied filters and analysis by category & ROI, rendered charts with interactive insights. Tested with 4 datasets.",
    tags: ["Python", "pandas", "Matplotlib"]
  },
  {
    title: "Terminal Chatbot (CLI Bot)",
    company: "Independent Project · Self-employed",
    period: "Jul – Aug 2023",
    location: "Jaipur, Rajasthan · Remote",
    description: "Built using Python core with structured I/O and pattern recognition. Added mock personality for realism. Used for shell practice and Git tutorials. Downloaded 1.2k+ times on GitHub.",
    tags: ["Python", "CLI", "Git"]
  }
];

const projects = [
  {
    title: "Python API Integration",
    description: "A Python-based system integrating third-party APIs for real-time data retrieval and processing. Focused on secure request handling, error logging, and output formatting.",
    link: "https://github.com/VISHAL291137/python-api-integration",
    tags: ["Python", "REST API", "Security"],
    type: "GitHub"
  },
  {
    title: "TIME-LIGHT",
    description: "A light-based time tracker using Python. Displays real-time status updates with a visual LED-like interface. Ideal for productivity tracking and automation tools.",
    link: "https://vishal291137.github.io/TIME-LIGHT/",
    tags: ["Python", "Automation", "UI"],
    type: "Live"
  }
];

const education = [
  {
    institution: "Suresh Gyan Vihar University",
    degree: "BCA, Information Technology",
    period: "Sep 2022",
    grade: "7.8 CGPA",
    description: "Focused on combining strong programming skills with cybersecurity fundamentals. Worked on Docker-based password manager, data analytics tools, and secure front-end web apps."
  },
  {
    institution: "R.K.B. Intercollege, Nawadah, Bihar",
    degree: "Secondary School Certificate (SSCE), Science",
    period: "2020 – 2022",
    description: "Completed senior secondary education with focus on computer science and mathematics. Participated in state-level coding challenges."
  }
];

const certifications = [
  { title: "Tata Group – Cybersecurity Analyst Job Simulation", issuer: "Forage", date: "Feb 2024", credential: "WiCxsWjpBmuf9q9JH" },
  { title: "Introduction to Programming Using HTML and CSS", issuer: "LearnTube.ai", date: "Jul 2023", credential: "HTM3502023596105S" },
  { title: "Introduction to Programming Using Python", issuer: "LearnTube.ai", date: "May 2023", credential: "PYT2932023596105S" },
  { title: "Programming in HTML5 with JavaScript and CSS3", issuer: "EDUCBA", date: "May 2023", credential: "BZR4HNQ-V" },
  { title: "Digital Garage Certificate", issuer: "Google", date: "Nov 2022", credential: "9UB BVH 6W8" },
  { title: "Email Marketing", issuer: "HubSpot Academy", date: "Mar 2023", credential: "51d4362be68645e1babcc5389264d34c" },
  { title: "Social Media Marketing", issuer: "HubSpot Academy", date: "Mar 2023", credential: "fd7c920dbd83493f991432ace0d90dbb" },
  { title: "Google Ads Display Certification", issuer: "Google", date: "Apr 2023", credential: "147473892" }
];

const navLinks = [
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Experience", id: "experience" },
  { label: "Projects", id: "projects" },
  { label: "Education", id: "education" },
  { label: "Certifications", id: "certifications" },
  { label: "Contact", id: "contact" },
];

// ─── Component ─────────────────────────────────────────────────────────────────
const Index = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [navVisible, setNavVisible] = useState(false);
  const [activeSkillTab, setActiveSkillTab] = useState<keyof typeof skillCategories>("All");
  const [flippedCerts, setFlippedCerts] = useState<Record<number, boolean>>({});
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formValid, setFormValid] = useState({ name: false, email: false, message: false });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const lastScrollY = useRef(0);

  const typewriterText = useTypewriter(["Software Developer", "Security Engineer", "React.js Developer", "Full-Stack Builder"]);

  // Dark mode toggle
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Navbar show/hide on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setNavVisible(currentY > 80 && currentY < lastScrollY.current || currentY > 80 && currentY > 300);
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  }, []);

  const handleFormChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setFormValid(prev => ({
      ...prev,
      name: field === "name" ? value.trim().length > 1 : prev.name,
      email: field === "email" ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) : prev.email,
      message: field === "message" ? value.trim().length > 9 : prev.message,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:vishal.dev@example.com?subject=Contact from ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(formData.message)}`;
    window.location.href = mailtoLink;
    setFormSubmitted(true);
  };

  const toggleCert = (i: number) => {
    setFlippedCerts(prev => ({ ...prev, [i]: !prev[i] }));
  };

  // Section refs
  const aboutRef = useScrollAnimation();
  const skillsRef = useScrollAnimation();
  const expRef = useScrollAnimation();
  const projRef = useScrollAnimation();
  const eduRef = useScrollAnimation();
  const certRef = useScrollAnimation();
  const contactRef = useScrollAnimation();

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* ── Sticky NavBar ── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"} bg-background/90 backdrop-blur-md border-b border-border shadow-sm`}>
        <div className="container max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <span className="font-bold text-primary text-lg tracking-tight">VK</span>
          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <li key={link.id}>
                <button
                  onClick={() => scrollTo(link.id)}
                  className="px-3 py-1.5 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  {link.label}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => navigate("/posts")}
                className="px-3 py-1.5 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                Blog
              </button>
            </li>
          </ul>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setDarkMode(d => !d)}
              className="h-9 w-9 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              className="md:hidden h-9 w-9 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
              onClick={() => setMenuOpen(o => !o)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-md animate-slide-up">
            <ul className="flex flex-col py-2">
              {navLinks.map(link => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollTo(link.id)}
                    className="w-full text-left px-6 py-3 text-sm font-medium hover:bg-muted transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => navigate("/posts")}
                  className="w-full text-left px-6 py-3 text-sm font-medium hover:bg-muted transition-colors"
                >
                  Blog
                </button>
              </li>
            </ul>
          </div>
        )}
      </nav>

      {/* ── Hero Section ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 overflow-hidden">
        {/* Floating blobs */}
        <div className="blob blob-1" aria-hidden="true" />
        <div className="blob blob-2" aria-hidden="true" />
        <div className="blob blob-3" aria-hidden="true" />

        <div className="container max-w-4xl mx-auto relative z-10 text-center">
          {/* Glowing profile photo */}
          <div className="mb-8 inline-block relative">
            <div className="glow-ring" aria-hidden="true" />
            <img
              src={profilePhoto}
              alt="Vishal Kumar profile photo"
              loading="lazy"
              className="w-36 h-36 md:w-44 md:h-44 rounded-full object-cover border-4 border-primary/30 shadow-[var(--shadow-elegant)] relative z-10 will-change-transform"
              style={{ transform: "translateZ(0)" }}
            />
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent animate-fade-in">
            Vishal Kumar
          </h1>

          {/* Typewriter */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-2 h-9 animate-fade-in">
            <span>{typewriterText}</span>
            <span className="typewriter-cursor">|</span>
          </p>

          <div className="flex items-center justify-center gap-2 mb-8 animate-fade-in">
            <Badge variant="secondary" className="bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20">Available</Badge>
            <Badge variant="secondary" className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20">Remote</Badge>
            <span className="text-sm text-muted-foreground">Open to opportunities</span>
          </div>

          {/* Stat counters */}
          <div className="flex flex-wrap justify-center gap-6 mb-10 animate-slide-up">
            {[
              { value: "5+", label: "Projects" },
              { value: "8", label: "Certifications" },
              { value: "2+", label: "Years Learning" },
            ].map(stat => (
              <div key={stat.label} className="text-center px-6 py-3 rounded-xl bg-card/60 backdrop-blur border border-border shadow-sm">
                <div className="text-2xl font-bold text-primary">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 justify-center animate-fade-in">
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-accent hover:opacity-90 shadow-[var(--shadow-glow)] min-h-[44px]"
              onClick={() => scrollTo("contact")}
            >
              <Mail className="w-4 h-4" />
              Get In Touch
            </Button>
            <Button size="lg" variant="outline" className="min-h-[44px]" onClick={() => navigate("/posts")}>
              <BookOpen className="w-4 h-4" />
              View Blog
            </Button>
            <Button size="lg" variant="outline" className="min-h-[44px]" onClick={() => scrollTo("experience")}>
              View Experience
            </Button>
          </div>
        </div>

        {/* Scroll arrow */}
        <button
          onClick={() => scrollTo("about")}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors animate-bounce"
          aria-label="Scroll down"
        >
          <ChevronDown className="w-7 h-7" />
        </button>
      </section>

      {/* ── About Section ── */}
      <section id="about" className="py-12 md:py-20 px-4 bg-muted/30">
        <div ref={aboutRef} className="scroll-section container max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">About Me</h2>
          <Card className="p-6 md:p-8 shadow-[var(--shadow-elegant)] border-primary/10">
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              I'm a Software Developer with a strong focus on cybersecurity and secure application development.
              My approach combines modern frontend technologies with rigorous security practices to build reliable, scalable solutions.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              From implementing OWASP Top 10 compliance to deploying containerized applications with Docker, I bring a security-first
              mindset to every project. With hands-on experience in React.js, Python, cloud computing, data analysis, and encryption protocols,
              I'm passionate about creating applications that are both user-friendly and secure.
            </p>
            <div className="flex items-center gap-2 mt-6 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 text-primary" />
              <span>Jaipur, Rajasthan, India</span>
            </div>
          </Card>
        </div>
      </section>

      {/* ── Skills Section ── */}
      <section id="skills" className="py-12 md:py-20 px-4">
        <div ref={skillsRef} className="scroll-section container max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-8">
            <Code2 className="w-7 h-7 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold">Skills & Technologies</h2>
          </div>

          {/* Category tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {(Object.keys(skillCategories) as (keyof typeof skillCategories)[]).map(cat => (
              <button
                key={cat}
                onClick={() => setActiveSkillTab(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 min-h-[44px] ${
                  activeSkillTab === cat
                    ? "bg-primary text-primary-foreground shadow-[var(--shadow-glow)] scale-105"
                    : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            {skillCategories[activeSkillTab].map((skill, i) => (
              <Badge
                key={skill}
                variant="secondary"
                className="px-4 py-2 text-sm cursor-default hover:bg-primary hover:text-primary-foreground hover:shadow-[var(--shadow-glow)] transition-all duration-200 will-change-transform"
                style={{ animationDelay: `${i * 30}ms` }}
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* ── Experience — Timeline ── */}
      <section id="experience" className="py-12 md:py-20 px-4 bg-muted/30">
        <div ref={expRef} className="scroll-section container max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-12">
            <Briefcase className="w-7 h-7 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold">Experience</h2>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/60 via-accent/40 to-transparent md:-translate-x-0.5" />

            <div className="space-y-8">
              {experiences.map((exp, i) => (
                <div
                  key={i}
                  className={`relative flex gap-4 md:gap-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  {/* Timeline dot */}
                  <div className="flex-shrink-0 w-8 h-8 md:absolute md:left-1/2 md:-translate-x-1/2 md:top-4 z-10 rounded-full bg-primary shadow-[var(--shadow-glow)] flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-primary-foreground" />
                  </div>

                  {/* Card */}
                  <div className={`flex-1 md:w-[45%] ${i % 2 === 0 ? "md:mr-[55%]" : "md:ml-[55%]"}`}>
                    <Card className="p-5 hover:shadow-[var(--shadow-elegant)] transition-all duration-300 border-l-4 border-l-primary/60 hover:-translate-y-0.5 will-change-transform">
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                        <div>
                          <h3 className="text-base md:text-lg font-semibold">{exp.title}</h3>
                          <p className="text-primary font-medium text-sm">{exp.company}</p>
                        </div>
                        <Badge variant="outline" className="text-xs shrink-0">{exp.period}</Badge>
                      </div>
                      {exp.location && (
                        <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {exp.location}
                        </p>
                      )}
                      <p className="text-sm text-muted-foreground leading-relaxed mb-3">{exp.description}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {exp.tags.map(tag => (
                          <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">{tag}</span>
                        ))}
                      </div>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Projects — Hover Overlay ── */}
      <section id="projects" className="py-12 md:py-20 px-4">
        <div ref={projRef} className="scroll-section container max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-12">
            <Code2 className="w-7 h-7 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold">Projects</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, i) => (
              <div key={i} className="group relative rounded-xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-[var(--shadow-elegant)] transition-all duration-300 hover:-translate-y-1 will-change-transform">
                {/* Gradient bg bar */}
                <div className="h-2 bg-gradient-to-r from-primary to-accent" />
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-semibold">{project.title}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${project.type === "Live" ? "bg-green-500/10 text-green-600 dark:text-green-400" : "bg-muted text-muted-foreground"}`}>
                      {project.type}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">{tag}</span>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" className="min-h-[44px] w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300" asChild>
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4" />
                      View Project
                    </a>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Education ── */}
      <section id="education" className="py-12 md:py-20 px-4 bg-muted/30">
        <div ref={eduRef} className="scroll-section container max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-12">
            <GraduationCap className="w-7 h-7 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold">Education</h2>
          </div>

          <div className="space-y-6">
            {education.map((edu, i) => (
              <Card key={i} className="p-6 shadow-[var(--shadow-elegant)] border-l-4 border-l-accent/60 hover:-translate-y-0.5 transition-all duration-300 will-change-transform">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3 gap-2">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{edu.degree}</h3>
                    <p className="text-primary font-medium text-sm">{edu.institution}</p>
                    {edu.grade && <p className="text-xs text-muted-foreground mt-1">Grade: {edu.grade}</p>}
                  </div>
                  <Badge variant="outline" className="w-fit text-xs">{edu.period}</Badge>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">{edu.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── Certifications — Flip Cards ── */}
      <section id="certifications" className="py-12 md:py-20 px-4">
        <div ref={certRef} className="scroll-section container max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-12">
            <Award className="w-7 h-7 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold">Licenses & Certifications</h2>
          </div>
          <p className="text-center text-sm text-muted-foreground mb-8">Hover or tap a card to see credential ID</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {certifications.map((cert, i) => (
              <div
                key={i}
                className="flip-card-container cursor-pointer"
                onClick={() => toggleCert(i)}
                onMouseEnter={() => setFlippedCerts(prev => ({ ...prev, [i]: true }))}
                onMouseLeave={() => setFlippedCerts(prev => ({ ...prev, [i]: false }))}
                role="button"
                tabIndex={0}
                aria-label={`${cert.title} - tap to flip`}
              >
                <div className={`flip-card-inner ${flippedCerts[i] ? "flipped" : ""}`}>
                  {/* Front */}
                  <div className="flip-card-front rounded-xl border border-border bg-card p-5 shadow-sm flex flex-col">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                      <Shield className="w-4 h-4 text-primary" />
                    </div>
                    <h3 className="text-sm font-semibold mb-2 leading-snug flex-1">{cert.title}</h3>
                    <p className="text-primary font-medium text-xs mb-1">{cert.issuer}</p>
                    <p className="text-xs text-muted-foreground">{cert.date}</p>
                  </div>
                  {/* Back */}
                  <div className="flip-card-back rounded-xl border border-primary/30 bg-gradient-to-br from-primary/10 to-accent/10 p-5 flex flex-col items-center justify-center text-center">
                    <Award className="w-8 h-8 text-primary mb-3" />
                    <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">Credential ID</p>
                    <p className="text-xs font-mono text-foreground bg-muted px-3 py-2 rounded-lg break-all">{cert.credential}</p>
                    <p className="text-xs text-muted-foreground mt-3">{cert.issuer} · {cert.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact Section ── */}
      <section id="contact" className="py-12 md:py-20 px-4 bg-gradient-to-b from-background to-muted/30">
        <div ref={contactRef} className="scroll-section container max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-4">
              <Mail className="w-7 h-7 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Get In Touch
            </h2>
            <p className="text-muted-foreground">
              I'm open to new opportunities in software development and cybersecurity. Let's build something secure and impactful.
            </p>
          </div>

          <Card className="p-6 md:p-8 shadow-[var(--shadow-elegant)] border-primary/20">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2 text-sm font-semibold">
                  Your Name
                  {formValid.name && <CheckCircle2 className="w-4 h-4 text-green-500" />}
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={e => handleFormChange("name", e.target.value)}
                  required
                  className={`min-h-[44px] text-base transition-all ${formValid.name ? "border-green-500/50 focus-visible:ring-green-500/30" : ""}`}
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2 text-sm font-semibold">
                  Email Address
                  {formValid.email && <CheckCircle2 className="w-4 h-4 text-green-500" />}
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={e => handleFormChange("email", e.target.value)}
                  required
                  className={`min-h-[44px] text-base transition-all ${formValid.email ? "border-green-500/50 focus-visible:ring-green-500/30" : ""}`}
                />
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="message" className="flex items-center justify-between text-sm font-semibold">
                  <span className="flex items-center gap-2">
                    Message
                    {formValid.message && <CheckCircle2 className="w-4 h-4 text-green-500" />}
                  </span>
                  <span className={`text-xs font-normal ${formData.message.length > 450 ? "text-destructive" : "text-muted-foreground"}`}>
                    {formData.message.length}/500
                  </span>
                </Label>
                <Textarea
                  id="message"
                  placeholder="Tell me about your project, opportunity, or inquiry..."
                  value={formData.message}
                  onChange={e => handleFormChange("message", e.target.value)}
                  required
                  maxLength={500}
                  className={`min-h-[160px] text-base resize-none transition-all ${formValid.message ? "border-green-500/50 focus-visible:ring-green-500/30" : ""}`}
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full min-h-[48px] bg-gradient-to-r from-primary to-accent hover:opacity-90 shadow-[var(--shadow-glow)] font-semibold"
              >
                <Mail className="w-5 h-5" />
                Send Message
              </Button>

              {formSubmitted && (
                <p className="text-center text-sm text-green-600 dark:text-green-400 flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Email client opened! Thanks for reaching out.
                </p>
              )}
            </form>
          </Card>

          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <Button size="lg" variant="outline" className="min-h-[44px] hover:scale-105 transition-transform" asChild>
              <a href="https://www.linkedin.com/in/yogyata-yogi-378222253/" target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-5 h-5" />
                LinkedIn
              </a>
            </Button>
            <Button size="lg" variant="outline" className="min-h-[44px] hover:scale-105 transition-transform" asChild>
              <a href="https://github.com/VISHAL291137" target="_blank" rel="noopener noreferrer">
                <Github className="w-5 h-5" />
                GitHub
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-border" style={{ borderImage: "linear-gradient(to right, transparent, hsl(var(--primary) / 0.4), transparent) 1" }}>
        <div className="container max-w-4xl mx-auto px-4 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="font-bold text-primary text-lg mb-1">Vishal Kumar</p>
              <p className="text-sm text-muted-foreground">Software Developer & Security Engineer</p>
            </div>
            <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {navLinks.map(link => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </nav>
            <div className="flex gap-3">
              <a href="https://github.com/VISHAL291137" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/in/yogyata-yogi-378222253/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div className="border-t border-border/50 mt-6 pt-6 text-center text-xs text-muted-foreground">
            © 2025 Vishal Kumar. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
