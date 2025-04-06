import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, FileDigit, Fingerprint, User, Check } from 'lucide-react';

const SplashScreen = () => {
  const [redirect, setRedirect] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('');
  const [personalDataText, setPersonalDataText] = useState('');
  const [personIdentified, setPersonIdentified] = useState(false);
  const [filesAnimating, setFilesAnimating] = useState(false);
  const [fingerprintScanning, setFingerprintScanning] = useState(true);
  const [fingerprintScanComplete, setFingerprintScanComplete] = useState(false);
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const typingSoundRef = useRef<HTMLAudioElement | null>(null);
  const accessSoundRef = useRef<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    audioRef.current = new Audio('/lovable-uploads/access-granted.mp3');
    typingSoundRef.current = new Audio('/lovable-uploads/typing-sound.mp3');
    accessSoundRef.current = new Audio('/lovable-uploads/system-access.mp3');
    
    if (typingSoundRef.current) {
      typingSoundRef.current.loop = true;
    }
    
    const loadingTextFull = "INITIALIZING SECURITY PROTOCOLS...";
    let loadingTextIndex = 0;
    
    if (typingSoundRef.current) {
      typingSoundRef.current.play().catch(err => console.log('Audio playback error:', err));
    }
    
    const typingInterval = setInterval(() => {
      if (loadingTextIndex < loadingTextFull.length) {
        setLoadingText(prev => prev + loadingTextFull[loadingTextIndex]);
        loadingTextIndex++;
      } else {
        clearInterval(typingInterval);
        if (typingSoundRef.current) {
          typingSoundRef.current.pause();
          typingSoundRef.current.currentTime = 0;
        }
        startPersonalDataTyping();
      }
    }, 70);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + (100 / (5 * 10));
        return Math.min(newProgress, 100);
      });
    }, 100);
    
    const fingerprintScanningTimer = setTimeout(() => {
      setFingerprintScanComplete(true);
    }, 1800);
    
    const fingerprintTimer = setTimeout(() => {
      setFingerprintScanning(false);
    }, 2000);
    
    const filesTimer = setTimeout(() => {
      setFilesAnimating(true);
    }, 500);
    
    const identifyTimer = setTimeout(() => {
      setPersonIdentified(true);
      if (accessSoundRef.current) {
        accessSoundRef.current.play().catch(err => console.log('Audio playback error:', err));
      }
    }, 2500);
    
    const redirectTimer = setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play()
          .then(() => {
            setTimeout(() => setRedirect(true), 1000);
          })
          .catch(err => {
            console.log('Audio playback error:', err);
            setRedirect(true);
          });
      } else {
        setRedirect(true);
      }
    }, 6000);
    
    return () => {
      clearInterval(interval);
      clearInterval(typingInterval);
      clearTimeout(redirectTimer);
      clearTimeout(identifyTimer);
      clearTimeout(fingerprintTimer);
      clearTimeout(fingerprintScanningTimer);
      clearTimeout(filesTimer);
      
      if (typingSoundRef.current) {
        typingSoundRef.current.pause();
      }
      if (accessSoundRef.current) {
        accessSoundRef.current.pause();
      }
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);
  
  const startPersonalDataTyping = () => {
    if (typingSoundRef.current) {
      typingSoundRef.current.currentTime = 0;
      typingSoundRef.current.play().catch(err => console.log('Audio playback error:', err));
    }
    
    const personalDataItems = [
      "Name: CONFIDENTIAL",
      "Home Address: CONFIDENTIAL",
      "Identity Card No: ENCRYPTED",
      "Passport No: ENCRYPTED", 
      "Income Tax No: RESTRICTED"
    ];
    
    let itemIndex = 0;
    let charIndex = 0;
    
    const typePersonalData = () => {
      if (itemIndex < personalDataItems.length) {
        const currentItem = personalDataItems[itemIndex];
        
        if (charIndex < currentItem.length) {
          setPersonalDataText(prev => prev + currentItem[charIndex]);
          charIndex++;
          setTimeout(typePersonalData, 15);
        } else {
          setPersonalDataText(prev => prev + '\n');
          itemIndex++;
          charIndex = 0;
          setTimeout(typePersonalData, 100);
        }
      } else {
        if (typingSoundRef.current) {
          typingSoundRef.current.pause();
          typingSoundRef.current.currentTime = 0;
        }
      }
    };
    
    setTimeout(typePersonalData, 200);
  };
  
  useEffect(() => {
    if (redirect) {
      navigate('/home');
    }
  }, [redirect, navigate]);
  
  const generateBinaryString = () => {
    const screenWidth = window.innerWidth;
    const charWidth = 8;
    const requiredChars = Math.ceil(screenWidth / charWidth) * 2;
    return Array.from({ length: requiredChars }, () => Math.floor(Math.random() * 2)).join('');
  };

  const binaryDataRows = Array.from({ length: 4 }, (_, i) => (
    <div 
      key={i} 
      className="w-full overflow-hidden py-1 bg-cyber-black/50"
    >
      <div className={`cyber-text text-xs whitespace-nowrap animate-[marquee_${20 + i * 5}s_linear_infinite${i % 2 ? '_reverse' : ''}]`}>
        {generateBinaryString()}
      </div>
    </div>
  ));
  
  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-between bg-gradient-to-br from-cyber-dark-blue to-cyber-black overflow-hidden">
      <div className="w-full">
        {binaryDataRows.slice(0, 2)}
      </div>
      
      <div className="absolute inset-0 bg-[url('/lovable-uploads/1ba0c6b1-a94e-4081-bae3-968760ef5fa7.png')] bg-cover bg-center opacity-80"></div>
      
      <div className="absolute inset-0 bg-cyber-grid bg-[length:20px_20px] md:bg-[length:30px_30px] opacity-10"></div>
      
      <div className="absolute inset-0 pointer-events-none">
        <svg className="w-full h-full opacity-50" viewBox="0 0 1000 600" preserveAspectRatio="none">
          <g stroke="#0cf" strokeWidth="1" fill="none">
            <path className="animate-draw-line" d="M200,150 L800,150" />
            <path className="animate-draw-line" d="M200,300 L800,300" />
            <path className="animate-draw-line" d="M200,450 L800,450" />
            <path className="animate-draw-line" d="M200,150 L200,450" />
            <path className="animate-draw-line" d="M500,150 L500,450" />
            <path className="animate-draw-line" d="M800,150 L800,450" />
            <path className="animate-draw-line" strokeDasharray="5,5" d="M200,300 L500,150" />
            <path className="animate-draw-line" strokeDasharray="5,5" d="M500,300 L800,150" />
            <path className="animate-draw-line" strokeDasharray="5,5" d="M200,300 L500,450" />
            <path className="animate-draw-line" strokeDasharray="5,5" d="M500,300 L800,450" />
          </g>
        </svg>
      </div>
      
      <div className="scan-line"></div>
      
      <div className="flex-1 container mx-auto z-10 px-3 md:px-6 py-4 flex flex-col">
        <div className="cyber-text-glow text-lg md:text-2xl mb-4 text-center">PERSONAL DATA ACCESS PROTOCOL</div>
        
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 h-[55vh]">
          <div className="grid grid-rows-3 gap-4">
            <div className="cyber-box p-4 flex flex-col items-center justify-center animate-fade-in relative">
              <div className="relative w-16 h-16 md:w-20 md:h-20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-full border-2 border-cyber-blue/50 rounded-full overflow-hidden">
                    <div className="w-full h-full bg-cyber-blue/20 flex items-center justify-center">
                      <img 
                        src="/lovable-uploads/519c1b85-0c98-446f-ac5d-901867f307d9.png" 
                        alt="Fingerprint" 
                        className="w-12 h-12 md:w-16 md:h-16 object-contain"
                      />
                    </div>
                  </div>
                </div>
                
                <>
                  <div className="absolute inset-0 overflow-hidden rounded-full">
                    <div className="absolute left-0 w-full bg-gradient-to-b from-cyber-blue/70 via-cyber-blue/20 to-transparent h-1/3 animate-scan-v"></div>
                  </div>
                  
                  <div className="absolute inset-0">
                    <div className="absolute top-0 left-0 w-full h-full">
                      <div className="w-full h-0.5 bg-cyber-blue/70 absolute animate-[scan-v_2s_linear_infinite]"></div>
                      <div className="w-0.5 h-full bg-cyber-blue/70 absolute animate-[scan-h_2s_linear_infinite]"></div>
                    </div>
                  </div>
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-full border border-cyber-blue/30 rounded-full animate-pulse"></div>
                  </div>
                </>
                
                {fingerprintScanComplete && (
                  <div className="absolute inset-0">
                    {Array.from({ length: 8 }, (_, i) => {
                      const angle = (i * Math.PI) / 4;
                      const x = 50 + 47 * Math.cos(angle);
                      const y = 50 + 47 * Math.sin(angle);
                      return (
                        <div
                          key={i}
                          className="absolute w-1 h-1 md:w-1.5 md:h-1.5 bg-cyber-blue rounded-full animate-pulse-glow"
                          style={{
                            top: `${y}%`,
                            left: `${x}%`,
                            animationDelay: `${i * 0.1}s`
                          }}
                        />
                      );
                    })}
                  </div>
                )}
              </div>
              
              {!fingerprintScanning && (
                <div className="absolute top-2 right-2 bg-cyber-blue/20 px-2 py-1 text-xs text-cyber-blue">
                  MATCH FOUND
                </div>
              )}
              
              <p className="cyber-text mt-2 text-center text-xs">FINGERPRINT<br/>IDENTIFICATION</p>
            </div>
            
            <div className="cyber-box p-4 flex flex-col items-center justify-center animate-fade-in">
              <Lock className="w-10 h-10 md:w-12 md:h-12 text-cyber-blue animate-pulse-glow" />
              <p className="cyber-text mt-2 text-center text-xs">CONFIDENTIAL<br/>DATA</p>
              <div className="mt-2 h-1 bg-cyber-blue/30 w-full">
                <div className="h-full bg-cyber-blue animate-pulse-glow" style={{ width: '100%' }}></div>
              </div>
            </div>
            
            <div className="cyber-box p-4 flex flex-col animate-fade-in">
              <div className="flex-1 grid grid-cols-3 grid-rows-2 gap-2">
                {Array.from({ length: 6 }, (_, i) => (
                  <div 
                    key={i} 
                    className={`flex items-center justify-center ${
                      filesAnimating && i < 6 ? 'animate-fade-in' : 'opacity-0'
                    }`}
                    style={{ animationDelay: `${filesAnimating ? 0.15 * i : 0}s` }}
                  >
                    <FileDigit className="w-7 h-7 md:w-9 md:h-9 text-cyber-blue" />
                  </div>
                ))}
              </div>
              <p className="cyber-text mt-2 text-center text-xs">ARCHIVED FILES</p>
            </div>
          </div>
          
          <div className="cyber-box flex flex-col animate-fade-in md:max-h-[350px] h-full">
            <div className="bg-cyber-blue/20 border-b border-cyber-blue py-2 px-4">
              <p className="cyber-text text-center text-sm md:text-base">[Identity Person]</p>
            </div>
            <div className="flex-1 p-4 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-cyber-blue/5 to-cyber-dark-blue/20"></div>
              
              <div className="relative w-full max-w-[100px] md:max-w-[120px] aspect-square mx-auto">
                {personIdentified ? (
                  <User className="w-full h-full text-cyber-blue/90 animate-pulse-glow" />
                ) : (
                  <div className="w-full h-full border-2 border-dashed border-cyber-blue/50 animate-pulse flex items-center justify-center">
                    <User className="w-1/2 h-1/2 text-cyber-blue animate-pulse-glow" />
                  </div>
                )}
                
                <div className="absolute inset-0 overflow-hidden opacity-80 mix-blend-screen">
                  {Array.from({ length: 20 }, (_, i) => (
                    <div key={i} className="text-[6px] md:text-[7px] text-cyber-matrix" style={{ 
                      position: 'absolute', 
                      top: `${i * 5}%`, 
                      left: 0, 
                      width: '100%'
                    }}>
                      {Array.from({ length: 20 }, () => Math.floor(Math.random() * 2)).join('')}
                    </div>
                  ))}
                </div>
                
                <div className="absolute inset-0">
                  {Array.from({ length: 8 }, (_, i) => {
                    const angle = (i * Math.PI) / 4;
                    const x = 50 + 50 * Math.cos(angle);
                    const y = 50 + 50 * Math.sin(angle);
                    return (
                      <div
                        key={i}
                        className="absolute w-1 h-1 md:w-1.5 md:h-1.5 bg-cyber-blue rounded-full animate-pulse-glow"
                        style={{
                          top: `${y}%`,
                          left: `${x}%`,
                          animationDelay: `${i * 0.2}s`
                        }}
                      />
                    );
                  })}
                </div>
                
                {personIdentified && (
                  <div className="absolute bottom-0 left-0 right-0 bg-cyber-blue/20 text-cyber-blue py-1 text-center text-xs md:text-sm animate-fade-in">
                    IDENTIFIED
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="cyber-box flex flex-col animate-fade-in md:max-h-[350px] h-full">
            <div className="bg-cyber-blue/20 border-b border-cyber-blue py-2 px-4">
              <p className="cyber-text text-center text-sm md:text-base">Personal Data</p>
            </div>
            <div className="flex-1 p-4 flex flex-col space-y-2 overflow-y-auto">
              {personalDataText.split('\n').filter(Boolean).map((line, index) => {
                const [label, value] = line.split(': ');
                return (
                  <div key={index} className="cyber-box p-2 bg-cyber-blue/10 border-cyber-blue/50 flex justify-between items-center">
                    <span className="cyber-text text-xs">{label}</span>
                    <span className="cyber-text text-xs animate-pulse-glow">{value}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
        <div className="mt-auto pt-12">
          <div className="cyber-box p-3 bg-black/80">
            <p className="cyber-text text-xs md:text-sm">{loadingText}</p>
            <div className="w-full bg-cyber-gray/50 h-1.5 rounded-sm mt-2">
              <div 
                className="h-full bg-cyber-blue animate-pulse-glow rounded-sm transition-all duration-100 ease-linear" 
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between mt-1">
              <p className="cyber-text text-[10px] md:text-xs">SECURITY ACCESS: {progress >= 100 ? 'GRANTED' : 'VERIFYING...'}</p>
              <p className="cyber-text text-[10px] md:text-xs">{Math.floor(progress)}%</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="w-full mt-4 mb-4">
        {binaryDataRows.slice(2, 4)}
      </div>
    </div>
  );
}

export default SplashScreen;
