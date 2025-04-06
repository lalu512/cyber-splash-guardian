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
    
    // Keep fingerprint scanning animation running continuously
    const fingerprintScanningTimer = setTimeout(() => {
      setFingerprintScanComplete(true);
    }, 2500);
    
    const fingerprintTimer = setTimeout(() => {
      setFingerprintScanning(false);
    }, 3000);
    
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
      "Passport No: ENCRYPTED"
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
    <div className="fixed inset-0 z-50 flex flex-col justify-between bg-cyber-dark-blue overflow-hidden">
      <div className="w-full">
        {binaryDataRows.slice(0, 2)}
      </div>
      
      <div className="absolute inset-0 bg-[url('/lovable-uploads/9a8f8a09-c189-4971-84e3-68b7834f763e.png')] bg-cover bg-center opacity-30"></div>
      
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
      
      <div className="flex-1 container px-4 z-10 flex flex-col items-center">
        <div className="cyber-text-glow text-2xl my-8 text-center px-8 py-3 border border-cyber-blue/50 w-full max-w-4xl">
          PERSONAL DATA ACCESS PROTOCOL
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mx-auto mb-6">
          <div className="grid grid-rows-3 gap-4">
            <div className="cyber-box flex flex-col items-center justify-center animate-fade-in relative h-[120px]">
              <div className="relative w-20 h-20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-full border border-cyber-blue rounded-full overflow-hidden">
                    <div className="w-full h-full bg-cyber-blue/10 flex items-center justify-center">
                      <img 
                        src="/lovable-uploads/519c1b85-0c98-446f-ac5d-901867f307d9.png" 
                        alt="Fingerprint" 
                        className="w-16 h-16 object-contain opacity-80"
                      />
                    </div>
                  </div>
                </div>
                
                <>
                  <div className="absolute inset-0 overflow-hidden rounded-full">
                    <div className="absolute left-0 w-full bg-gradient-to-b from-cyber-blue/50 via-cyber-blue/20 to-transparent h-1/3 animate-scan-v"></div>
                  </div>
                  
                  <div className="absolute inset-0">
                    <div className="absolute top-0 left-0 w-full h-full">
                      <div className="w-full h-0.5 bg-cyber-blue/70 absolute animate-[scan-v_2s_linear_infinite]"></div>
                      <div className="w-0.5 h-full bg-cyber-blue/70 absolute animate-[scan-h_2s_linear_infinite]"></div>
                    </div>
                  </div>
                </>
                
                {!fingerprintScanning && (
                  <div className="absolute top-[-15px] right-[-15px] bg-cyber-blue/20 px-2 py-1 text-xs text-cyber-blue border border-cyber-blue/50">
                    MATCH FOUND
                  </div>
                )}
              </div>
              
              <p className="cyber-text mt-3 text-center text-xs">FINGERPRINT<br/>IDENTIFICATION</p>
            </div>
            
            <div className="cyber-box flex flex-col items-center justify-center animate-fade-in h-[120px]">
              <Lock className="w-16 h-16 text-cyber-blue" />
              <p className="cyber-text mt-2 text-center text-xs">CONFIDENTIAL<br/>DATA</p>
              <div className="mt-2 h-1 bg-cyber-blue/30 w-full max-w-[150px]">
                <div className="h-full bg-cyber-blue animate-pulse-glow" style={{ width: '100%' }}></div>
              </div>
            </div>
            
            <div className="cyber-box p-4 flex flex-col animate-fade-in h-[120px]">
              <div className="flex-1 grid grid-cols-3 grid-rows-2 gap-2">
                {Array.from({ length: 6 }, (_, i) => (
                  <div 
                    key={i} 
                    className={`flex items-center justify-center ${
                      filesAnimating && i < 6 ? 'animate-fade-in' : 'opacity-0'
                    }`}
                    style={{ animationDelay: `${filesAnimating ? 0.15 * i : 0}s` }}
                  >
                    <FileDigit className="w-10 h-10 text-cyber-blue" />
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="cyber-box flex flex-col animate-fade-in h-[380px]">
            <div className="bg-cyber-blue/10 border-b border-cyber-blue py-2 px-4">
              <p className="cyber-text text-center">[Identity Person]</p>
            </div>
            <div className="flex-1 p-4 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-cyber-blue/5 to-transparent"></div>
              
              <div className="relative w-full max-w-[150px] aspect-square mx-auto">
                {personIdentified ? (
                  <User className="w-full h-full text-cyber-blue/90 animate-pulse-glow" />
                ) : (
                  <div className="w-full h-full border-2 border-dashed border-cyber-blue/50 animate-pulse flex items-center justify-center">
                    <User className="w-1/2 h-1/2 text-cyber-blue animate-pulse-glow" />
                  </div>
                )}
                
                <div className="absolute inset-0 overflow-hidden opacity-80">
                  {Array.from({ length: 20 }, (_, i) => (
                    <div key={i} className="text-[7px] text-cyber-matrix" style={{ 
                      position: 'absolute', 
                      top: `${i * 5}%`, 
                      left: 0, 
                      width: '100%'
                    }}>
                      {Array.from({ length: 20 }, () => Math.floor(Math.random() * 2)).join('')}
                    </div>
                  ))}
                </div>
                
                {personIdentified && (
                  <div className="absolute bottom-0 left-0 right-0 bg-cyber-blue/20 text-cyber-blue py-1 text-center border-t border-cyber-blue/50">
                    IDENTIFIED
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="cyber-box flex flex-col animate-fade-in h-[380px]">
            <div className="bg-cyber-blue/10 border-b border-cyber-blue py-2 px-4">
              <p className="cyber-text text-center">Personal Data</p>
            </div>
            <div className="flex-1 p-4 flex flex-col space-y-4">
              {personalDataText.split('\n').filter(Boolean).map((line, index) => {
                const [label, value] = line.split(': ');
                return (
                  <div key={index} className="cyber-box p-2 bg-cyber-black border-cyber-blue/50 flex justify-between items-center">
                    <span className="cyber-text text-xs">{label}</span>
                    <span className="cyber-text text-xs animate-pulse-glow">{value}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
        <div className="cyber-box p-4 bg-black/80 w-full max-w-5xl mx-auto mb-8">
          <p className="cyber-text text-sm">{loadingText || "INITIALIZING SECURITY PROTOCOLS...undefined"}</p>
          <div className="w-full bg-cyber-gray/50 h-2 rounded-sm mt-3">
            <div 
              className="h-full bg-cyber-blue rounded-sm transition-all duration-100 ease-linear" 
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between mt-2">
            <p className="cyber-text text-xs">SECURITY ACCESS: {progress >= 100 ? 'GRANTED' : 'VERIFYING...'}</p>
            <p className="cyber-text text-xs">{Math.round(progress)}%</p>
          </div>
        </div>
      </div>
      
      <div className="w-full mt-auto">
        {binaryDataRows.slice(2, 4)}
      </div>
    </div>
  );
}

export default SplashScreen;
