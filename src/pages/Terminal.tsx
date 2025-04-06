
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import TypingEffect from "@/components/TypingEffect";
import TerminalCommand from "@/components/TerminalCommand";
import TerminalResponse from "@/components/TerminalResponse";
import ProjectList from "@/components/ProjectList";
import ContactForm from "@/components/ContactForm";
import BinaryBackground from "@/components/BinaryBackground";
import BlinkingCursor from "@/components/BlinkingCursor";

const Terminal = () => {
  const [showAbout, setShowAbout] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Sequentially show each section with delays to simulate terminal loading
    const aboutTimer = setTimeout(() => setShowAbout(true), 800);
    const projectsTimer = setTimeout(() => setShowProjects(true), 2400);
    const contactTimer = setTimeout(() => setShowContact(true), 3800);

    // Scroll to bottom when new content appears
    const scrollInterval = setInterval(() => {
      if (terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
      }
    }, 100);

    return () => {
      clearTimeout(aboutTimer);
      clearTimeout(projectsTimer);
      clearTimeout(contactTimer);
      clearInterval(scrollInterval);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-cyber-black text-cyber-matrix font-mono overflow-hidden">
      {/* Binary background animation */}
      <BinaryBackground />

      {/* Terminal content */}
      <div 
        ref={terminalRef}
        className="relative z-10 max-w-5xl mx-auto h-screen px-4 md:px-6 py-8 overflow-y-auto"
      >
        {/* Header */}
        <div className="py-4 mb-6 border-b border-cyber-matrix/30">
          <h1 className="text-xl md:text-3xl text-cyber-matrix font-bold tracking-wider">
            Welcome to My Digital Terminal
          </h1>
          <div className="text-xs text-cyber-matrix/70 mt-2">
            // Secure connection established - {new Date().toLocaleString()}
          </div>
        </div>

        {/* About Section */}
        <TerminalCommand command="cat about.txt" delay={400} />
        {showAbout && (
          <TerminalResponse>
            <TypingEffect 
              text={`I am a software developer specializing in creating secure and scalable web applications. My expertise includes frontend development with React, backend development with Node.js, and cybersecurity practices.

With over 5 years of experience in the industry, I have worked on various projects ranging from small business websites to enterprise-level applications. I am passionate about clean code, user experience, and staying up-to-date with the latest technology trends.

When I'm not coding, you can find me experimenting with new programming languages, contributing to open-source projects, or exploring the outdoors.`} 
              speed={10} 
            />
          </TerminalResponse>
        )}

        {/* Projects Section */}
        {showAbout && <TerminalCommand command="ls -la projects/" delay={400} />}
        {showProjects && (
          <TerminalResponse>
            <ProjectList />
          </TerminalResponse>
        )}

        {/* Contact Section */}
        {showProjects && <TerminalCommand command="mail --compose" delay={400} />}
        {showContact && (
          <TerminalResponse>
            <ContactForm />
          </TerminalResponse>
        )}

        {/* Terminal navigation options */}
        {showContact && (
          <div className="mt-8 pt-4 border-t border-cyber-matrix/30">
            <TerminalCommand command="echo 'Navigate to:'" delay={200} />
            <div className="pl-4 mt-2">
              <button 
                onClick={() => navigate('/splash')}
                className="terminal-link mr-4"
              >
                [splash]
              </button>
              <button 
                onClick={() => navigate('/')}
                className="terminal-link"
              >
                [home]
              </button>
            </div>
          </div>
        )}

        {/* Blinking cursor */}
        <BlinkingCursor />
      </div>
    </div>
  );
};

export default Terminal;
