
import React, { useState, useEffect } from "react";

interface TerminalCommandProps {
  command: string;
  delay?: number;
}

const TerminalCommand: React.FC<TerminalCommandProps> = ({ 
  command, 
  delay = 0 
}) => {
  const [visible, setVisible] = useState(delay === 0);

  useEffect(() => {
    if (delay > 0) {
      const timeout = setTimeout(() => {
        setVisible(true);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [delay]);

  if (!visible) return null;

  return (
    <div className="text-cyber-blue font-mono flex items-center mb-2">
      <span className="mr-2 text-cyber-matrix/70">user@terminal:~$</span>
      <span className="text-cyber-matrix">{command}</span>
    </div>
  );
};

export default TerminalCommand;
