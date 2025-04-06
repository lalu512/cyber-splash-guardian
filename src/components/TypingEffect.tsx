
import React, { useState, useEffect } from "react";

interface TypingEffectProps {
  text: string;
  speed?: number;
  className?: string;
}

const TypingEffect: React.FC<TypingEffectProps> = ({ 
  text, 
  speed = 30,
  className = "" 
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  return (
    <pre className={`whitespace-pre-wrap ${className}`}>
      {displayedText}
    </pre>
  );
};

export default TypingEffect;
