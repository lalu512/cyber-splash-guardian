
import React, { ReactNode } from "react";

interface TerminalResponseProps {
  children: ReactNode;
  className?: string;
}

const TerminalResponse: React.FC<TerminalResponseProps> = ({ 
  children, 
  className = "" 
}) => {
  return (
    <div className={`pl-6 mb-6 ${className}`}>
      {children}
    </div>
  );
};

export default TerminalResponse;
