import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Linkedin, Github, MapPin, Briefcase, GraduationCap, Code2 } from "lucide-react";
import profilePhoto from "@/assets/profile-photo.jpg";

const Index = () => {
  const skills = [
    "React", "TypeScript", "Node.js", "Python", "UI/UX Design",
    "Tailwind CSS", "PostgreSQL", "Git", "REST APIs", "Agile"
  ];

  const experiences = [
    {
      title: "Senior Developer",
      company: "Tech Solutions Inc.",
      period: "2022 - Present",
      description: "Leading frontend development for enterprise applications, mentoring junior developers, and implementing modern web technologies."
    },
    {
      title: "Full Stack Developer",
      company: "Digital Innovations",
      period: "2020 - 2022",
      description: "Built scalable web applications using React and Node.js, collaborated with cross-functional teams to deliver high-quality products."
    },
    {
      title: "Junior Developer",
      company: "StartUp Labs",
      period: "2018 - 2020",
      description: "Developed responsive user interfaces, integrated APIs, and contributed to agile development processes."
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
              John Anderson
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-4 max-w-2xl mx-auto">
              Full Stack Developer & UI/UX Enthusiast
            </p>
            
            <div className="flex items-center justify-center gap-2 text-muted-foreground mb-8">
              <MapPin className="w-4 h-4" />
              <span>San Francisco, CA</span>
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
              I'm a passionate full stack developer with over 6 years of experience building modern web applications. 
              I specialize in creating elegant, user-friendly interfaces and robust backend systems that scale.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              When I'm not coding, you'll find me contributing to open-source projects, writing technical articles, 
              or exploring the latest web technologies. I believe in writing clean, maintainable code and creating 
              exceptional user experiences.
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
                <h3 className="text-xl font-semibold mb-1">Bachelor of Science in Computer Science</h3>
                <p className="text-primary font-medium">University of California</p>
              </div>
              <Badge variant="outline" className="mt-2 md:mt-0 w-fit">
                2014 - 2018
              </Badge>
            </div>
            <p className="text-muted-foreground">
              Graduated with honors. Focused on software engineering, algorithms, and web technologies.
            </p>
          </Card>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-muted/30">
        <div className="container max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Let's Connect</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
              asChild
            >
              <a href="mailto:john.anderson@example.com">
                <Mail className="w-5 h-5 mr-2" />
                Email Me
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-5 h-5 mr-2" />
                LinkedIn
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
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
          <p>© 2024 John Anderson. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
