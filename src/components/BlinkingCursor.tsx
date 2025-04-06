
import React, { useState, useEffect } from 'react';

const BlinkingCursor: React.FC = () => {
  const [visible, setVisible] = useState(true);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(prev => !prev);
    }, 530);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="mt-4 h-6">
      <span className="text-cyber-matrix text-xl font-mono">
        {visible ? '_' : ' '}
      </span>
    </div>
  );
};

export default BlinkingCursor;
