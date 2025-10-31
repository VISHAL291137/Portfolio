import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Linkedin, Github, MapPin, Briefcase, GraduationCap, Code2 } from "lucide-react";
import { useState } from "react";
import profilePhoto from "@/assets/profile-photo.webp";

const Index = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:vishal.dev@example.com?subject=Contact from ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(formData.description)}`;
    window.location.href = mailtoLink;
  };

  const skills = [
    "Python", "React.js", "Cybersecurity", "OWASP Top 10", "Docker", "Git",
    "SHA256 Encryption", "HTML5", "CSS", "JavaScript", "Responsive Design",
    "Front-End Development", "Full-Stack Development", "Cloud Computing", 
    "Data Analysis", "pandas", "Matplotlib", "CLI Development", "MySQL",
    "PHP", "Java", "C++", "Bootstrap", "WordPress", "Django", "Linux",
    "Security Analysis", "Ethical Hacking", "SEO", "Digital Marketing"
  ];

  const experiences = [
    {
      title: "Admin Executive",
      company: "PaperMe",
      period: "Nov 2024 - Present · 1 yr",
      location: "India",
      description: "Working on professional development projects, contributing to secure and scalable web applications with focus on modern frontend technologies and best practices."
    },
    {
      title: "Career Break - Professional Development",
      company: "Self-directed Learning",
      period: "Jan 2023 - Present · 2 yrs 10 mos",
      location: "Jaipur, Rajasthan",
      description: "Took intentional time to upskill and specialize in cybersecurity protocols (OWASP, Nmap, SHA256), frontend mastery with React.js and responsive design, secure deployment using Docker and Git, and Cloud Computing (GCP Certified). Developed and published 5+ real-world projects on GitHub, building a strong technical foundation for a career in secure software development."
    },
    {
      title: "Developer + Security Integrator",
      company: "Independent Project · Self-employed",
      period: "Jan 2024 - Mar 2024 · 3 mos",
      location: "Jaipur, Rajasthan, India · Remote",
      description: "Problem: Users store passwords in plaintext. Built a custom password vault using Python with SHA256 encryption for storage. Deployed using Docker containers in an offline-first, zero-trust environment. Applied OWASP Top 10 compliance across the entire system. Outcome: Created a lightweight, encrypted password manager rated 4.8/5 by GitHub community on usability and security."
    },
    {
      title: "NAAC College Accreditation Website",
      company: "University Project · Trainee",
      period: "Sep 2023 - Nov 2023 · 3 mos",
      location: "Jaipur, Rajasthan, India · On-site",
      description: "Problem: College lacked a digital face for accreditation. Built from the ground up using HTML, CSS, JavaScript. Made it mobile-responsive and accessible with optimized load time for sub-1s on 4G. Created interface aligned with NAAC submission goals. Result: Used as the official accreditation portal, traffic tested for 500+ concurrent users."
    },
    {
      title: "Sales Data Analyzer",
      company: "Personal Build · Self-employed",
      period: "Aug 2023 - Oct 2023 · 3 mos",
      location: "Jaipur, Rajasthan, India · Remote",
      description: "Objective: Decode hidden profit zones from sales logs. Engineered with Python (pandas, matplotlib). Loaded product-wise sales data, applied filters and analysis by category & ROI, rendered charts with interactive insights. Outcome: Business simulation tested with 4 datasets, generated insights like best-seller heatmaps and seasonal trends."
    },
    {
      title: "Terminal Chatbot (CLI Bot)",
      company: "Independent Project · Self-employed",
      period: "Jul 2023 - Aug 2023 · 2 mos",
      location: "Jaipur, Rajasthan, India · Remote",
      description: "Mission: Simulate intelligent CLI chat for terminal users. Built using Python core with structured I/O and pattern recognition. Added mock personality for realism and extended for custom shell command emulation. Outcome: Used for internal shell practice and Git tutorials. Downloaded 1.2k+ times on GitHub."
    }
  ];

  const projects = [
    {
      title: "Python API Integration",
      description: "Developed a Python-based system to integrate third-party APIs for real-time data retrieval and processing. Focused on secure request handling, error logging, and output formatting. Demonstrated RESTful architecture and authentication handling.",
      link: "https://github.com/VISHAL291137/python-api-integration"
    },
    {
      title: "TIME-LIGHT",
      description: "Developed a light-based time tracker using Python. Displays real-time status updates with a visual LED-like interface. Ideal for productivity tracking and automation tools. Focused on modular code design, time-based logic, and user interaction.",
      link: "https://vishal291137.github.io/TIME-LIGHT/"
    }
  ];

  const education = [
    {
      institution: "Suresh Gyan Vihar University",
      degree: "BCA, Information Technology",
      period: "Sep 2022",
      grade: "7.8 CGPA",
      description: "Focused on combining strong programming skills with cybersecurity fundamentals. Worked on multiple real-world projects including a Docker-based password manager, data analytics tools, and secure front-end web apps. Maintained a 7.8 CGPA and pursued certifications in cloud computing, digital marketing, and ethical security practices."
    },
    {
      institution: "R.K.B. INTERCOLLEGE, GITANAGAR, NAWADAH, BIHAR",
      degree: "Secondary School Certificate (SSCE), Science",
      period: "2020 - 2022",
      description: "Completed senior secondary education with a focus on computer science and mathematics. Developed early interest in programming, problem-solving, and internet security. Participated in state-level computer science competitions and coding challenges."
    }
  ];

  const certifications = [
    {
      title: "Tata Group - Cybersecurity Analyst Job Simulation",
      issuer: "Forage",
      date: "Feb 2024",
      credential: "WiCxsWjpBmuf9q9JH"
    },
    {
      title: "Introduction to Programming Using HTML and CSS",
      issuer: "LearnTube.ai",
      date: "Jul 2023",
      credential: "HTM3502023596105S"
    },
    {
      title: "Introduction to Programming Using Python",
      issuer: "LearnTube.ai",
      date: "May 2023",
      credential: "PYT2932023596105S"
    },
    {
      title: "Programming in HTML5 with JavaScript and CSS3",
      issuer: "EDUCBA",
      date: "May 2023",
      credential: "BZR4HNQ-V"
    },
    {
      title: "Digital Garage Certificate",
      issuer: "Google",
      date: "Nov 2022",
      credential: "9UB BVH 6W8"
    },
    {
      title: "Email Marketing",
      issuer: "HubSpot Academy",
      date: "Mar 2023",
      credential: "51d4362be68645e1babcc5389264d34c"
    },
    {
      title: "Social Media Marketing",
      issuer: "HubSpot Academy",
      date: "Mar 2023",
      credential: "fd7c920dbd83493f991432ace0d90dbb"
    },
    {
      title: "Google Ads Display Certification",
      issuer: "Google",
      date: "Apr 2023",
      credential: "147473892"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-accent/10" />
        
        <div className="container max-w-6xl mx-auto relative z-10">
          <div className="text-center animate-fade-in">
            <div className="mb-8 inline-block">
              <img 
                src={profilePhoto} 
                alt="Profile" 
                className="w-40 h-40 rounded-full object-cover border-4 border-primary/20 shadow-[var(--shadow-elegant)] mx-auto"
              />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Vishal Kumar
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-4 max-w-2xl mx-auto">
              Software Developer & Security Engineer
            </p>
            
            <div className="flex flex-col items-center gap-2 text-muted-foreground mb-8">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20">Available</Badge>
                <Badge variant="secondary" className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20">Remote</Badge>
              </div>
              <p className="text-sm">Open to opportunities</p>
            </div>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity shadow-[var(--shadow-glow)]"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Mail className="w-4 h-4 mr-2" />
                Get In Touch
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View Experience
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container max-w-4xl mx-auto animate-slide-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">About Me</h2>
          <Card className="p-8 shadow-[var(--shadow-elegant)] border-primary/10">
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              I'm a Software Developer with a strong focus on cybersecurity and secure application development. 
              My approach combines modern frontend technologies with rigorous security practices to build reliable, scalable solutions.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              From implementing OWASP Top 10 compliance to deploying containerized applications with Docker, I bring a security-first 
              mindset to every project. With hands-on experience in React.js, Python, cloud computing, data analysis, and encryption protocols, 
              I'm passionate about creating applications that are both user-friendly and secure. I hold multiple certifications in 
              cybersecurity, digital marketing, and full-stack development, maintaining a 7.8 CGPA during my BCA.
            </p>
          </Card>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-4">
        <div className="container max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-8">
            <Code2 className="w-8 h-8 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold text-center">Skills & Technologies</h2>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            {skills.map((skill) => (
              <Badge 
                key={skill} 
                variant="secondary" 
                className="px-4 py-2 text-base hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-4 bg-muted/30">
        <div className="container max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-12">
            <Briefcase className="w-8 h-8 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold text-center">Experience</h2>
          </div>
          
          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <Card 
                key={index} 
                className="p-6 hover:shadow-[var(--shadow-elegant)] transition-shadow border-l-4 border-l-primary/50"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{exp.title}</h3>
                    <p className="text-primary font-medium">{exp.company}</p>
                    {exp.location && <p className="text-sm text-muted-foreground mt-1">{exp.location}</p>}
                  </div>
                  <Badge variant="outline" className="mt-2 md:mt-0 w-fit">
                    {exp.period}
                  </Badge>
                </div>
                <p className="text-muted-foreground leading-relaxed">{exp.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 px-4">
        <div className="container max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-12">
            <Code2 className="w-8 h-8 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold text-center">Projects</h2>
          </div>
          
          <div className="space-y-6">
            {projects.map((project, index) => (
              <Card 
                key={index} 
                className="p-6 hover:shadow-[var(--shadow-elegant)] transition-shadow border-l-4 border-l-accent/50"
              >
                <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">{project.description}</p>
                <Button variant="outline" size="sm" asChild>
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 mr-2" />
                    View Project
                  </a>
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-12">
            <GraduationCap className="w-8 h-8 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold text-center">Education</h2>
          </div>
          
          <div className="space-y-6">
            {education.map((edu, index) => (
              <Card 
                key={index} 
                className="p-6 shadow-[var(--shadow-elegant)] border-l-4 border-l-accent/50"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{edu.degree}</h3>
                    <p className="text-primary font-medium">{edu.institution}</p>
                    {edu.grade && <p className="text-sm text-muted-foreground mt-1">Grade: {edu.grade}</p>}
                  </div>
                  <Badge variant="outline" className="mt-2 md:mt-0 w-fit">
                    {edu.period}
                  </Badge>
                </div>
                <p className="text-muted-foreground leading-relaxed">{edu.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-20 px-4">
        <div className="container max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-12">
            <Badge className="w-8 h-8 p-1.5" variant="secondary">
              <Code2 className="w-full h-full" />
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-center">Licenses & Certifications</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            {certifications.map((cert, index) => (
              <Card 
                key={index} 
                className="p-5 hover:shadow-[var(--shadow-elegant)] transition-shadow"
              >
                <h3 className="text-lg font-semibold mb-2">{cert.title}</h3>
                <p className="text-primary font-medium text-sm mb-2">{cert.issuer}</p>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{cert.date}</span>
                  {cert.credential && (
                    <span className="text-xs bg-muted px-2 py-1 rounded">
                      ID: {cert.credential}
                    </span>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-gradient-to-b from-background to-muted/30">
        <div className="container max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center justify-center gap-3 mb-4 p-4 rounded-full bg-primary/10 backdrop-blur-sm">
              <Mail className="w-8 h-8 text-primary animate-pulse" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Get In Touch
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              I'm open to new opportunities in software development and cybersecurity. Let's build something secure and impactful together.
            </p>
          </div>
          
          <Card className="p-8 md:p-10 shadow-[var(--shadow-elegant)] border-primary/20 max-w-2xl mx-auto backdrop-blur-sm bg-card/95 hover:shadow-[var(--shadow-glow)] transition-all duration-300 animate-scale-in">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-3 group">
                <Label htmlFor="name" className="text-base font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary group-focus-within:animate-pulse"></span>
                  Your Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="h-14 text-base transition-all duration-300 focus:scale-[1.01] focus:shadow-lg border-2"
                />
              </div>
              
              <div className="space-y-3 group">
                <Label htmlFor="description" className="text-base font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary group-focus-within:animate-pulse"></span>
                  Message
                </Label>
                <Textarea
                  id="description"
                  placeholder="Tell me about your project, opportunity, or inquiry..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  className="min-h-[180px] text-base resize-none transition-all duration-300 focus:scale-[1.01] focus:shadow-lg border-2"
                />
              </div>
              
              <Button 
                type="submit" 
                size="lg" 
                className="w-full h-14 text-base font-semibold bg-gradient-to-r from-primary via-primary to-accent hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-[var(--shadow-glow)] group"
              >
                <Mail className="w-6 h-6 mr-2 group-hover:rotate-12 transition-transform" />
                Send Message Now
              </Button>
            </form>
          </Card>

          <div className="flex flex-wrap gap-4 justify-center mt-10 animate-fade-in">
            <Button 
              size="lg" 
              variant="outline" 
              className="hover:scale-105 hover:border-primary hover:text-primary transition-all duration-200 shadow-md hover:shadow-lg"
              asChild
            >
              <a href="https://www.linkedin.com/in/yogyata-yogi-378222253/" target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-5 h-5 mr-2" />
                LinkedIn
              </a>
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="hover:scale-105 hover:border-primary hover:text-primary transition-all duration-200 shadow-md hover:shadow-lg"
              asChild
            >
              <a href="https://github.com/VISHAL291137" target="_blank" rel="noopener noreferrer">
                <Github className="w-5 h-5 mr-2" />
                GitHub
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t">
        <div className="container max-w-4xl mx-auto text-center text-muted-foreground">
          <p>© 2024 Vishal Kumar. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
