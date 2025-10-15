import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Linkedin, Github, MapPin, Briefcase, GraduationCap, Code2 } from "lucide-react";
import profilePhoto from "@/assets/profile-photo.jpg";

const Index = () => {
  const skills = [
    "React.js", "Cybersecurity", "OWASP Top 10", "Docker", "Git",
    "Python", "SHA256 Encryption", "Nmap", "GCP Certified", "Responsive Design",
    "Security Protocols", "Frontend Development", "Cloud Computing", "Zero-Trust Architecture"
  ];

  const experiences = [
    {
      title: "Full-time Developer",
      company: "PaperMe",
      period: "Nov 2024 - Present",
      description: "Working on professional development projects, contributing to secure and scalable web applications with focus on modern frontend technologies and best practices."
    },
    {
      title: "Career Break - Professional Development",
      company: "Self-directed Learning",
      period: "Jan 2023 - Present",
      location: "Jaipur, Rajasthan",
      description: "Took intentional time to upskill and specialize in cybersecurity protocols (OWASP, Nmap, SHA256), frontend mastery with React.js, secure deployment using Docker and Git, and Cloud Computing (GCP Certified). Developed and published 5+ real-world projects on GitHub, building a strong technical foundation for a career in secure software development."
    },
    {
      title: "Developer + Security Integrator",
      company: "Independent Project",
      period: "Jan 2024 - Mar 2024",
      location: "Jaipur, Rajasthan · Remote",
      description: "Built a custom password vault using Python with SHA256 encryption for storage. Deployed using Docker containers in an offline-first, zero-trust environment. Applied OWASP Top 10 compliance across the entire system to address high-level security threats."
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
              mindset to every project. With hands-on experience in React.js, Python, cloud computing, and encryption protocols, 
              I'm passionate about creating applications that are both user-friendly and secure.
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

      {/* Education Section */}
      <section className="py-20 px-4">
        <div className="container max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-8">
            <GraduationCap className="w-8 h-8 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold text-center">Education</h2>
          </div>
          
          <Card className="p-6 shadow-[var(--shadow-elegant)] border-l-4 border-l-accent/50">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3">
              <div>
                <h3 className="text-xl font-semibold mb-1">Google Cloud Platform Certification</h3>
                <p className="text-primary font-medium">Google Cloud</p>
              </div>
              <Badge variant="outline" className="mt-2 md:mt-0 w-fit">
                2023
              </Badge>
            </div>
            <p className="text-muted-foreground">
              Certified in cloud computing fundamentals, infrastructure management, and deployment strategies on Google Cloud Platform.
            </p>
          </Card>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-muted/30">
        <div className="container max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Let's Connect</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            I'm open to new opportunities in software development and cybersecurity. Let's build something secure and impactful together.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
              asChild
            >
              <a href="mailto:vishal.dev@example.com">
                <Mail className="w-5 h-5 mr-2" />
                Email Me
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="https://www.linkedin.com/in/yogyata-yogi-378222253/" target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-5 h-5 mr-2" />
                LinkedIn
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
