import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";

export function HomeHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      {/* Animated background with geometric shapes */}
      <div className="absolute inset-0">
        {/* Large geometric shapes */}
        <div className="absolute top-20 right-[10%] w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-20 left-[10%] w-[400px] h-[400px] bg-accent/10 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        
        {/* Floating elements */}
        <div className="absolute top-1/4 left-1/4 w-20 h-20 border border-accent/20 rounded-lg rotate-12 animate-spin-slow"></div>
        <div className="absolute top-1/3 right-1/3 w-16 h-16 border border-accent/20 rounded-lg -rotate-12 animate-spin-slow" style={{ animationDelay: '2s', animationDuration: '12s' }}></div>
      </div>

      <div className="container relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 animate-fade-in backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">Introducing Agent OS</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight animate-fade-in" style={{ animationDelay: '0.1s' }}>
            The world's best
            <span className="block text-accent mt-2">
              digital experiences
            </span>
            <span className="block mt-2">start here</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto animate-fade-in leading-relaxed" style={{ animationDelay: '0.2s' }}>
            Seamlessly integrate intelligent agents, AI-powered automation, and advanced workflows—all in one platform built for the context economy.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg px-10 py-7 shadow-xl shadow-accent/20 group transition-all duration-300">
              Explore the Platform
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-10 py-7 border-2 border-accent/30 hover:bg-accent/10 hover:border-accent/50 group transition-all duration-300">
              <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
              Watch Demo
            </Button>
          </div>
        </div>

        {/* Featured Visual */}
        <div className="relative max-w-5xl mx-auto animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <Card className="relative overflow-hidden bg-card/50 backdrop-blur-sm border-accent/20 shadow-2xl shadow-accent/10">
            <div className="aspect-video relative bg-gradient-to-br from-primary via-secondary to-primary/80 flex items-center justify-center">
              {/* Central diamond/platform visual */}
              <div className="relative w-full h-full flex items-center justify-center p-12">
                {/* 3D platform visualization */}
                <div className="relative">
                  <div className="absolute inset-0 bg-accent/10 rounded-3xl blur-xl"></div>
                  <div className="relative bg-gradient-to-br from-accent/20 to-transparent border border-accent/30 rounded-2xl p-8 backdrop-blur-sm">
                    <div className="grid grid-cols-3 gap-6">
                      {[...Array(9)].map((_, i) => (
                        <div 
                          key={i} 
                          className="w-16 h-16 rounded-lg bg-accent/20 backdrop-blur-sm border border-accent/30 animate-pulse"
                          style={{ animationDelay: `${i * 0.1}s` }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-accent/90 flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer shadow-xl shadow-accent/30">
                    <Play className="w-10 h-10 text-accent-foreground ml-1" />
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Floating stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {[
              { value: "10K+", label: "Companies" },
              { value: "99.99%", label: "Uptime" },
              { value: "5B+", label: "API Calls" },
              { value: "150+", label: "Countries" }
            ].map((stat, index) => (
              <Card key={index} className="p-4 text-center bg-card/50 backdrop-blur-sm border-accent/20 hover:border-accent/40 transition-all duration-300">
                <div className="text-2xl font-bold text-accent mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
