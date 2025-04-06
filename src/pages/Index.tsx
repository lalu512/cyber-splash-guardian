
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyber-dark-blue to-cyber-black">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 cyber-text-glow">Cyber Splash Guardian</h1>
        <p className="text-xl text-cyber-blue mb-8">Experience the futuristic splash screen</p>
        <Link to="/splash">
          <Button className="bg-cyber-blue hover:bg-cyber-blue-dark text-black">
            Launch Splash Screen
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Index;
