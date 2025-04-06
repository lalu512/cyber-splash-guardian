
import React, { useEffect, useRef } from 'react';

const BinaryBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas to full screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Binary rain configuration
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = [];
    
    // Initialize drops
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * canvas.height);
    }
    
    // Draw the binary rain
    const binary = () => {
      // Semi-transparent black background to create fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Green binary characters
      ctx.fillStyle = 'rgba(0, 255, 65, 0.1)'; // Matrix green with low opacity
      ctx.font = `${fontSize}px monospace`;
      
      // Render binary characters
      for (let i = 0; i < drops.length; i++) {
        const text = Math.random() > 0.5 ? '1' : '0';
        
        // Draw the character
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        // Move drops down
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };
    
    // Animate the binary rain
    const interval = setInterval(binary, 100);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);
  
  return <canvas ref={canvasRef} className="fixed inset-0 z-0 opacity-20" />;
};

export default BinaryBackground;
