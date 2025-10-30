import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Sparkles, Zap, Globe, Shield, Code, Layers, Users, TrendingUp, Award, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

// Animated Counter Component
const AnimatedCounter = ({ end, duration = 2000, suffix = "" }: { end: number; duration?: number; suffix?: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration]);

  return <span>{count.toLocaleString()}{suffix}</span>;
};

export function HomeHero() {
  const navigate = useNavigate();

  const handleExplorePlatform = () => {
    navigate('/features');
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      {/* Enhanced animated background */}
      <div className="absolute inset-0">
        {/* Multiple geometric shapes with different colors */}
        <div className="absolute top-20 right-[10%] w-[500px] h-[500px] bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-20 left-[10%] w-[400px] h-[400px] bg-gradient-to-br from-green-500/10 to-cyan-500/10 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-full blur-[60px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Enhanced grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        
        {/* More floating elements */}
        <div className="absolute top-1/4 left-1/4 w-20 h-20 border border-blue-500/20 rounded-lg rotate-12 animate-spin-slow"></div>
        <div className="absolute top-1/3 right-1/3 w-16 h-16 border border-purple-500/20 rounded-lg -rotate-12 animate-spin-slow" style={{ animationDelay: '2s', animationDuration: '12s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-12 h-12 border border-green-500/20 rounded-full animate-spin-slow" style={{ animationDelay: '4s', animationDuration: '8s' }}></div>
        <div className="absolute bottom-1/3 right-1/4 w-14 h-14 border border-orange-500/20 rounded-lg rotate-45 animate-spin-slow" style={{ animationDelay: '6s', animationDuration: '10s' }}></div>
      </div>

      <div className="container relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          {/* Enhanced Badge */}
          <div className="mb-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 animate-fade-in backdrop-blur-sm">
            <Sparkles className="w-5 h-5 text-blue-400" />
            <span className="text-sm font-medium text-blue-300">✨ Introducing The Content Platform</span>
          </div>

          {/* Enhanced Main Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
            The world's best
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mt-2">
              digital experiences
            </span>
            <span className="block mt-2">
              <span className="text-muted-foreground/30">start</span> here
            </span>
          </h1>

          {/* Enhanced Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto animate-fade-in leading-relaxed" style={{ animationDelay: '0.2s' }}>
            Seamlessly integrate intelligent agents, AI-powered automation, and advanced workflows—all in one platform built for the context economy.
          </p>

          {/* Enhanced CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Button 
              size="lg" 
              onClick={handleExplorePlatform}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white text-lg px-10 py-7 shadow-xl shadow-blue-500/20 group transition-all duration-300 hover:scale-105"
            >
              Explore the Platform
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-10 py-7 border-2 border-blue-500/30 hover:bg-blue-500/10 hover:border-blue-500/50 group transition-all duration-300 hover:scale-105">
              <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
              Watch Demo
            </Button>
          </div>
        </div>

        {/* Enhanced Featured Visual */}
        <div className="relative max-w-5xl mx-auto animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <Card className="relative overflow-hidden bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border border-blue-500/20 shadow-2xl shadow-blue-500/10">
            <div className="aspect-video relative bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-cyan-500/20 flex items-center justify-center">
              {/* Enhanced platform visualization */}
              <div className="relative w-full h-full flex items-center justify-center p-12">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl"></div>
                  <div className="relative bg-gradient-to-br from-blue-500/30 to-transparent border border-blue-500/40 rounded-2xl p-8 backdrop-blur-sm">
                    <div className="grid grid-cols-3 gap-6">
                      {[
                        { icon: Zap, color: "text-yellow-400" },
                        { icon: Globe, color: "text-blue-400" },
                        { icon: Shield, color: "text-green-400" },
                        { icon: Code, color: "text-purple-400" },
                        { icon: Layers, color: "text-orange-400" },
                        { icon: Users, color: "text-pink-400" },
                        { icon: TrendingUp, color: "text-cyan-400" },
                        { icon: Award, color: "text-red-400" },
                        { icon: Clock, color: "text-indigo-400" }
                      ].map((item, i) => (
                        <div 
                          key={i} 
                          className="w-16 h-16 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center animate-pulse hover:scale-110 transition-transform duration-300"
                          style={{ animationDelay: `${i * 0.1}s` }}
                        >
                          <item.icon className={`w-8 h-8 ${item.color}`} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Enhanced play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer shadow-xl shadow-blue-500/30">
                    <Play className="w-10 h-10 text-white ml-1" />
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Enhanced floating stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {[
              { value: "10K+", label: "Companies", icon: TrendingUp, color: "text-green-400" },
              { value: "99.99%", label: "Uptime", icon: Clock, color: "text-blue-400" },
              { value: "5B+", label: "API Calls", icon: Zap, color: "text-yellow-400" },
              { value: "150+", label: "Countries", icon: Globe, color: "text-purple-400" }
            ].map((stat, index) => (
              <Card key={index} className="p-6 text-center bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:scale-105 group">
                <div className="flex justify-center mb-2">
                  <stat.icon className={`w-6 h-6 ${stat.color} group-hover:scale-110 transition-transform`} />
                </div>
                <div className="text-2xl font-bold text-white mb-1">
                  {stat.value === "10K+" ? <AnimatedCounter end={10000} suffix="+" /> :
                   stat.value === "99.99%" ? "99.99%" :
                   stat.value === "5B+" ? <AnimatedCounter end={5000000000} suffix="+" /> :
                   stat.value === "150+" ? <AnimatedCounter end={150} suffix="+" /> :
                   stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
