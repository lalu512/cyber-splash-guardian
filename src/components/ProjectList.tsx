
import React, { useState } from "react";

interface Project {
  id: string;
  name: string;
  description: string;
  link: string;
  size: string;
  modified: string;
}

const ProjectList: React.FC = () => {
  const [playSound, setPlaySound] = useState(false);
  
  const projects: Project[] = [
    {
      id: "proj-001",
      name: "secure-chat-app",
      description: "End-to-end encrypted messaging platform",
      link: "#project1",
      size: "1.2MB",
      modified: "2025-03-15"
    },
    {
      id: "proj-002",
      name: "data-visualization-tool",
      description: "Interactive dashboard for big data analytics",
      link: "#project2",
      size: "3.7MB",
      modified: "2025-02-08"
    },
    {
      id: "proj-003",
      name: "neural-network-experiment",
      description: "Machine learning model for pattern recognition",
      link: "#project3",
      size: "8.4MB",
      modified: "2025-01-22"
    },
    {
      id: "proj-004",
      name: "blockchain-explorer",
      description: "Tool to analyze cryptocurrency transactions",
      link: "#project4",
      size: "2.9MB",
      modified: "2024-12-10"
    }
  ];

  const playGlitchSound = () => {
    try {
      setPlaySound(true);
      const audio = new Audio();
      audio.volume = 0.2;
      audio.src = "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA="; // Placeholder beep sound
      audio.play().catch(err => console.log('Audio playback disabled:', err));
      setTimeout(() => setPlaySound(false), 200);
    } catch (e) {
      console.log('Error playing sound:', e);
    }
  };

  return (
    <div className="mb-2">
      <div className="text-xs text-cyber-matrix/50 mb-2">total {projects.length}</div>
      <div className="grid grid-cols-12 text-xs text-cyber-matrix/70 mb-1 border-b border-cyber-matrix/20 pb-1">
        <div className="col-span-1">Type</div>
        <div className="col-span-3">Name</div>
        <div className="col-span-5">Description</div>
        <div className="col-span-2">Size</div>
        <div className="col-span-1">Modified</div>
      </div>
      
      {projects.map((project) => (
        <div 
          key={project.id}
          className="grid grid-cols-12 text-sm py-1 border-b border-cyber-matrix/10"
        >
          <div className="col-span-1 text-cyber-matrix/70">drwxr-xr-x</div>
          <div className="col-span-3">
            <a 
              href={project.link} 
              className="terminal-link"
              onMouseEnter={playGlitchSound}
              onFocus={playGlitchSound}
            >
              {project.name}
            </a>
          </div>
          <div className="col-span-5 text-cyber-matrix/90">{project.description}</div>
          <div className="col-span-2 text-cyber-matrix/70">{project.size}</div>
          <div className="col-span-1 text-cyber-matrix/70">{project.modified}</div>
        </div>
      ))}
    </div>
  );
};

export default ProjectList;
