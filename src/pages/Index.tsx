import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Zap, Globe, Shield, Code, Layers, Users, ArrowRight, Star, TrendingUp, Award, Clock, CheckCircle, Sparkles, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useHeroContent, useTrustIndicators } from "@/hooks/useContentstack";

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

const Index = () => {
  const navigate = useNavigate();
  const { data: heroContent } = useHeroContent();
  const { data: trustIndicators } = useTrustIndicators();

  const handleExplorePlatform = () => {
    navigate('/features');
  };

  // Parse hero title to extract text parts
  const heroTitle = heroContent?.title || "The world's best digital experiences start here";
  const heroSubtitle = heroContent?.subtitle || "";
  const heroDescription = heroContent?.description || "Seamlessly integrate intelligent agents, AI-powered automation, and advanced workflows—all in one platform built for the context economy.";
  const primaryButtonText = heroContent?.primary_button_text || "Explore the Platform";
  const secondaryButtonText = heroContent?.secondary_button_text || "Watch Demo";

  // Map icon names to components for trust indicators
  const iconMap: { [key: string]: any } = {
    star: Star,
    trendingup: TrendingUp,
    award: Award,
    clock: Clock,
    zap: Zap,
    default: CheckCircle
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-cyan-900/20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)] animate-pulse"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(147,51,234,0.1),transparent_50%)] animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(6,182,212,0.1),transparent_50%)] animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="container relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            {/* Badge */}
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 backdrop-blur-sm mb-8 animate-fade-in">
              <Sparkles className="w-5 h-5 text-blue-400 mr-2" />
              <span className="text-sm font-medium text-blue-400">Now with AI-powered workflows</span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
              {heroTitle.split(' ').map((word, i, arr) => {
                const wordLower = word.toLowerCase().replace(/[^a-z]/g, '');
                const isDigital = wordLower === 'digital' || (arr[i-1] && arr[i-1].toLowerCase().includes('digital'));
                const isStart = wordLower === 'start' && arr[i+1]?.toLowerCase() === 'here';
                
                if (isDigital || (i > 0 && arr[i-1]?.toLowerCase().includes('digital'))) {
                  return (
                    <span key={i} className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                      {word}{' '}
                    </span>
                  );
                }
                if (isStart) {
                  return <span key={i} className="text-muted-foreground/30">{word} </span>;
                }
                return <span key={i}>{word} </span>;
              })}
            </h1>

            {/* Subtitle */}
            {heroSubtitle && (
              <p className="text-xl md:text-2xl text-purple-400 max-w-4xl mx-auto mb-6 leading-relaxed font-light animate-fade-in" style={{ animationDelay: '0.2s' }}>
                {heroSubtitle}
              </p>
            )}
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto mb-12 leading-relaxed font-light animate-fade-in" style={{ animationDelay: '0.2s' }}>
              {heroDescription}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <Button
                size="lg"
                onClick={handleExplorePlatform}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white text-lg px-10 py-7 shadow-xl shadow-blue-500/20 group transition-all duration-300 hover:scale-105"
              >
                {primaryButtonText}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-foreground hover:text-primary font-medium px-10 py-7 text-lg transition-all duration-300 hover:scale-105 border-2"
              >
                <Rocket className="mr-2 w-5 h-5" />
                {secondaryButtonText}
              </Button>
            </div>
          </div>

          {/* Floating Stats */}
          {heroContent?.trust_indicators && heroContent.trust_indicators.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              {heroContent.trust_indicators.map((indicator, index) => {
                // Parse value for animation
                const valueStr = indicator.metric;
                const isNumber = /^\d+/.test(valueStr);
                const numberValue = isNumber ? parseInt(valueStr.replace(/[^\d]/g, '')) : 0;
                const suffix = valueStr.includes('K') ? 'K+' : valueStr.includes('B') ? 'B+' : valueStr.includes('%') ? '%' : valueStr.includes('+') ? '+' : '';
                const isPercent = valueStr.includes('%');
                const exactValue = isPercent ? valueStr : null;

                return (
                  <Card key={index} className="p-6 text-center bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:scale-105 group">
                    <div className="flex justify-center mb-2">
                      <TrendingUp className="w-6 h-6 text-blue-400 group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">
                      {exactValue || (isNumber && numberValue > 0 ? <AnimatedCounter end={numberValue} suffix={suffix} /> : indicator.metric)}
                    </div>
                    <div className="text-sm text-muted-foreground">{indicator.label}</div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Trust Indicators Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-cyan-500/5">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Trusted by <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Industry Leaders</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Join thousands of companies already building better digital experiences with The Content
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {(trustIndicators && trustIndicators.length > 0 ? trustIndicators : [
              { metric_value: "4.9/5", label: "Rating" },
              { metric_value: "99.99%", label: "Uptime" },
              { metric_value: "SOC 2", label: "Certified" },
              { metric_value: "24/7", label: "Support" }
            ]).map((indicator, index) => {
              const IconComponent = iconMap[indicator.label?.toLowerCase().replace(/\s+/g, '')] || iconMap.default;
              const colorClasses = ["text-yellow-400", "text-green-400", "text-blue-400", "text-purple-400"];
              return (
                <Card key={index} className="p-6 text-center bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:scale-105 group">
                  <div className="flex justify-center mb-4">
                    <IconComponent className={`w-8 h-8 ${colorClasses[index % colorClasses.length]} group-hover:scale-110 transition-transform`} />
                  </div>
                  <div className="text-2xl font-bold text-white mb-2">
                    {indicator.metric_value}
                  </div>
                  <div className="text-sm text-muted-foreground">{indicator.label}</div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Features Preview */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Why Choose <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">The Content</span>?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience the power of modern content management with our cutting-edge platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: "Lightning Fast", description: "Deliver content at blazing speeds with our globally distributed CDN" },
              { icon: Shield, title: "Enterprise Security", description: "Bank-level security with SOC 2 Type II compliance" },
              { icon: Code, title: "Developer First", description: "Comprehensive APIs and SDKs in all major languages" },
              { icon: Globe, title: "Omnichannel", description: "Reach audiences anywhere across all devices and platforms" },
              { icon: Layers, title: "Composable", description: "Build with best-of-breed tools using flexible architecture" },
              { icon: Users, title: "Team Collaboration", description: "Intuitive workflows and real-time collaboration tools" }
            ].map((feature, index) => (
              <Card key={index} className="p-8 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border border-green-500/20 hover:border-green-500/40 transition-all duration-300 hover:scale-105 group">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500/20 to-blue-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-7 h-7 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-green-500/5 via-blue-500/5 to-purple-500/5">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Transform Your <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Content Strategy</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Unlock the full potential of your content with our powerful platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: CheckCircle, title: "40% Faster", description: "Time to market" },
              { icon: CheckCircle, title: "60% Reduction", description: "Content creation time" },
              { icon: CheckCircle, title: "99.99% Uptime", description: "SLA guarantee" },
              { icon: CheckCircle, title: "24/7 Support", description: "Multilingual support" }
            ].map((benefit, index) => (
              <Card key={index} className="p-6 text-center bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:scale-105 group">
                <div className="flex justify-center mb-4">
                  <benefit.icon className="w-8 h-8 text-purple-400 group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center">
            <h2 className="text-5xl md:text-7xl font-bold mb-8 text-foreground tracking-tight">
              Ready to Transform Your{" "}
              <span className="text-primary">
                Content Strategy?
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-16 font-light leading-relaxed">
              Join thousands of companies already building better digital experiences with The Content
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-background font-medium px-12 py-4 rounded-full text-lg transition-all duration-300 hover:scale-105">
                Start Free Trial
              </Button>
              <Button size="lg" variant="ghost" className="text-foreground hover:text-primary font-medium px-12 py-4 text-lg transition-all duration-300">
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;